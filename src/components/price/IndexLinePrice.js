import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  Typography,
  Tag,
  Table,
  Breadcrumb,
} from "antd";

import { PlusOutlined,MinusCircleOutlined } from "@ant-design/icons";
import ModelAddPromoLine from "./ModelAddPromoLine";
import { useSelector } from "react-redux";
import priceApi from "../../api/priceApi";
import moment from "moment";
import cinemaApi from "../../api/cinemaApi";

const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const { Option } = Select;

const { Title, Text } = Typography;
const dateFormat = "YYYY/MM/DD";
const newDateFormat = "YYYY-MM-DD";
const columns = [
  {
    title: "Mã Sản phẩm",
    dataIndex: "productCode",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên Sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Giá bán",
    dataIndex: "price",
  },
  {
    render: (text, record) => (
      <Button 

      icon={<MinusCircleOutlined color="#ff4d4f" />}
      >
      </Button>
    ),
  },
];

const IndexLinePrice = ({ setTab,selectedIdHeader }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

  const [form] = Form.useForm();
  const [status, setStatus] = useState(0);
  const [applyTo, setApplyTo] = useState(0);
  const [listCinema,setListCinema] = useState([]);
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [applyToHall,setApplyToHall] = useState([]);
  const [listPriceLine,setListPriceLine] = useState([]);

  // const handleCancel = () => setPreviewOpen(false);
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };
  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   setChangeImage(true);
  // };

  const onChangeStatus = (value) => {
    setStatus(value);
  };

  const onChangeApplyTo = (value) => {
    setApplyTo(value);
  };

  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString);
  };

  const onChangeEndDate = (date, dateString) => {
    setEndDate(dateString);
  };

  const onChangeApplyToHall = (value) => {
    setApplyToHall(value);
  };

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

  const handleRouter = (value) => {
    setTab(0);
  };

  const handleOpenModel = () => {
    setShowModalAddCustomer(true);
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleSubmit = async (val) => {
    console.log(val);
  };


  

  

  // price detail
  useEffect(() => {
    const getPriceLine = async () => {
      console.log(selectedIdHeader);
      try {
        const line = await priceApi.getPriceLineByHeader(selectedIdHeader)
        if (line) {
          console.log(line);
          const data = line.map((item) => {
            return{
              productCode: item.Product.productCode,
              name: item.Product.productName,
              price: item.price,
            }
          });
          setListPriceLine(data)
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    const getPriceHeaderDetail = async () => {
      try {
        const response = await priceApi.getPriceHeaderById(selectedIdHeader)
        if (response) {
          console.log(response);
          setApplyTo(response.applyTo);
          setStatus(response.status);
          setStartDate(response.startDate);
          setEndDate(response.endDate);
          setApplyToHall(response.applyToHall);
          form.setFieldsValue({
            codePrice: response.id,
            namePrice: response.name,
            startDate: moment(response.startDate),
            endDate: moment(response.endDate),
            status: response.status,
            applyTo: response.applyTo,
            applyToHall: response.applyToHall,
          });
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    const getCinema = async () => {
      try {
        const response = await cinemaApi.getCinemas();
        if (response) {
          const newArr = response.map((val) => {
            return { value: val.id, label: val.name };
          });
          setListCinema(newArr);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    getCinema();
    getPriceHeaderDetail();
    getPriceLine();

  },[selectedIdHeader]);

  return (
    <div className="site-card-wrapper" style={{ minWidth: "100vh" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            <Breadcrumb.Item>
              <a onClick={handleRouter}>Bảng giá</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
          </Breadcrumb>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
              marginRight: "1rem",
            }}
          >
            Cập nhật
          </Button>
        </div>
      </div>

      <Form
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="id" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item name="codePrice" label="Mã bảng giá">
              <Input
                disabled={true}
                placeholder="Hãy nhập tên CT khuyến mãi..."
              />
            </Form.Item>
          </Col>
          <Col span={12}></Col>

          <Col span={12}>
            <Form.Item
              name="namePrice"
              label="Tên bảng giá"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập chi tiết CTKH...",
                },
              ]}
            >
              <Input placeholder="Hãy nhập tên bảng giá..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày bắt đầu"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn ngày bắt đầu...",
                },
              ]}
            >
              <DatePicker
                disabled={true}
                onChange={onChangeStartDate}
                style={{ width: "100%" }}
                placeholder="Chọn ngày bắt đầu"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item
              name="status"
              label="Trạng thái"
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
                onChange={onChangeStatus}
                options={[
                  {
                    value: false,
                    label: "Ngưng hoạt động",
                  },
                  {
                    value: true,
                    label: "Hoạt động",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="applyTo"
              label="Chi nhánh áp dụng"
              rules={[
                {
                  required: true,
                  message: "Áp dụng cho...",
                },
              ]}
            >
              <Select
                placeholder="Chi nhánh áp dụng"
                style={{
                  width: "100%",
                }}
                onChange={onChangeApplyTo}
                options={listCinema}

              />
            </Form.Item>
          </Col>
          <Col span={4}>
          <Form.Item
              name="applyToHall"
              label="Loại phòng áp dụng"
              
            >
              <Select
                placeholder="Loại phòng áp dụng"
                style={{
                  width: "100%",
                }}
                onChange={onChangeApplyToHall}
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
          <Col span={12}>
            <Form.Item
              name="endDate"
              label="Ngày kết thúc"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn ngày kết thúc...",
                },
              ]}
            >
              <DatePicker
                onChange={onChangeEndDate}
                style={{ width: "100%" }}
                placeholder="Chọn ngày kết thúc"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* table */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            onClick={() => handleOpenModel()}
            style={{
              marginRight: "1rem",
              marginBottom: "1rem",
              width: "100px",
            }}
          >
            Thêm
          </Button>
        </div>
        <Table columns={columns} dataSource={listPriceLine} />;
      </div>
      {showModalAddCustomer ? (
        <ModelAddPromoLine
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
        />
      ) : null}
    </div>
  );
};
export default IndexLinePrice;
