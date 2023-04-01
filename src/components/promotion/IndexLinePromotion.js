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
  Badge,
  message
} from "antd";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ModelAddPromoLine from "./ModelAddPromoLine";
import promotionApi from "../../api/promotionApi";
import moment from "moment";
import rankApi from "../../api/rankApi";

import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";

import dayjs from "dayjs";

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

const newDateFormat = "YYYY-MM-DD";
const columns = [
  {
    title: "Mã Code",
    dataIndex: "promotionCode",
    key: "promotionCode",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Miêu tả",
    dataIndex: "desc",
    key: "age",
  },
  {
    title: "Loại khuyến mãi",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "startDate",
    key: "startDate",
    render: (startDate) => {
      return dayjs(startDate).format(newDateFormat);
    },
  },
  {
    title: "Ngày kết thức",
    dataIndex: "endDate",
    key: "endDate",
    render: (endDate) => {
      return dayjs(endDate).format(newDateFormat);
    },
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      let color;
      let text;
      if (status === 1) {
        color = "green";
        text = "Hoạt động";
      } else {
        color = "red";
        text = "Ngưng hoạt động";
      }
      return <Badge status={color} text={text} />;
    },
  },
];

const IndexLinePromotion = ({ setTab }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [ranks, setRanks] = useState([]);
  const [rankPicked, setRankPicked] = useState([]);

  const [listPromotionLine, setPromotionLine] = useState([]);
  const [promotionHeader, setPromotionHeader] = useState(null);
  const idHeaderPromotion = useSelector((state) => state.promotionHeaderId);

  const [changeImage, setChangeImage] = useState(false);

  const [startDateDb, setStartDateDb] = useState("");
  const [endDateDb, setEndDateDb] = useState("");
  const [statusDb, setStatusDb] = useState(0);

  const [form] = Form.useForm();

  const newDateFormat = "YYYY-MM-DD";
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const currentDate = moment().format(newDateFormat);

  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

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

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    let color;
    if (label === "START") {
      color = "green";
    } else if (label === "GOLD") {
      color = "gold";
    } else if (label === "DIAMOND") {
      color = "blue";
    } else if (label === "ANONYMOUS") {
      color = "geekblue";
    }
    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const handleChangeRank = (value) => {
    setRankPicked(value);
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
    console.log(rankPicked);
    const data = new FormData();
    data.append("namePromotion", val.namePromotion)
    data.append("desc", val.desc)
    data.append("startDate", startDate)
    data.append("endDate", endDate)
    data.append("statusPromotion", val.statusPromotion)
    rankCustomer.forEach((rank) => {
      data.append("rank", rank.value)
    })
    // data.append("rank", rankPicked)
    if(val.image){
      data.append("image", val.image[0].originFileObj)
    }

    try {
      const response = await promotionApi.updatePromotionHeader(data, idHeaderPromotion);
      if (response) {
        depatch(setReload(!reload));
        message.success("Cập nhật thành công");
        setTab(0);
      }
    } catch (error) {
      console.log("Failed to login ", error);
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
            return item;
          });
          setPromotionLine(newList);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    const fetchRanks = async () => {
      const rs = await rankApi.getRanks();
      console.log(rs);
      if (rs) {
        const options = rs.map((rank) => {
          return {
            label: rank.nameRank,
            value: Number(rank.id),
          };
        });
        setRanks(options);
      }
    };

    //load movies
    const getPromotionHeaderById = async (id) => {
      try {
        const response = await promotionApi.getPromotionHeaderById(id);
        if (response) {
          const ranksRes = response.ranks.map((rank) => {
            return {
              label: rank.rank.nameRank,
              value: Number(rank.rank.id),
            };
          });
          setRankPicked(ranksRes);
          setStartDateDb(response.startDate);
          setEndDateDb(response.endDate);
          setStatusDb(response.statusPromotion);
          setStartDate(response.startDate);
          setEndDate(response.endDate);
          form.setFieldsValue({
            id: response.id,
            namePromotion: response.namePromotion,
            desc: response.desc,
            startDate: dayjs(response.startDate, newDateFormat),
            endDate: dayjs(response.endDate, newDateFormat),
            statusPromotion: response.statusPromotion ? "1" : "0",
            image: [
              {
                uid: "-1",
                name: response.image,
                status: "done",
                url: response?.image,
              },
            ],
            rankCustomer: ranksRes,
          });
          setPromotionHeader(response);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    fetchRanks();
    getPromotionLineByHeader(idHeaderPromotion);
    getPromotionHeaderById(idHeaderPromotion);
  }, [reload]);

  const handleRouter = (value) => {
    setTab(0);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="site-card-wrapper" style={{ minWidth: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
          <Breadcrumb.Item>
            <a onClick={handleRouter}>Chương trình khuyến mãi</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
        </Breadcrumb>

        <Button
          type="primary"
          form="myFormPro"
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
      <Form
        id="myFormPro"
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
            <Form.Item name="id" label="Mã CT Khuyến mãi">
              <Input disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="namePromotion"
              label="Tên CT Khuyến mãi"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên CT khuyến mãi...",
                },
              ]}
            >
              <Input disabled={statusDb === true ? true : false} placeholder="Hãy nhập tên CT khuyến mãi..." />
            </Form.Item>
          </Col>
          <Col span={6}>
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
              disabledDate={(current) =>
                current && current < moment().endOf(startDate)
              }
              disabled={ currentDate > startDate || statusDb === true ? true : false}
                onChange={onChangeDate}
                style={{ width: "100%" }}
                placeholder="Chọn ngày bắt đầu"
                defaultValue={dayjs(startDate, newDateFormat)}
                format={newDateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
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
              disabledDate={(current) =>{
                if(currentDate > startDateDb){
                  return current && current < moment(currentDate)
                }else{
                  return current && current < moment().endOf(startDate)
                }
              }                
              }
              disabled={ statusDb === true ? true : false}
                onChange={onChangeDate}
                style={{ width: "100%" }}
                placeholder="Chọn ngày kết thúc"
                defaultValue={dayjs(endDate, newDateFormat)}
                format={newDateFormat}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="image"
              label="Hình ảnh"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Chỉ chấp nhận file ảnh có dạng .jpg, .jpeg, .png"
              type="file"
            >
              <Upload
                disabled={statusDb === true ? true : false}
                style={{ fontSize: "0.2rem" }}
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
          <Col span={6}>
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

          <Col span={12}>
            <Form.Item
              name="rankCustomer"
              label="Nhóm khách hàng áp dụng"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn trạng thái...",
                },
              ]}
            >
              <Select
              disabled={ currentDate > startDate || statusDb === true ? true : false}
                placeholder="Chọn trạng thái"
                style={{
                  width: "100%",
                }}
                mode="multiple"
                showArrow
                tagRender={tagRender}
                onChange={handleChangeRank}
                options={ranks}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="desc"
              label="Mô tả CTKM"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập chi tiết CTKH...",
                },
              ]}
            >
              <TextArea
              disabled={statusDb === true ? true : false}
                rows={4}
                placeholder="Nhập chi tiết CTKM"
                // maxLength={6}
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
            justifyContent: "space-between",
          }}
        >
          <Space>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Dòng khuyến mãi
            </span>
          </Space>
          {currentDate < startDate && statusDb === false ? (
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
          ) : null}
          
        </div>
        <Table columns={columns} dataSource={listPromotionLine} />
      </div>
      {showModalAddCustomer ? (
        <ModelAddPromoLine
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
          startDateDb={startDateDb}
          endDateDb={endDateDb}
          idHeaderPromotion={idHeaderPromotion}
        />
      ) : null}
    </div>
  );
};
export default IndexLinePromotion;
