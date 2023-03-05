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
import ProductPromotion from "./ProductPromotion";
import MoneyPromotion from "./MoneyPromotion";
import PercentPromotion from "./PercentPromotion";

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModelAddPromoLine = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [type, setType] = useState(1);

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
  const handleChangeTypePro = (value) => {
    setType(+value);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const RenderType = () => {
    switch (type) {
      case 1:
        return <MoneyPromotion />;
      case 2:
        return <ProductPromotion />;
      case 3:
        return <PercentPromotion />;
      default:
        return <PercentPromotion />;
    }
  };
  return (
    <>
      <Drawer
        title="Thêm chi tiết khuyễn mãi"
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
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name=""
                label="Mã Code"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mã code...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập mã code.." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea rows={4} placeholder="Nhập ghi chú..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
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
                  onChange={handleChangeTypePro}
                  options={[
                    {
                      value: "1",
                      label: "Khuyến mãi tặng tiền",
                    },
                    {
                      value: "2",
                      label: "Khuyễn mãi tặng đồ",
                    },
                    {
                      value: "3",
                      label: "Khuyễn mãi phần trăm",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Chọn trạng thái"
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
                  // onChange={handleChangePosition}
                  options={[
                    {
                      value: "1",
                      label: "Họat động",
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name=""
                label="Số lượng trên ngày"
                rules={[
                  {
                    required: true,
                    message: "Nhập số lần được sử dụng trên ngày...",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={10}
                  defaultValue={1}
                  placeholder="Nhập số lần được sử dụng trên ngày.."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name=""
                label="Số lượng trên khách hàng"
                rules={[
                  {
                    required: true,
                    message: "Nhập số lần được sử dụng trên KH...",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={10}
                  defaultValue={1}
                  placeholder="Nhập số lần được sử dụng trên KH..."
                />
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
            <Col span={12} style={{}}>
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
          <Row>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Hình ảnh"
                valuePropName="fileList"
                extra="Chỉ chấp nhận file ảnh"
                type="file"
              >
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
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
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <RenderType />
      </Drawer>
    </>
  );
};
export default ModelAddPromoLine;
