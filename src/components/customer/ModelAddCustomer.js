import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import openAddressApi from "../../api/openApi";
import customerApi from "../../api/customerApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";
const { Option } = Select;

const ModelAddCustomer = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);
  const [wardPicked, setWardPicked] = useState(0);
  const [isExistPhone, setIsExistPhone] = useState(true);
  const [form] = Form.useForm();

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
    setShowModalAddCustomer(false);
  };

  const onChangePhone = async (e) => {
    console.log("phone:", e.target.value);
    const phone = e.target.value;
    if (phone.length === 10) {
      const rs = await customerApi.getCustomerByPhone(phone);
      console.log(rs);
      if (rs.data !== null) {
        setIsExistPhone(false);
        console.log("exist");
        message.error("Số điện thoại đã tồn tại!");
      } else {
        setIsExistPhone(true);
        console.log("not exist");
      }
    }
  };

  //handle submit form create new customer...
  const handleSubmit = async (val) => {
    console.log("values:", val);
    // const { firstname, lastname, phone, email, address, dob, note, image } =
    //   val;
    // const date = new Date(dob?.$d).toISOString();
    // const data = new FormData();
    // data.append("firstName", firstname);
    // data.append("lastName", lastname);
    // data.append("phone", phone);
    // data.append("email", email);
    // data.append("address", address);
    // data.append("dob", date);
    // data.append("city_id", provincePicked);
    // data.append("district_id", districtPicked);
    // data.append("ward_id", wardPicked);
    // data.append("street", address);
    // data.append("note", note);

    // if (image) {
    //   data.append("image", image[0].originFileObj);
    // }

    // console.log(data);
    // const rs = await customerApi.createCustomer(data);

    // if (rs) {
    //   setShowModalAddCustomer(false);
    //   depatch(setReload(!reload));
    //   form.resetFields();
    //   setTimeout(() => {
    //     message.success("Thêm nhân viên thành công!");
    //   }, 500);
    // }
  };

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
      //console.log("run");
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
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(() => {
    form.validateFields(["phone"]);
  }, [isExistPhone]);

  const validateEmail = (value) => {
    if (value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(value)) {
        return Promise.reject("Email không hợp lệ!");
      }
    }
    return Promise.resolve();
  };

  return (
    <>
      <Drawer
        title="Tạo mới khách hàng"
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
        <Form form={form} onFinish={handleSubmit} id="myForm" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="Họ"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên khách hàng..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên khách hàng...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên khách hàng..." />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Hãy nhập số điện thoại"
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value !== undefined && value.length < 10) {
                        return Promise.reject("Số điện thoại phải có 10 số");
                      } else if (isExistPhone === false) {
                        return Promise.reject("Số điện thoại đã tồn tại");
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  onChange={onChangePhone}
                  placeholder="Hãy nhập số điện thoại..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Hãy nhập email"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value !== undefined && value.length < 1) {
                        return Promise.reject("Email không hợp lệ");
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input placeholder="Hãy nhập email..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Chọn tỉnh thành"
                optionFilterProp="children"
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
                placeholder="Chọn quận huyện"
                optionFilterProp="children"
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
                placeholder="Chọn phường/xã"
                optionFilterProp="children"
                onChange={onChangeWard}
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
                  placeholder="Nhập địa chỉ khách hàng..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dob" label="Ngày sinh">
                <DatePicker
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
                label="Hình ảnh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Chỉ chấp nhận file ảnh"
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
            <Col span={12}></Col>
          </Row>

          <Row style={{ marginTop: "16px" }} gutter={16}>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea rows={4} placeholder="Nhập ghi chú..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddCustomer;
