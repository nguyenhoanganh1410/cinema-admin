
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

const arrColumn = ["B", "C", "D", "E", "F", "G", "H", "I", "K"];

const arrRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    console.log(statusSeatState);
    console.log(statusState);
    handleLogic()
    //handleSubmit();
    // //submit
    // console.log(statusState);
    // console.log(statusSeatState);

    // const update = async (id, data) => {
    //   try {
    //     const response = await cinemaHallApi.updateSeat(
    //       id, data
    //     );
    //     if (response) {
    //       console.log("update success");
    //       setStatusSeatState(null)
    //       setStatusState(null)
    //     }
    //   } catch (error) {
    //     console.log("Featch erro: ", error);
    //   }
    // };
    // update(seat.id, {state: statusState, statusSeat: statusSeatState});
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
         
            <Select
               placeholder="Trạng thái"
               onChange={handleChange}
               name="status"
               style={{
                 width: "100%",
               }}
               labelInValue
               defaultValue={statusState}
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
              <Select
              placeholder="Loại ghế"
              onChange={handleChangeStatusSeat}
              name="statusSeat"
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

        </Form.Item>
          </Col>
        </Row>
        </Form>
      </Modal>

  );
};
export default ModelSeat;
