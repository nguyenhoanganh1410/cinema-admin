import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  Tag,
  InputNumber,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import useModelAddPromotionHeaderHook from "./useModelAddPromotionHeaderHook";

const { RangePicker } = DatePicker;
const ModelAddPromotionHeader = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  const {
    normFile,
    dummyRequest,
    tagRender,
    form,
    ranks,
    rankPicked,
    startDate,
    endDate,
    onSearch,
    onChangeDate,
    handleChangeRank,
    handleSubmit,
    yupSync,
    onClose,
  } = useModelAddPromotionHeaderHook(
    showModalAddCustomer,
    setShowModalAddCustomer
  );

  return (
    <>
      <Drawer
        title="Thêm CT Khuyến mãi"
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
        <Form layout="vertical" onFinish={handleSubmit} id="myForm" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="namePromotion"
                label="Tên CT Khuyến mãi"
                rules={[yupSync]}
              >
                <Input placeholder="Hãy nhập tên CT khuyến mãi..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="promotionCode"
                label="Mã CT Khuyến mãi"
                rules={[yupSync]}
              >
                <InputNumber
                  placeholder="Hãy nhập mã CT khuyến mãi..."
                  addonBefore="PRO"
                  min={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Ngày bắt đầu"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value) {
                        return Promise.reject("Hãy nhập ngày bắt đầu.");
                      }
                      if (value < new Date()) {
                        return Promise.reject(
                          "Ngày bắt đầu nhỏ hơn ngày kết thúc!"
                        );
                      }
                      if (value > moment(endDate)) {
                        return Promise.reject(
                          "Ngày bắt đầu phải nhỏ hơn ngày kết thúc."
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <RangePicker
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                  onChange={onChangeDate}
                  disabledDate={
                    (current) => {
                      return current && current < moment().endOf('day');
                    }
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="rankCustomer" label="Nhóm khách hàng">
                <Select
                  placeholder="Chọn nhóm khách hàng"
                  style={{
                    width: "100%",
                  }}
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  onChange={handleChangeRank}
                  options={ranks}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Hình ảnh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Chỉ chấp nhận file ảnh có dạng .jpg, .jpeg, .png"
                type="file"
              >
                <Upload
                  name="logo"
                  customRequest={dummyRequest}
                  listType="picture"
                  maxCount={1}
                  accept=".jpg,.jpeg,.png"
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="desc" label="Mô tả">
                <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddPromotionHeader;
