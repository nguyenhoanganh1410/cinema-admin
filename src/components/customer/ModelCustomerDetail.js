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
import customerApi from "../../api/customerApi";
import moment from "moment";

const { Option } = Select;

const ModelDetailCustomer = ({
  showModalDetailCustomer,
  setShowModalDetailCustomer,
  selectedId,
}) => {
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);
  const [wardPicked, setWardPicked] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({});
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [image, setImage] = useState("");

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChangeProvince = (value) => {
    console.log(`selected ${value}`);
    setProvincePicked(value);
  };
  const onChangeDistrict = (value) => {
    console.log(`selected ${value}`);
    setDistrictPicked(value);
  };

  const onChangeWard = (value) => {
    console.log(`selected ${value}`);
    setWardPicked(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalDetailCustomer(false);
  };

  const handleSubmit = async (val) => {
    console.log("submit", val);
    const { id, firstName, lastname, phone, email, address, dob, note, image } =
      val;
    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastname);
    data.append("phone", phone);
    data.append("email", email);
    data.append("address", address);
    data.append("dob", dob);
    data.append("note", note);
    data.append("city_id", provincePicked);
    data.append("district_id", districtPicked);
    data.append("ward_id", wardPicked);
    data.append("street", address);
    console.log("data", image);
    if (image) {
      data.append("image", image[0].originFileObj);
    }

    // const data = {
    //   firstName: firstName,
    //   lastName: lastname,
    //   phone: phone,
    //   email: email,
    //   address: address,
    //   dob: dob,
    //   note: note,
    //   city_id: provincePicked,
    //   district_id: districtPicked,
    //   ward_id: wardPicked,
    //   street: address,
    // };
    try {
      const response = await customerApi.updateCustomer(id, data);
      console.log(response);
      if (response) {
        onClose();
        setTimeout(() => {
          message.success("C???p nh???t th??nh c??ng");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCustomerInfo = async (id) => {
      try {
        const response = await customerApi.getCustomer(id);

        if (response) {
          console.log("res", response);
          setCustomerInfo(response);
          setProvincePicked(Number(response.city_id));
          setDistrictPicked(Number(response.district_id));
          setWardPicked(Number(response.ward_id));
          setImage(response.image);
          console.log("file", response.image);

          form.setFieldsValue({
            id: response.id,
            firstName: response.firstName,
            lastname: response.lastName,
            phone: response.phone,
            email: response.email,
            dob: response.dob,
            address: response.address,
            province: response.province,
            district: response.district,
            ward: response.ward,
            image: [
              {
                uid: "-1",
                name: response.image,
                status: "done",
                url: response?.image,
              },
            ],
          });
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };
    fetchCustomerInfo(selectedId);
  }, []);
  console.log("customerInfo", customerInfo);
  console.log("fileList", fileList);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await openAddressApi.getList("/p");

        //console.log(response);
        if (response) {
          const newResponse = response.map((val) => {
            return {
              value: val.code,
              label: val.name,
            };
          });
          setProvince(newResponse);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (provincePicked !== 0) {
      console.log("run");
      const fetchConversations = async (id) => {
        try {
          const response = await openAddressApi.getList(`/p/${id}?depth=2`);

          console.log(response);
          if (response) {
            const { districts } = response;
            const newDistricts = districts.map((val) => {
              return {
                value: val.code,
                label: val.name,
              };
            });
            setDistricts(newDistricts);
          }
        } catch (error) {
          console.log("Failed to fetch conversation list: ", error);
        }
      };

      fetchConversations(provincePicked);
    }
  }, [provincePicked]);

  useEffect(() => {
    if (districtPicked !== 0) {
      const fetchConversations = async (id) => {
        try {
          const response = await openAddressApi.getList(`/d/${id}?depth=2`);

          console.log(response);
          if (response) {
            const { wards } = response;
            const newWards = wards.map((val) => {
              return {
                value: val.code,
                label: val.name,
              };
            });
            setWards(newWards);
          }
        } catch (error) {
          console.log("Failed to fetch conversation list: ", error);
        }
      };

      fetchConversations(districtPicked);
    }
  }, [districtPicked]);

  const dummyRequest = ({ file, onSuccess }) => {
    setImage(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <>
      <Drawer
        title="Th??ng tin kh??ch h??ng"
        width={720}
        onClose={onClose}
        open={showModalDetailCustomer}
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
              <Form.Item name="firstName" label="H???">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastname" label="T??n">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="S??? ??i???n tho???i">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Ch???n t???nh th??nh"
                optionFilterProp="children"
                value={provincePicked}
                onChange={onChangeProvince}
                onSearch={onSearch}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={province}
              />
            </Col>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Ch???n qu???n huy???n"
                optionFilterProp="children"
                value={districtPicked}
                onChange={onChangeDistrict}
                onSearch={onSearch}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={districts}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "24px" }}>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Ch???n ph?????ng/x??"
                optionFilterProp="children"
                onChange={onChangeWard}
                value={wardPicked}
                onSearch={onSearch}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={wards}
              />
            </Col>
            <Col span={12}>
              <Form.Item name="address">
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nh???p ?????a ch??? kh??ch h??ng..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dob" label="Ng??y sinh" valuePropName="date">
                <DatePicker
                  value={moment(customerInfo?.dob)}
                  style={{
                    width: "100%",
                  }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="H??nh ???nh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Ch??? ch???p nh???n file ???nh"
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

          <Row style={{ marginTop: "16px" }} gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Ghi ch??">
                <Input.TextArea rows={4} placeholder="Nh???p ghi ch??..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelDetailCustomer;
