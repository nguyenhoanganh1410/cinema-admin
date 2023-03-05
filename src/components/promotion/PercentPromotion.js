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

const PercentPromotion = () => {
  return (
    <>
      <Form layout="vertical" hideRequiredMark>
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
              label="Chọn loại khuyến mãi "
              rules={[
                {
                  required: true,
                  message: "Hãy chọn loại khuyến mãi...",
                },
              ]}
            >
              <Select
                placeholder="Chọn loại KM"
                style={{
                  width: "100%",
                }}
                // onChange={handleChangePosition}
                options={[
                  {
                    value: "10",
                    label: "10%",
                  },
                  {
                    value: "20",
                    label: "20%",
                  },
                  {
                    value: "30",
                    label: "30%",
                  },
                  {
                    value: "40",
                    label: "40%",
                  },
                  {
                    value: "50",
                    label: "50%",
                  },
                ]}
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
export default PercentPromotion;
