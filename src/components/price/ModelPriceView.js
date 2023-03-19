import React, { useEffect, useState } from "react";
import { PlusOutlined,
   UploadOutlined,
   FileExcelOutlined,
   
} from "@ant-design/icons";
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
import TableCustomer from "./TableCustomer";

const { Option } = Select;

const ModelPriceView = ({
  showModalPriceView,
  setShowModalPriceView,
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
    setShowModalPriceView(false);
  };

  const handleExportExcel = () => {
    console.log("export excel");
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
          message.success("Cập nhật thành công");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPriceDetail = async (selectedId) => {
      console.log("selectedId", selectedId);
      // try {
      //   const rep = await 

    };
    
    
    // fetchCustomerInfo(selectedId);
  }, []);

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
        title="Thông tin bảng giá"
        width={720}
        onClose={onClose}
        open={showModalPriceView}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Row gutter={16} style={{ marginBottom:'5px' }}>
            <Col span={12}>
              <span style={{
                fontSize: "20px",
                fontWeight: "bold",
              }} >Thông tin cơ bản</span>
            </Col>
            <Col span={12}>
              <Button
                style={{ float: "right" }}
                onClick={handleExportExcel}
                icon={<FileExcelOutlined />}
              >
                Xuất excel
              </Button>
            </Col>
          </Row> 
        </Space>
        <Space
          direction="vertical"
          style={{ 
            width: "100%",
            marginBottom:'5px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
          }}
        >
          <p style={{ fontSize: "20px" }}>Bảng giá phim tại rạp A (Hà Nội) - 01/2023</p>
        </Space>
        <Form form={form} onFinish={handleSubmit} id="myForm" layout="vertical">
          <Row gutter={16} style={{ marginBottom:'10px' }} >
            <Col span={12}>
              <span>
                Mã bảng giá:
                <span> 20 </span>
              </span>
            </Col>
            <Col span={12}>
              <span>
                Trạng thái:
                <span> Hoạt động </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <span>
                Ngày bắt đầu:
                <span> 2000-11-11 </span>
              </span>
            </Col>
            <Col span={12}>
            <span>
                Ngày kết thúc:
                <span> 2000-11-11 </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "30px" }} >
            <Col span={12}>
            <span 
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
             > Danh sách giá sản phẩm</span>
            </Col>
            <Col span={12}>
            </Col>
          </Row>
          <Row gutter={16}>
            <TableCustomer />
          </Row>
          <Row gutter={16} style={{ marginTop: "24px" }}>
            <Col span={12}>
              
            </Col>
            <Col span={12}>
              
            </Col>
            <Col span={12}>
              
            </Col>
            <Col span={12}>
              
            </Col>
            <Col span={12}></Col>
          </Row>

          <Row style={{ marginTop: "16px" }} gutter={16}>
            <Col span={24}>
              
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelPriceView;
