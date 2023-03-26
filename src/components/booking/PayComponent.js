import React, { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Row ,
  Col
} from 'antd';
import "../cinemahall/IndexRoomMap.scss";
import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import cinemaHallApi from "../../api/cinemaHallApi";
import { MdAlternateEmail, MdChair, MdOutlineSignalCellularNull } from "react-icons/md";
import priceApi from "../../api/priceApi";
import { GHE_DOI, GHE_THUONG, MESSAGE_PICK_SEAT, VND } from "../../constant";
import ItemProduct from "./ItemProduct";
import ModelCustomer from './ModelCustomer'
import { notifyWarn } from "../../utils/Notifi";
import { setBooking } from "../../redux/actions";
import customerApi from "../../api/customerApi";

const { TextArea } = Input;
const PayComponent = ({next}) => {
  const depatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const cinema = useSelector((state) => state.cinema);
  const user = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);
  //0 : pick seat
  //1: pick combo
  const [tab, setTab] = useState(0)
  const [pickProducts, setPickProducts] = useState([])
  const [seatPicked, setSeatPicked] = useState([])
  const [pay, setPay] = useState([])
  const [customerSearched, setCustomerSearched] = useState(null)
  console.log(pay?.customer);
  //console.log(seatPicked);


  useEffect(() => {
    setSeatPicked(booking?.seats)
    setPickProducts(booking?.products)
  }, []);
  useEffect(()=>{
    const sumWithInitial = seatPicked.reduce((total, item)=>{
     // console.log(value);
        return item?.price + total
    },0);

    const sumProducts = pickProducts.reduce((total, item)=>{
      // console.log(value);
         return item?.price * item?.quatity + total
     },0);
    //console.log(sumWithInitial);
    setTotalPrice(sumWithInitial+sumProducts)
  }, [seatPicked, pickProducts])

  const handleSearchCustomer = async (e) =>{
   // if(e.target.value.length < 9) return;
    const data = await customerApi.getCustomerByPhone(e.target.value);
    console.log(data);
    if(data.id){
      setCustomerSearched(data);
      return;
    }
    setCustomerSearched(null)
    setPay([])
  }
  const handleClickCustomer = () =>{
    if(customerSearched) {
      setPay([...pay,{customer:customerSearched}])
      setCustomerSearched(null)
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
            // wrapperCol={{
            // span: 14,
            // }}
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
          <Radio.Group>
            <Radio checked={true} value="apple">Khách bình thường </Radio>
            <Radio value="pear">Khách vãng lai </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item style={{position:"relative"}} label="SĐT khách: ">
          <Input placeholder="Nhập số điện thoại khách..." onChange={handleSearchCustomer}/>
          {
            customerSearched ?   <ul className="search_results">
            <li onClick={()=>handleClickCustomer()}  className="search_result">{customerSearched?.firstName + " " + customerSearched?.lastName + " - " +  customerSearched?.phone}</li>
          </ul> : null
          }
          
        </Form.Item>
        <Form.Item label="Tên khách hàng: ">
          <Input disabled={pay[0]?.customer? true: false} value={pay[0]?.customer ? pay[0]?.customer?.firstName + " " + pay[0]?.customer.lastName : ""} placeholder="Nhập tên khách..."/>
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
              <span>0</span>
            </p>
            <p className="total_price_final">
              <span className="total_text_final">Thành tiền: </span>
              <span  className="total_price_final">100.000</span>
            </p>
            <div>
              <span>Tiền khách đưa</span>
              <div className="block_money">
                <Input placeholder="Tiền khách đưa"/>
                <span>Trả lại 0đ</span>
              </div>
            </div>
          
        <Form.Item label="">
          <Button type="primary">Thanh toán</Button>
        </Form.Item>
        </div>
      </Form>
        </Col>
      </Row>
      
    
    </div>
  );
};
export default PayComponent;
