import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
  Upload,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const ModelAddPromoLine = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalAddCustomer(false);
  };

  //handle submit form create new customer...
  const handleSubmit = () => {
    //write code in here...
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Drawer
        title="Thêm khuyến mãi"
        width={720}
        onClose={onClose}
        open={showModalAddCustomer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Chọn phim"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn bộ phim...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn phim"
                  style={{
                    width: "100%",
                  }}
                  // onChange={handleChangePosition}
                  options={[
                    {
                      value: "film01",
                      label: "Hành động hay",
                    },
                    {
                      value: "film02",
                      label: "Người sói 2",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Chọn phòng chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn phòng chiếu...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn phòng chiếu"
                  style={{
                    width: "100%",
                  }}
                  // onChange={handleChangePosition}
                  options={[
                    {
                      value: "room012D",
                      label: "room01-2D",
                    },
                    {
                      value: "room023D",
                      label: "room02-3D",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="releaseDate"
                label="Ngày chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày chiếu bộ phim...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày chiếu"
                />
              </Form.Item>
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="date"
                label="Chọn khung giờ"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn khung giờ bộ phim...",
                  },
                ]}
              >
                <TimePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
              {/* <Radio>Khung giờ trống</Radio> */}
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddPromoLine;
