import React, { useEffect, useState } from "react";

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
} from "antd";
import openAddressApi from "../../api/openApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";


const { Option } = Select;

const ModelAddEmployee = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);

  const onChangeProvince = (value) => {
    console.log(`selected ${value}`);
    setProvincePicked(value);
  };
  const onChangeDistrict = (value) => {
    console.log(`selected ${value}`);
    setDistrictPicked(value);
  };
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

  return (
    <>
      <Drawer
        title="Th??m nh??n vi??n"
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
                label="H??? v?? t??n"
                rules={[
                  {
                    required: true,
                    message: "H??y nh???p t??n nh??n vi??n...",
                  },
                ]}
              >
                <Input placeholder="H??y nh???p t??n nh??n vi??n..." />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="H??y nh???p s??? ??i???n tho???i">
                <Input placeholder="H??y nh???p s??? ??i???n tho???i..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="H??y nh???p email">
                <Input placeholder="H??y nh???p email..." />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Ch???n ch???c v???"
                style={{
                  width: "100%",
                }}
                onChange={handleChangePosition}
                options={[
                  {
                    value: "manager",
                    label: "Qu???n l??",
                  },
                  {
                    value: "staff1",
                    label: "Nh??n vi??n thu ng??n",
                  },
                  {
                    value: "staff2",
                    label: "Nh??n vi??n h???u c???n",
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <DatePicker
                onChange={onChangeDate}
                style={{ width: "100%" }}
                placeholder="Ch???n ng??y v??o l??m"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Ch???n t???nh th??nh"
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
                placeholder="Ch???n qu???n huy???n"
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
                placeholder="Ch???n ph?????ng/x??"
                optionFilterProp="children"
                // onChange={onChange}
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
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Nh???p ?????a ch??? nh??n vi??n...",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nh???p ?????a ch??? nh??n vi??n..."
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddEmployee;
