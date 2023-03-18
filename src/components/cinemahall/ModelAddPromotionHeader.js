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
        message.success("Thêm thành công!");
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
        title="Tạo rạp"
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
              <Form.Item name="namePromotion" label="Chi nhánh">
                <Input placeholder="Cinema Võ văn ngân" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên phòng chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên phòng chiếu...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên phòng chiếu..." />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại phòng"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn loại phòng...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn loại phòng"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangePosition}
                  options={[
                    {
                      value: "0",
                      label: "Phòng 2D",
                    },
                    {
                      value: "1",
                      label: "Phòng 3D",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="seats"
                label="Số ghế"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn số ghế...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn số ghế"
                  style={{
                    width: "100%",
                  }}
                  // onChange={handleChangePosition}
                  options={[
                    {
                      value: "0",
                      label: "Big - 80 ghế(10-20-50)",
                    },
                    {
                      value: "1",
                      label: "Medium - 50 ghế(5-20-25)",
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
