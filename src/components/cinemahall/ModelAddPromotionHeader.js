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
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import promotionApi from "../../api/promotionApi";

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
  const [form] = Form.useForm();

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
  const handleSubmit = async (val) => {
    const { namePromotion, desc, startDate, endDate, statusPromotion, image } =
      val;

    const newStartDate = new Date(startDate?.$d).toISOString();
    const newEndDate = new Date(endDate?.$d).toISOString();

    const data = new FormData();
    data.append("namePromotion", namePromotion);
    data.append("desc", desc);
    data.append("statusPromotion", statusPromotion);
    data.append("startDate", newStartDate);
    data.append("endDate", newEndDate);

    console.log(data);

    if (image) {
      data.append("image", image[0].originFileObj);
    }
    const rs = await promotionApi.createPromotionHeader(data);
    console.log(rs);
    if (rs) {
      setShowModalAddCustomer(false);

      form.resetFields();
      setTimeout(() => {
        message.success("Th??m th??nh c??ng!");
      }, 500);
    }
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    console.log(dateString);
  };

  //choise date start worling
  const onChangeEndDate = (date, dateString) => {
    console.log(dateString);
  };

  useEffect(() => {
    form.setFieldsValue({
      namePromotion: "",
      desc: "",
    });
  }, []);
  return (
    <>
      <Drawer
        title="T???o r???p"
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
              <Form.Item name="namePromotion" label="Chi nh??nh">
                <Input placeholder="Cinema V?? v??n ng??n" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="T??n ph??ng chi???u"
                rules={[
                  {
                    required: true,
                    message: "H??y nh???p t??n ph??ng chi???u...",
                  },
                ]}
              >
                <Input placeholder="H??y nh???p t??n ph??ng chi???u..." />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Lo???i ph??ng"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n lo???i ph??ng...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n lo???i ph??ng"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangePosition}
                  options={[
                    {
                      value: "0",
                      label: "Ph??ng 2D",
                    },
                    {
                      value: "1",
                      label: "Ph??ng 3D",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddPromotionHeader;
