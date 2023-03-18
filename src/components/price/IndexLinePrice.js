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

import { PlusOutlined,
  MinusCircleOutlined,
 } from "@ant-design/icons";
import ModelAddPromoLine from "./ModelAddPromoLine";
import { useSelector } from "react-redux";
import promotionApi from "../../api/promotionApi";
import moment from "moment";

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
    dataIndex: "priceCode",
    key: "priceCode",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên Sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phòng chiếu",
    dataIndex: "typeHall",
  },
  {
    title: "Giá bán",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    render: (text, record) => (
      <Button 
      icon={<MinusCircleOutlined />}
      >
      </Button>
    ),
  },
];

const IndexLinePrice = ({ setTab }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [listPromotionLine, setPromotionLine] = useState([]);
  const [promotionHeader, setPromotionHeader] = useState(null);
  const idHeaderPromotion = useSelector((state) => state.promotionHeaderId);

  const [changeImage, setChangeImage] = useState(false);

  const [form] = Form.useForm();

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
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setChangeImage(true);
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
    const { startDate, endDate, desc, statusPromotion, id, namePromotion } =
      val;
    // if (endDate.diff(startDate, "days") > 0) {
    //   alert("Ngày không hợp lý");
    //   return;
    // }

    //2 trường hợp
    //TH1: image thay đổi
    if (changeImage) {
    } else {
      //TH2: image không đổi
      try {
        const newData = {
          namePromotion,
          statusPromotion,
          // endDate: moment(val.endDate, newDateFormat),
          // startDate: moment(val.startDate, newDateFormat),
          id,
          desc,
        };
        console.log(newData);
        const response = await promotionApi.updatePromotionHeader(newData);
        alert("updated promotion header");
      } catch (error) {
        console.log("update failed : ", error);
      }
    }
  };
  useEffect(() => {
    //load movies
    const getPromotionLineByHeader = async (id) => {
      try {
        const response = await promotionApi.getPromotionLineByHeader(id);

        if (response) {
          //handle data
          const newList = response.map((item) => {
            item.startDate = item.startDate.substring(0, 10);
            item.endDate = item.endDate.substring(0, 10);

            return item;
          });
          setPromotionLine(newList);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    //load movies
    const getPromotionHeaderById = async (id) => {
      try {
        const response = await promotionApi.getPromotionHeaderById(id);
        console.log(response);
        if (response) {
          //handle data
          const crrImg = [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: response.image,
            },
          ];
          setFileList(crrImg);
          form.setFieldsValue({
            id: response.id,
            namePromotion: response.namePromotion,
            desc: response.desc,
            startDate: moment(response.startDate, dateFormat),
            endDate: moment(response.endDate, dateFormat),
            statusPromotion: response.statusPromotion ? "1" : "0",
          });
          setPromotionHeader(response);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    getPromotionLineByHeader(idHeaderPromotion);
    getPromotionHeaderById(idHeaderPromotion);
  }, [idHeaderPromotion]);

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
                onChange={onChangeDate}
                style={{ width: "100%" }}
                placeholder="Chọn ngày bắt đầu"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item
              name="statusPromotion"
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
                onChange={handleChangePosition}
                options={[
                  {
                    value: "0",
                    label: "Ngưng hoạt động",
                  },
                  {
                    value: "1",
                    label: "Hoạt động",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
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
                onChange={onChangeDate}
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
        <Table columns={columns} dataSource={listPromotionLine} />;
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
