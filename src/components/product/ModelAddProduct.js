import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
  Table
} from "antd";

import productApi from "../../api/productApi";
import moment from "moment";
import { setReload } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

const ModelAddProduct = ({
  showModalAddProduct,
  setShowModalAddProduct,

}) => {

  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [typeHall, setTypeHall] = useState("");

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
    }
  ];

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChangeType = (value) => {
    setType(value);
    setTypeHall("");
    if(type){
      form.setFieldsValue({
        typeHall: "",
      });
    }
  };

  const onChangeHall  = (value) => {
    setTypeHall(value);
    if(type === "SP"){
      form.setFieldsValue({
        typeHall: "",
      });
    }
  };

  const onClose = () => {
    setShowModalAddProduct(false);
  };

  const handleSubmit = async (val) => {
    console.log("submit", val);
    const { productName, productCode, type, typeHall,desc,image } = val;
    console.log("name", productName);

    const data = new FormData();
    data.append("type", type? type : "");
    data.append("productCode", productCode? productCode : "");
    data.append("productName", productName ? productName : "");
    data.append("typeHall", typeHall ? typeHall : "");
    data.append("desc", desc ? desc : "");
    if (image) {
      data.append("image", image[0].originFileObj ? image[0].originFileObj : "");
    }
    try {
      const response = await productApi.createProduct(data);
      console.log(response);
      if (response) {
        onClose();
        depatch(setReload(!reload));
        form.resetFields();
        setTimeout(() => {
          message.success("Thêm khách hàng thành công!");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };




  const dummyRequest = ({ file, onSuccess }) => {
    setImage(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  

  return (
    <>
      <Drawer
        title="Thông tin khách hàng"
        width={720}
        onClose={onClose}
        open={showModalAddProduct}
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
        <Form form={form} onFinish={handleSubmit} id="myForm" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="Loại sản phẩm">
                <Select
                  placeholder="Chọn loại sản phẩm"
                  style={{
                    width: "100%",
                  }}
                  
                  onChange={onChangeType}
                  options={[
                    {
                      value: "Ghe",
                      label: "Ghế",
                    },
                    {
                      value: "SP",
                      label: "Sản phẩm",
                    },
                    {
                      value: "CB",
                      label: "Combo",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="productCode" label="Mã sản phẩm">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="productName" label="Tên sản phẩm">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="image"
                label="Hình ảnh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Chỉ chấp nhận file ảnh"
                type="file"
              >
                <Upload
                  name="image"
                  customRequest={dummyRequest}
                  listType="picture"
                  maxCount={1}
                  accept=".jpg,.jpeg,.png"
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              {/* <Form.Item name="typeHall" label="Phòng chiếu">
                <Select
                 disabled={ !type || type === "SP" ? true : false }
                  placeholder="Chọn loại Phòng chiếu"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeHall}
                  options={[
                    {
                      value: "2D",
                      label: "2D",
                    },
                    {
                      value: "3D",
                      label: "3D",
                    },
                  ]}
                />
              </Form.Item> */}
            </Col>
          </Row>
          <Row gutter={16}>
          <Button style={{
            marginBottom: "16px",
            marginLeft: "530px"

          }} 
          type="primary">Thêm sản phẩm</Button>
          <Col span={24}>
              <Form.Item name="comboLine">
                <Table
                  columns={columns}
                  pagination={false}
                  size="small"
                />
              </Form.Item>
            </Col>
          </Row> 
          <Row style={{ marginTop: "16px" }} gutter={16}>
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
export default ModelAddProduct;
