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
        title="Th??m chi ti???t khuy???n m??i"
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
                label="M?? Code"
                rules={[
                  {
                    required: true,
                    message: "H??y nh???p m?? code...",
                  },
                ]}
              >
                <Input placeholder="H??y nh???p m?? code.." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="note" label="Ghi ch??">
                <Input.TextArea rows={4} placeholder="Nh???p ghi ch??..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Ch???n lo???i khuy???n m??i "
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n lo???i khuy???n m??i...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n lo???i KM"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangeTypePro}
                  options={[
                    {
                      value: "1",
                      label: "Khuy???n m??i t???ng ti???n",
                    },
                    {
                      value: "2",
                      label: "Khuy???n m??i t???ng ?????",
                    },
                    {
                      value: "3",
                      label: "Khuy???n m??i ph???n tr??m",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Ch???n tr???ng th??i"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n tr???ng th??i...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n tr???ng th??i"
                  style={{
                    width: "100%",
                  }}
                  // onChange={handleChangePosition}
                  options={[
                    {
                      value: "1",
                      label: "H???at ?????ng",
                    },
                    {
                      value: "2",
                      label: "H???t h???n",
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
                label="S??? l?????ng tr??n ng??y"
                rules={[
                  {
                    required: true,
                    message: "Nh???p s??? l???n ???????c s??? d???ng tr??n ng??y...",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={10}
                  defaultValue={1}
                  placeholder="Nh???p s??? l???n ???????c s??? d???ng tr??n ng??y.."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name=""
                label="S??? l?????ng tr??n kh??ch h??ng"
                rules={[
                  {
                    required: true,
                    message: "Nh???p s??? l???n ???????c s??? d???ng tr??n KH...",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={10}
                  defaultValue={1}
                  placeholder="Nh???p s??? l???n ???????c s??? d???ng tr??n KH..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="releaseDate"
                label="Ng??y b???t ?????u"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n ng??y b???t ?????u...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Ch???n ng??y b???t ?????u"
                />
              </Form.Item>
            </Col>
            <Col span={12} style={{}}>
              <Form.Item
                name="releaseDate"
                label="Ng??y k???t th??c"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n ng??y k???t th??c...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Ch???n ng??y k???t th??c"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="image"
                label="H??nh ???nh"
                valuePropName="fileList"
                extra="Ch??? ch???p nh???n file ???nh"
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
