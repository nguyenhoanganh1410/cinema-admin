import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
  
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";
import priceApi from "../../api/priceApi";
import moment from "moment";
const { Option } = Select;
const { RangePicker } = DatePicker;

const ModelAddCustomer = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);
  const user = useSelector((state) => state.user);
  const [startDatePicked, setStartDatePicked] = useState("");
  const [endDatePicked, setEndDatePicked] = useState("");
  const [form] = Form.useForm();

  const onClose = () => {
    setShowModalAddCustomer(false);
  };

  const onChangeDate = (date, dateString) => {
    setStartDatePicked(dateString[0]);
    setEndDatePicked(dateString[1]);
  };

  // const onChangeDate = (date, dateString) => {
  //   setStartDatePicked(dateString);
  // };

  const onChangeDateEnd = (date, dateString) => {
    setEndDatePicked(dateString);
  };

  //handle submit form create new customer...
  const handleSubmit = async (values) => {
    console.log("values:", values);
    console.log("user:", user);
    const data = {
      name: values.name,
      startDate: startDatePicked,
      endDate: endDatePicked,
      note: values.note,
      userCreate:user.id,
    }
    const res = await priceApi.createPriceHeader(data);
    console.log("res:", res);
    if(res){
      message.success("Tạo mới bảng giá thành công!");
      depatch(setReload(!reload));
      onClose();
    }
  };
 
  return (
    <>
      <Drawer
        title="Tạo mới bảng giá"
        width={720}
        onClose={onClose}
        open={showModalAddCustomer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button form="myForm" htmlType="submit" type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          id="myForm"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên bảng giá"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên bảng giá...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên bảng giá..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={24}>
              <Form.Item
                name="startDate"
                label="Ngày bắt đầu"
               
              >
                 <RangePicker
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                  onChange={onChangeDate}
                  style={{width: "250px"}}
                  disabledDate={
                    (current) => {
                      return current && current < moment().endOf('day');
                    }
                  }
                />
              </Form.Item>
            </Col>
         
          </Row>
          <Row style={{ marginTop: "16px" }} gutter={16}>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea rows={4} placeholder="Nhập ghi chú..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddCustomer;
