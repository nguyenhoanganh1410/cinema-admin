import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const { Option } = Select;

const ModelAddPromotionHeader = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  /////

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
                name="name"
                label="Tên CT Khuyến mãi"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên CT khuyến mãi...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên CT khuyến mãi..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Chi tiết CTKM"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập chi tiết CTKH...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập chi tiết CTKM..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="releaseDate"
                label="Ngày bắt đầu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày bắt đầu...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày bắt đầu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="releaseDate"
                label="Ngày kết thúc"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày kết thúc...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày kết thúc"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn trạng thái...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn trạng thái"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangePosition}
                  options={[
                    {
                      value: "0",
                      label: "Hoạt động",
                    },
                    {
                      value: "1",
                      label: "Ngưng hoạt động",
                    },
                    {
                      value: "2",
                      label: "Hết hạn",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddPromotionHeader;
