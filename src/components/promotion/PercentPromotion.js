import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
  Upload,
} from "antd";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const PercentPromotion = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("values", values);
    props.handleSubmit("values");
  };

  return (
    <>
      <Form
       form={form}
       onFinish={onFinish}
       id="myFormAddLinePro"
       layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="moneyBought"
              label="Số tiền Mua"
              rules={[
                {
                  required: true,
                  message: "Nhập số  tiền Mua...",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\VNĐ\s?|(,*)/g, "")}
                // onChange={onChange}
                placeholder="Nhập số tiền Mua.."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              name="percent"
              label="Phần trăm giảm"
              rules={[
                {
                  required: true,
                  message: "Nhập số phần trăm giảm...",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                max={100}
                placeholder="Nhập số phần trăm giảm.."
                formatter={(value) => `% ${value}`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default PercentPromotion;
