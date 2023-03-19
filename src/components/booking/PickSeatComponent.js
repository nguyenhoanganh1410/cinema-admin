import React, { useEffect, useState } from "react";
import {
  Input,
  Col,
  Row,
  Typography,
  Button,
  Modal,
  Breadcrumb,
  DatePicker,
  Select,
  notification
} from "antd";
import "../cinemahall/IndexRoomMap.scss";
import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import cinemaHallApi from "../../api/cinemaHallApi";
import { MdChair, MdOutlineSignalCellularNull } from "react-icons/md";



const openNotification = () => {
  notification.open({
    message: 'Thông báo',
    description:
      'Cập nhật ghế thành công!!',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const arrColumn = ["B", "C", "D", "E", "F", "G", "H", "I", "K"];

const arrRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const PickSeatComponent = ({ setTab }) => {
  const [seats, setSeats] = useState([]);
  const idCinemaHall = useSelector((state) => state.cinemaHallId);
  const [seat, setSeat] = useState(null);
  const [possition, setPossition] = useState("");
  const [open, setOpen] = useState(false);
  const booking = useSelector((state) => state.booking);
  console.log(booking);


  useEffect(() => {
    const getSeats = async (_id) => {
      try {
        const response = await cinemaHallApi.getCinemaHallSeatById(
          _id
        );
        if (response) {
          setSeats(response);
        }
      } catch (error) {
        console.log("Featch erro: ", error);
      }
    };
    getSeats(booking?.show?.Show?.idCinemaHall);
  }, []);

  const handleShowModel = (val, idx, seat) => {
    //call api get seat
    const getSeatById = async (id) => {
      try {
        const response = await cinemaHallApi.getSeatById(id);
        if (response) {
          setSeat(response);
        }
      } catch (error) {
        console.log("Featch erro: ", error);
      }
    };
    getSeatById(seat.id);
   
  };
  return (
    <div className="pick_seat site-card-wrapper">
      
      <Row
        gutter={{
          xs: 8,
          lg: 32,
        }}
        style={{  padding: "1rem", height:"80vh" }}
      >
        <div style={{display:"flex", alignItems:"center", marginLeft:"1rem"}}>
         <div className="blocks-remine">
            <div className="blocks-remine">
            <span className="block-remine_block" style={{backgroundColor:"red"}}></span>
            <span className="blocks-remine_text">Ghế bảo trì</span>
            </div>
          </div>
          <div className="blocks-remine">
            <div className="blocks-remine">
            <span className="block-remine_block" style={{backgroundColor:"gray"}}></span>
            <span className="blocks-remine_text">Ghế đã đặt</span>
            </div>
          </div>
          <div className="blocks-remine">
            <div className="blocks-remine">
            <MdChair />
            <span className="blocks-remine_text">Ghế đơn</span>
            </div>
          </div>
          <div className="blocks-remine">
            <div className="blocks-remine">
            <MdChair />
            <MdChair />
            <span className="blocks-remine_text">Ghế đôi</span>
            </div>
          </div>
        </div>
        <Col
          span={24}
          style={{
            background: "",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         
          <div
            style={{
              width: "80%",
              height: "24px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "orange",
              borderRadius: "4px",
            }}
          >
            <text style={{ color: "white", fontWeight: "700" }}>Màn Hình</text>
          </div>

          <div className="block-cinema">
            <div className="cinemaHall_left">
              <span>STT</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
              <span>E</span>
              <span>F</span>
              <span>G</span>
              <span>H</span>
              <span>I</span>
              <span>K</span>
            </div>
            <table id="cinema-hall">
              <tr>
                {arrRow.map((val) => {
                  return <td>{val}</td>;
                })}
              </tr>
              <>
                {arrColumn.map((val, idx) => {
                  let number = 1;
                  let agg = 1;
                  const newArr = seats.filter((seat) => {
                    if (seat.seatColumn === val) {
                      return seat;
                    }
                  });

                  return (
                    <>
                      <tr>
                        {newArr.map((seat, idx) => {
                          let tmp = idx + 1
                          if (seat.seatColumn === val) {
                            return (
                              <>
                              {
                                seat?.Product.typeSeat === 3 ? 
                              <td
                                onClick={() => handleShowModel(val, idx + 1, seat)}
                                title={seat?.status ? val + tmp : val + tmp + " ghế bảo trì"}
                                key={seat.createdAt}
                                style={!seat?.status ? {background:"red"} : {}}
                              >
                                <span>
                                  <MdChair />
                                  <MdChair />
                                </span>
                              </td> : 
                               <td
                                onClick={() => handleShowModel(val, idx + 1, seat)}
                               title={seat?.status ? val + tmp : val + tmp + " ghế bảo trì"}
                               key={seat.createdAt}
                               style={!seat?.status ? {background:"red"} : {}}
                             >
                               <span>
                                 <MdChair />
                               
                               </span>
                             </td>
                              }
                              
                              </>
                          
                            );
                          }
                          return (
                            <td
                               onClick={() => handleShowModel(val, agg++)}
                              title={val + number}
                            ></td>
                          );
                        })}
                      </tr>
                     
                    </>
                  );
                })}
              </>
            </table>
          </div>
        </Col>
      
      </Row>
      
  
    </div>
  );
};
export default PickSeatComponent;
