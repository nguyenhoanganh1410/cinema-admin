import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Row, Select, Tag, Col, Popover, message } from "antd";
import "../cinemahall/IndexRoomMap.scss";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import customerApi from "../../api/customerApi";
import { getPromotion } from "../../services/PromotionFetch";
import {
  MESSAGE_CUSTOMER_NOT_FOUND,
  MESSAGE_MONEY_INCORRECT,
  SDT_VANG_LAI,
  VND,
} from "../../constant";
import { notifyError, notifySucess } from "../../utils/Notifi";
import orderApi from "../../api/orderApi";
import { setBooking, setIsBooking } from "../../redux/actions";
import { setReload } from "../../redux/actions";
import {
  QuestionCircleTwoTone,
  InfoCircleTwoTone
  
} from "@ant-design/icons";

import ReactToPrint from "react-to-print";

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
const PayComponent = ({ next, setIsSucess, setIdOrder }) => {
  const depatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  const cinema = useSelector((state) => state.cinema);
  const user = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);

  const [pickProducts, setPickProducts] = useState([]);
  const [seatPicked, setSeatPicked] = useState([]);
  const [pay, setPay] = useState([]);
  const [customerSearched, setCustomerSearched] = useState(null);
  const [discountMoney, setDiscountMoney] = useState(0);
  const [moneyCustomer, setMoneyCustomer] = useState(0);
  const [promotionWarning, setPromotionWarning] = useState([]);
  const [promotionApplicalbe, setPromotionApplicalbe] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [producs, setProducts] = useState([]);

  const [promotion, setPromotion] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const reload = useSelector((state) => state.reload);

  const isBooking = useSelector((state) => state.isBooking);
  console.log(isBooking);
  useEffect(() => {
    setSeatPicked(booking?.seats);
    setPickProducts(booking?.products);
    // depatch(setIsBooking(true))
    const { seats } = booking;
    const products = seats.map((seat) => {
      return {
        id: seat?.Product?.id,
      };
    });
    const groupByProductId = products.reduce((acc, item) => {
      acc[item.id] = acc[item.id] || [];
      acc[item.id].push(item);
      return acc;
    }, {});
    const productsGroup = Object.keys(groupByProductId).map((key) => {
      return {
        id: key,
        qty: groupByProductId[key].length,
      };
    });
    setProducts(productsGroup);
  }, []);

  useEffect(() => {
    const sumWithInitial = seatPicked.reduce((total, item) => {
      return item?.price + total;
    }, 0);

    const sumProducts = pickProducts.reduce((total, item) => {
      return item?.price * item?.quatity + total;
    }, 0);
    setTotalPrice(sumWithInitial + sumProducts);
  }, [seatPicked, pickProducts]);

  const handleSearchCustomer = async (e) => {
    const data = await customerApi.getCustomerByPhone(e.target.value);
    if (data.id) {
      setCustomerSearched(data);
      return;
    }
    setCustomerSearched(null);
    setPay([]);
    setDiscountMoney(0);
    setPromotion([]);
    setOptions([]);
  };
  const handleClickCustomer = () => {
    if (customerSearched) {
      setPay([...pay, { customer: customerSearched }]);

      const dataPayload = {
        date: booking.show.showDate,
        phone: customerSearched?.phone,
        totalMoney: totalPrice,
        products: producs,
      };
      console.log("load", dataPayload);

      getPromotion(dataPayload)
        .then((result) => {
          //insert data into options

          const promotionWarning = result.filter((val) => {
            return val?.warning === true;
          });
          const promotionApplicalbe = result.filter((val) => {
            return val?.warning === false || val?.warning === undefined;
          });
          const totalDiscount = promotionApplicalbe.reduce((acc, val) => {
              console.log("dis", val?.discount);
              console.log("acc", acc);
              const dis = val?.discount ? val?.discount : 0;
              return acc + dis;
            return acc + 0;
          }, 0);
          setTotalDiscount(totalDiscount);
          setPromotionApplicalbe(promotionApplicalbe);
          setPromotionWarning(promotionWarning);

          const dataOptions = result.map((val) => {
            return { value: val?.promotionCode };
          });
          const discount = result.reduce((acc, val) => {
            if (val?.type === "1" || val?.type === "3") {
              console.log("dis", val?.discount);
              console.log("acc", acc);
              const dis = val?.discount ? val?.discount : 0;
              return acc + dis;
            }
            return acc + 0;
          }, 0);
          console.log(result);
          setDiscountMoney(discount);
          setOptions(dataOptions);
          setPromotion(result);
          setCustomerSearched(null);
        })
        .catch((error) => {});
    }
  };

  const handleChangeMoney = (value) => {
    const money = value - totalPrice;
    setMoneyCustomer(money);
  };
  const handleChange = async (value) => {
    if (value === "KH001") {
      const data = await customerApi.getCustomerByPhone(SDT_VANG_LAI);
      if (data.id) {
        setCustomerSearched(data);
        return;
      }
    } else {
      setCustomerSearched(null);
      setPay([]);
      setDiscountMoney(0);
      setPromotion([]);
    }
  };

  const handlePay = async () => {
    setLoading(true);
    if (!pay[0]?.customer) {
      setLoading(false);
      notifyError(MESSAGE_CUSTOMER_NOT_FOUND);
      return;
    }
    const { show, film, seats, products } = booking;
    const dataSeatPayLoad = seats?.map((seat) => {
      return {
        idSeat: seat?.id,
        idProduct: seat?.Product?.id,
        price: seat?.price,
        qty: 1,
      };
    });
    const dataProductPayLoad = products?.map((product) => {
      return {
        id: product?.id,
        qty: product?.quatity,
        price: product?.price,
      };
    });

    const promotionClear = promotion?.filter((product) => {
      if (product?.promotionCode) {
        return product;
      }
    });
    // const dataPromotionPayLoad = promotionClear?.map((product) => {
    //   return {
    //     type: product?.type,
    //     promotionLine_id: product?.promotionLine_id,
    //     qtyReceived: product?.qtyReceived || 0,
    //     productReceived_id: product?.productReceived?.id || null,
    //     discount: product?.discount || 0,
    //   };
    // });
    const dataPromotionPayLoad = promotionApplicalbe?.map((pro) => {
      return {
        promotionLine_id: pro?.promotionLine_id,
        discount: pro?.discount || 0,
      };
    });
    console.log("prooo", promotionApplicalbe);
    console.log("diss", totalDiscount);
    console.log("total", totalPrice - totalDiscount);

    let price = totalPrice - totalDiscount;
    const dataPayload = {
      idShowMovie: show?.id,
      idCustomer: pay[0]?.customer?.id,
      idStaff: user?.id,
      totalPrice: price,
      seats: [...dataSeatPayLoad],
      product_sp: [...dataProductPayLoad],
      promotionApplicalbe: [...dataPromotionPayLoad],
    };
    console.log("data", dataPayload);

    try {
      const result = await orderApi.createOrder(dataPayload);
      if(result){
        console.log("result", result);
        setIdOrder(result.data.id)
        notifySucess("Đặt Vé Thành công.");
        depatch(setBooking(null));
        setIsSucess(true);
        depatch(setReload(!reload));
      }
      //  depatch(setIsBooking(false))
    } catch (error) {
      notifyError("Thất bại.");
    } finally {
      setLoading(false);
    }
  };


  const content = (
    <div>
      {promotionWarning?.map((val) => {
        return (
          <p style={{ color: "#389e0d" }}>
            {val?.message}
          </p>
        );
      })}
    </div>
  );

  const contentPromotion = (
    <>
      {promotionApplicalbe?.map((val) => {
        return (
         <>
          <p>
            <Popover content={val?.message} title="Khuyến mãi áp dụng">
                <Tag color="green-inverse">{val?.promotionCode}</Tag>
            </Popover>
            <div className="block_discount">
              <span style={{ textAlign: "end" }}>
               - {VND.format(val?.discount)}
              </span>
            </div>
          </p>
            
         </>
        );
      })}
    </>
  )


  return (
    <div className="pick_seat pay_style site-card-wrapper">
      <Row
        gutter={{
          xs: 8,
          lg: 32,
        }}
        style={{ padding: "1rem", minHeight: "80vh" }}
      >
        <Col span={8}>
          <div className="booking_content">
            <div className="booking_content-top" style={{ height: "350px" }}>
              <img
                style={{
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                src={booking?.film?.image}
              />
              <h3 style={{ marginLeft: "12px" }}>{booking?.film?.nameMovie}</h3>
            </div>

            <div
              className="booking_content-bottom"
              style={{ padding: "12px", paddingTop: 0 }}
            >
              <p className="p-custom">
                Rạp: <span>{cinema?.name}</span>
              </p>
              <p>
                Suất chiếu:{" "}
                <span>
                  {booking?.show?.ShowTime?.showTime +
                    " - " +
                    booking?.show?.showDate}
                </span>
              </p>
              <p>
                Combo:{" "}
                {pickProducts.length > 0 ? (
                  pickProducts.map((val) => {
                    return (
                      <span>{val?.quatity + " - " + val?.productName}, </span>
                    );
                  })
                ) : (
                  <span>Không có sản phẩm.</span>
                )}{" "}
              </p>
              <p>
                Ghế:{" "}
                <span>
                  {seatPicked.length > 0
                    ? seatPicked.map((val) => {
                        return val?.seatColumn + "-" + val?.seatRow + ", ";
                      })
                    : "Chưa chọn ghế."}
                </span>
              </p>
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
            <Form.Item label="Loại khách">
              <Select
                defaultValue="KH000"
                style={{
                  width: 220,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "KH000",
                    label: "Khách bình thường",
                  },
                  {
                    value: "KH001",
                    label: "Khách vãng lai",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item style={{ position: "relative" }} label="SĐT khách: ">
              <Input
                placeholder="Nhập số điện thoại khách..."
                onChange={handleSearchCustomer}
              />
              {customerSearched ? (
                <ul className="search_results">
                  <li
                    onClick={() => handleClickCustomer()}
                    className="search_result"
                  >
                    {customerSearched?.firstName +
                      " " +
                      customerSearched?.lastName +
                      " - " +
                      customerSearched?.phone}
                  </li>
                </ul>
              ) : null}
            </Form.Item>
            <Form.Item label="Tên khách hàng: ">
              <Input
                disabled={pay[0]?.customer ? true : false}
                value={
                  pay[0]?.customer
                    ? pay[0]?.customer?.firstName +
                      " " +
                      pay[0]?.customer.lastName
                    : ""
                }
                placeholder="Nhập tên khách..."
              />
            </Form.Item>

            <Form.Item label="Ghi chú">
              <TextArea rows={2} />
            </Form.Item>
            <div className="block_details">
              <p>
                <span>Tạm tính: </span>
                <span>{VND.format(totalPrice)}</span>
              </p>
              <div>
                {promotionApplicalbe.length > 0 ? (
                  contentPromotion
                ) : null}
                {/* <div className="block_discount">
                  <span style={{ textAlign: "end" }}>
                    {VND.format(discountMoney)}
                  </span>
                  {promotion.map((val) => {
                    if (val?.type === "2" && val?.promotionCode) {
                      return <span className="color_text">{val?.message}</span>;
                    }
                    return null;
                  })}
                </div> */}
              </div>
              <p className="total_price_final">
                <span className="total_text_final">Thành tiền: { promotionWarning.length > 0 && 
                (
                  <Popover content={content} title="Khuyến mãi hấp đẫn ✨">
                    <InfoCircleTwoTone />
                  </Popover>
                )}
                 </span>
                <span className="total_price_final">
                  {VND.format(totalPrice - totalDiscount)}
                </span>
              </p>
              <Form.Item
                style={{
                  textAlign: "center",
                  marginTop: "80px",
                }}
                label=""
              >
                <Button
                  type="primary"
                  onClick={handlePay}
                  loading={loading ? true : false}
                >
                  Thanh toán
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default PayComponent;
