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

const ProductPromotion = ({handleSubmit, disabled,listProduct,listProductSeat, promtionDetails}) => {
  const [form] = Form.useForm();
  console.log(listProduct);
  handleSubmit = (values) => {
    console.log("values", values);
  };
  useEffect(() => {
    if (promtionDetails) {
      form.setFieldsValue({
        id: promtionDetails.id,
        productBuy: promtionDetails?.IdProduct_buy || 0,
        productReceive: promtionDetails?.IdProduct_receive || 0,
        qtyReceive: promtionDetails?.qty_receive || 0,
        qtyBuy: promtionDetails?.qty_buy || 0
      });
    }
  }, [promtionDetails]);
  return (
    <>
      <Form
        form={form}
        id="myFormAddLinePro"
        onFinish={handleSubmit}
        layout="vertical"
      >
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
                disabled={disabled}
                // onChange={handleChangePosition}
                options={listProductSeat}
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
                disabled={disabled}
                placeholder="Chọn sản phẩm nhận"
                style={{
                  width: "100%",
                }}
                // onChange={handleChangePosition}
                options={listProduct}
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
                disabled={disabled}
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
                disabled={disabled}
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
