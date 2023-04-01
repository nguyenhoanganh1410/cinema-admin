import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Row ,
  Select, Tag,
  Col
} from 'antd';
import "../cinemahall/IndexRoomMap.scss";
import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import customerApi from "../../api/customerApi";
import { getPromotion } from "../../services/PromotionFetch";
import { MESSAGE_CUSTOMER_NOT_FOUND, MESSAGE_MONEY_INCORRECT, SDT_VANG_LAI, VND } from "../../constant";
import { notifyError, notifySucess } from "../../utils/Notifi";
import orderApi from "../../api/orderApi";
import { setBooking, setIsBooking } from "../../redux/actions";



const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const { TextArea } = Input;
const PayComponent = ({next, setIsSucess}) => {
  const depatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const cinema = useSelector((state) => state.cinema);
  const user = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);

  const [pickProducts, setPickProducts] = useState([])
  const [seatPicked, setSeatPicked] = useState([])
  const [pay, setPay] = useState([])
  const [customerSearched, setCustomerSearched] = useState(null)
  const [discountMoney, setDiscountMoney] = useState(0)
  const [moneyCustomer, setMoneyCustomer] = useState(0)

  const [promotion, setPromotion] = useState([])
  const [options, setOptions] = useState([])
  const [loading,setLoading] = useState(false)

  const isBooking = useSelector((state) => state.isBooking);
  console.log(isBooking);
  useEffect(() => {
    setSeatPicked(booking?.seats)
    setPickProducts(booking?.products)
    // depatch(setIsBooking(true))
  }, []);

  useEffect(()=>{
    const sumWithInitial = seatPicked.reduce((total, item)=>{
        return item?.price + total
    },0);

    const sumProducts = pickProducts.reduce((total, item)=>{
         return item?.price * item?.quatity + total
     },0);
    setTotalPrice(sumWithInitial+sumProducts)
  }, [seatPicked, pickProducts])

  const handleSearchCustomer = async (e) =>{
    const data = await customerApi.getCustomerByPhone(e.target.value);
    if(data.id){
      setCustomerSearched(data);
      return;
    }
    setCustomerSearched(null)
    setPay([])
    setDiscountMoney(0)
    setPromotion([])
    setOptions([])
  }
  const handleClickCustomer = () =>{
    if(customerSearched) {
      setPay([...pay,{customer:customerSearched}])
    
       const dataPayload = {
        date: booking.show.showDate,
        phone: customerSearched?.phone,
        totalMoney:totalPrice,
        idProduct:1,
        qtyBuy: booking.seats.length
       }
       getPromotion(dataPayload).then((result)=>{
          //insert data into options
          const dataOptions = result.map(val =>{
            return {value: val?.promotionCode}
          })
          const discount = result.reduce((acc, val) =>{
              if(val?.type === '1' || val?.type === '3'){
                return acc + val?.discount
              }
              return acc + 0
          }, 0)
          setDiscountMoney(discount)
          setOptions(dataOptions)
          setPromotion(result)
          setCustomerSearched(null)
       }).catch(error => {

       })

    }
  }

  const handleChangeMoney = (value) =>{
    const money =  value - totalPrice;
    setMoneyCustomer(money)
  }
  const handleChange = async (value) => {
    if(value === 'KH001'){
      const data = await customerApi.getCustomerByPhone(SDT_VANG_LAI);
      if(data.id){
        setCustomerSearched(data);
        return;
      }
    }else{
      setCustomerSearched(null)
      setPay([])
      setDiscountMoney(0)
      setPromotion([])
    }
  };

  const handlePay = async () =>{
    setLoading(true)
    if(moneyCustomer <= 0) { setLoading(false); notifyError(MESSAGE_MONEY_INCORRECT);return}
    else if (!pay[0]?.customer){ 
      setLoading(false);
      notifyError(MESSAGE_CUSTOMER_NOT_FOUND); return}
    const {show, film, seats, products} = booking
    const dataSeatPayLoad = seats?.map(seat =>{
      return {
        idSeat:seat?.id,
        idProduct:seat?.Product?.id,
        price:seat?.price,
        qty: 1
      }
    })
    const dataProductPayLoad = products?.map(product =>{
      return {
        id:product?.id,
        qty: product?.quatity,
        price: product?.price
      }
    })

    const promotionClear =  promotion?.filter(product =>{
      if(product?.promotionCode){
        return product
      }
     
    })
    const dataPromotionPayLoad = promotionClear?.map(product =>{
      return  {
        type: product?.type,
        promotionLine_id:product?.promotionLine_id,
        qtyReceived:product?.qtyReceived || 0,
        productReceived_id: product?.productReceived?.id || null,
        discount: product?.discount || 0
    }
    })
    let price = totalPrice - discountMoney
    const dataPayload = {
      idShowMovie:show?.id,
      idCustomer:pay[0]?.customer?.id,
      idStaff:user?.id,
      totalPrice: price,
      seats:[...dataSeatPayLoad],
      product_sp: [...dataProductPayLoad],
      promotionApplicalbe:[...dataPromotionPayLoad]
    }

    try {
      const result = await orderApi.createOrder(dataPayload)
      notifySucess("Đặt Vé Thành công.")
      depatch(setBooking(null))
      setIsSucess(true)
    //  depatch(setIsBooking(false))
    } catch (error) {
      notifyError("Thất bại.")
    } finally{
      setLoading(false);
    }

  }

  return (
    <div className="pick_seat pay_style site-card-wrapper">
      <Row
        gutter={{
          xs: 8,
          lg: 32,
        }}
        style={{  padding: "1rem", minHeight:"80vh" }}
      >
        <Col span = {8}>
            <div className="booking_content">
              <div className="booking_content-top" style={{height:"350px"}}>
                <img style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}} src={booking?.film?.image}/>
                <h3 style={{marginLeft:"12px"}}>{booking?.film?.nameMovie}</h3>

              </div>

              <div className="booking_content-bottom" style={{padding:"12px", paddingTop:0}}>
                <p className="p-custom">Rạp: <span>{cinema?.name}</span></p>
                <p>Suất chiếu: <span>{booking?.show?.ShowTime?.showTime + " - " + booking?.show?.showDate}</span></p>
                <p>Combo:  {
                  pickProducts.length > 0 ? 
                      pickProducts.map(val =>{
                        return   <span>{val?.quatity + " - " + val?.productName}, </span>
                      })
                      : <span>Không có sản phẩm.</span>
                    }     </p>
                <p>Ghế: <span>
                  {seatPicked.length > 0 ? 
                    seatPicked.map(val =>{
                      return val?.seatColumn + "-" + val?.seatRow + ", "
                    }) : 'Chưa chọn ghế.'
                  }
                </span></p>
        

              </div>
            
            </div>
        </Col>
        <Col span={16}>
        <Form
            labelCol={{
            span: 6,
            }}
            layout="horizontal"
        
            style={{
            maxWidth: "100%",
            }}
      >
        <Form.Item label="Nhân viên">
          <Select>
            <Select.Option value={user?.id}>{user?.firstName + " " + user?.lastName}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Loại khách">
        <Select
            defaultValue="KH000"
            style={{
              width: 220,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'KH000',
                label: 'Khách bình thường',
              },
              {
                value: 'KH001',
                label: 'Khách vãng lai',
              },
            ]}
          />
        </Form.Item>
        <Form.Item style={{position:"relative"}} label="SĐT khách: ">
          <Input placeholder="Nhập số điện thoại khách..." value={pay[0]?.customer ? pay[0]?.customer?.phone : '' }  onChange={handleSearchCustomer}/>
          {
            customerSearched ?   <ul className="search_results">
            <li onClick={()=>handleClickCustomer()}  className="search_result">{customerSearched?.firstName + " " + customerSearched?.lastName + " - " +  customerSearched?.phone}</li>
          </ul> : null
          }
          
        </Form.Item>
        <Form.Item label="Tên khách hàng: ">
          <Input disabled={pay[0]?.customer? true: false} value={pay[0]?.customer ? pay[0]?.customer?.firstName + " " + pay[0]?.customer.lastName : ""} placeholder="Nhập tên khách..."/>
        </Form.Item>
        <Form.Item label="Khuyễn mãi: ">
      
            <Select
              name="PromotionSelect"
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{
                width: '100%',
              }}
              
              value={options}
              disabled
              options={options}
            />
          {
            promotion[0]?.warning ? promotion.map(val =>{
              return <span id={val?.message} style={{fontSize:"12px", color:"green", display:"block", marginTop:"6px"}}>{val?.message}</span>
            }) : null
          }
        </Form.Item>

        
        <Form.Item label="Ghi chú">
          <TextArea rows={2} />
        </Form.Item>
        <div className="block_details">
          
           <p>
              <span>Tạm tính: </span>
              <span>{VND.format(totalPrice)}</span>
            </p>
            <p>
              <span>Giảm giá:</span>
              <div className="block_discount">
                <span style={{textAlign:"end"}}>{VND.format(discountMoney)}</span>
                 {
                    promotion.map(val =>{
                        if(val?.type === '2' && val?.promotionCode){
                          return  <span className="color_text">{val?.message}</span>
                        }
                        return null
                    })
                 }
                 
              </div>
            </p>
            <p className="total_price_final">
              <span className="total_text_final">Thành tiền: </span>
              <span  className="total_price_final">{VND.format(totalPrice - discountMoney)}</span>
            </p>
            <div>
              <span>Tiền khách đưa</span>
              <div className="block_money">
               
                <InputNumber
                defaultValue={totalPrice - discountMoney}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\VNĐ\s?|(,*)/g, "")}
                onChange={handleChangeMoney}
                placeholder="Tiền khách đưa"
              />
                <span>Trả lại {VND.format(moneyCustomer)}</span>
              </div>
            </div>
          
        <Form.Item label="">
          <Button type="primary" onClick={handlePay} loading={loading ? true : false}>Thanh toán</Button>
        </Form.Item>
        </div>
      </Form>
        </Col>
      </Row>
      
    
    </div>
  );
};
export default PayComponent;
