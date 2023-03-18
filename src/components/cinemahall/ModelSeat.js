
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
  Form
} from "antd";
import "./IndexRoomMap.scss";
import cinemaHallApi from "../../api/cinemaHallApi";
import { MdChair, MdOutlineSignalCellularNull } from "react-icons/md";
import { useSelector } from "react-redux";

const initValue = {
  status:"",
  statusSeat:""
}
const ModelSeat = ({possition, seat, handleLogic }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [statusSeatState, setStatusSeatState] = useState(null)
  const [statusState, setStatusState] = useState(null)

  

  const handleOk = () => {
   
    
    const update = async (id, data) => {
      try {
        const response = await cinemaHallApi.updateSeat(
          id, data
        );
        if (response) {
          console.log("update success");
          setStatusSeatState(null)
          setStatusState(null)
           handleLogic();
        }
      } catch (error) {
        console.log("Featch erro: ", error);
      }
    };
    update(seat.id, {status: statusState, statusSeat: statusSeatState});
  };
  const handleCancel = () => {
    handleLogic()
  };

  const handleChange = (value) => {
   
    setStatusState(value)
  };

  const handleChangeStatusSeat = (value) => {
    setStatusSeatState(value)
  };
  
  useEffect(()=>{
    setStatusSeatState(seat?.statusSeat);
    setStatusState(seat?.status)
  },[])
 
  return (
      <Modal
        title="Thông tin ghế"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} id="myForm" layout="vertical">

        <Row style={{ marginBottom: "16px" }}>
          <Col span={4}>Vị trí:</Col>
          <Col span={20}>{possition}</Col>
        </Row>
        <Row >
          <Col span={4}>Trạng thái:</Col>
          <Col span={20}>      
          <Form.Item
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
         {
          seat.status === 1 ? 
          <Select
             placeholder="Trạng thái"
             onChange={handleChange}
             name="status"
             style={{
               width: "100%",
             }}
             defaultValue={{
              value: "1",
              label: "Sẵn sàng",
            }}
             options={[
               {
                 value: "1",
                 label: "Sẵn sàng",
               },
               {
                 value: "0",
                 label: "Bảo trì",
               },
             ]}
           /> : 
           <Select
             placeholder="Trạng thái"
             onChange={handleChange}
             name="status"
             style={{
               width: "100%",
             }}
             defaultValue={{
              value: "0",
              label: "Bảo trì",
            }}
             options={[
               {
                 value: "1",
                 label: "Sẵn sàng",
               },
               {
                 value: "0",
                 label: "Bảo trì",
               },
             ]}
           /> 
         }
          </Form.Item>     
          </Col>
        </Row>
        <Row>
          <Col span={4}>Loại ghế:</Col>
          <Col span={20}>
          <Form.Item
          name="statusSeat"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {
            seat?.statusSeat ? 
            <Select
            placeholder="Loại ghế"
            onChange={handleChangeStatusSeat}
            name="statusSeat"
            defaultValue={{
              value: "true",
              label: "Ghế đôi",
            }}
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "false",
                  label: "Ghế đơn",
                },
                {
                  value: "true",
                  label: "Ghế đôi",
                },
              ]}
            />  : 
            <Select
            placeholder="Loại ghế"
            onChange={handleChangeStatusSeat}
            name="statusSeat"
            defaultValue={{
              value: "false",
                  label: "Ghế đơn",
            }}
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "false",
                  label: "Ghế đơn",
                },
                {
                  value: "true",
                  label: "Ghế đôi",
                },
              ]}
            /> 
          }

        </Form.Item>
          </Col>
        </Row>
        </Form>
      </Modal>

  );
};
export default ModelSeat;
