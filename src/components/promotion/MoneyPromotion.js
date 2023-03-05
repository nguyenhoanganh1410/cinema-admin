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

const MoneyPromotion = ({ showModalAddCustomer, setShowModalAddCustomer }) => {
  return (
    <>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="category"
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
                    label: "ve 3d",
                  },
                  {
                    value: "2",
                    label: "bap nuoc",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name=""
              label="Số lượng mua"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Nhập số lượng mua...",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={10}
                defaultValue={1}
                placeholder="Nhập số lượng mua.."
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name=""
              label="Số tiền KM"
              rules={[
                {
                  required: true,
                  message: "Nhập số  tiền KM...",
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
                placeholder="Nhập số tiền KM.."
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name=""
              label="Ngân sách"
              rules={[
                {
                  required: true,
                  message: "Nhập số  tiền ngân sách...",
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
                placeholder="Nhập số tiền ngân sách.."
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default MoneyPromotion;
