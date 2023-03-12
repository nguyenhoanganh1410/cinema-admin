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
} from "antd";
import openAddressApi from "../../api/openApi";
import productApi from "../../api/productApi";
import moment from "moment";

const { Option } = Select;

const ModelDetailCustomer = ({
  showModalDetailProduct,
  setShowModalDetailProduct,
  selectedId,
}) => {
  const [productInfo, setProductInfo] = useState({});
  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [typeHall, setTypeHall] = useState("");

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChangeType = (value) => {
    setType(value);
  };

  const onChangeHall  = (value) => {
    setTypeHall(value);
  };

  const onClose = () => {
    setShowModalDetailProduct(false);
  };

  const handleSubmit = async (val) => {
    // console.log("submit", val);
    // const { id, firstName, lastname, phone, email, address, dob, note, image } =
    //   val;
    // const data = new FormData();
    // data.append("firstName", firstName);
    // data.append("lastName", lastname);
    // data.append("phone", phone);
    // data.append("email", email);
    // data.append("address", address);
    // data.append("dob", dob);
    // data.append("note", note);
    // data.append("city_id", provincePicked);
    // data.append("district_id", districtPicked);
    // data.append("ward_id", wardPicked);
    // data.append("street", address);
    // console.log("data", image);
    // if (image) {
    //   data.append("image", image[0].originFileObj);
    // }

    // // const data = {
    // //   firstName: firstName,
    // //   lastName: lastname,
    // //   phone: phone,
    // //   email: email,
    // //   address: address,
    // //   dob: dob,
    // //   note: note,
    // //   city_id: provincePicked,
    // //   district_id: districtPicked,
    // //   ward_id: wardPicked,
    // //   street: address,
    // // };
    // try {
    //   const response = await customerApi.updateCustomer(id, data);
    //   console.log(response);
    //   if (response) {
    //     onClose();
    //     setTimeout(() => {
    //       message.success("Cập nhật thành công");
    //     }, 1000);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    const fetchProductInfo = async (id) => {
      try {
        const response = await productApi.getProductById(id);

        if (response) {
          console.log("res", response);
          setImage(response.image);
          setType(response.type);
          setTypeHall(response.typeHall);
          form.setFieldsValue({
            ...response,
            image: [
              {
                uid: "-1",
                name: response.image,
                status: "done",
                url: response.image,
              },
            ],
          });
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };
    console.log("selectedId", selectedId);
    fetchProductInfo(selectedId);
  }, []);



  const dummyRequest = ({ file, onSuccess }) => {
    setImage(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  console.log("typeHall", typeHall);

  return (
    <>
      <Drawer
        title="Thông tin khách hàng"
        width={720}
        onClose={onClose}
        open={showModalDetailProduct}
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
              <Form.Item name="id" label="ID">
                <Input disabled={true} />
              </Form.Item>
            </Col>

            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="Loại sản phẩm">
                <Select
                  disabled={true}
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
                <Input disabled={true}/>
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
              <Form.Item name="typeHall" label="Phòng chiếu">
                <Select
                 disabled={!typeHall}
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
          <Row gutter={16} style={{ marginTop: "24px" }}>
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
            </Col>
            <Col span={12}></Col>
          </Row>

          
        </Form>
      </Drawer>
    </>
  );
};
export default ModelDetailCustomer;
