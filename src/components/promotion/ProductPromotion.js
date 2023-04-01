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

const ProductPromotion = (
  handleSubmit,
) => {
  const [form] = Form.useForm();
  handleSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <>
      <Form 
        form={form}
        id="myFormAddLinePro"
        onFinish={handleSubmit}
      layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="productBuy"
              label="Chọn sản phẩm mua "
              rules={[
                {
                  required: true,
                  message: "Hãy chọn sản phẩm mua...",
                },
              ]}
            >
              <Select
                placeholder="Chọn sản phẩm mua"
                style={{
                  width: "100%",
                }}
                // onChange={handleChangePosition}
                options={[
                  {
                    value: "1",
                    label: "Ghế Thường",
                  },
                  {
                    value: "2",
                    label: "Ghế Đôi",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="productReceive"
              label="Chọn sản phẩm nhận"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn sản phẩm nhận...",
                },
              ]}
            >
              <Select
                placeholder="Chọn sản phẩm nhận"
                style={{
                  width: "100%",
                }}
                // onChange={handleChangePosition}
                options={[
                  {
                    value: "1",
                    label: "Ghế Thường",
                  },
                  {
                    value: "2",
                    label: "Ghế Đôi",
                  },
                  {
                    value: "1",
                    label: "Bắp rang bơ ",
                  },
                  {
                    value: "2",
                    label: "Pepsi vị chanh lớn",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="qtyBuy"
              label="Số lượng mua"
              rules={[
                {
                  required: true,
                  message: "Nhập số lượng mua...",
                },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                style={{ width: "100%" }}
                defaultValue={1}
                placeholder="Nhập số lượng mua.."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="qtyReceive"
              label="Số lượng nhận"
              rules={[
                {
                  required: true,
                  message: "Nhập số  lượng nhận...",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                max={10}
                defaultValue={1}
                placeholder="Nhập số lượng nhận.."
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default ProductPromotion;
