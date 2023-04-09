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
  Tag,
  InputNumber,
} from "antd";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import promotionApi from "../../api/promotionApi";
import rankApi from "../../api/rankApi";
import { CustomTagProps } from "rc-select/lib/BaseSelect";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";

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
  const [ranks, setRanks] = useState([]);
  const [rankPicked, setRankPicked] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

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

  useEffect(() => {
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
    fetchRanks();
  }, []);

  //handle submit form create new customer...
  const handleSubmit = async (val) => {
    console.log(val);
    const data = new FormData();
    data.append("namePromotion", val.namePromotion)
    data.append("desc", val.desc)
    data.append("startDate", startDate)
    data.append("endDate", endDate)
    data.append("promotionCode", val.promotionCode)
    rankPicked.forEach((rank) => {
      data.append("rank", rank)
    })
    // data.append("rank", rankPicked)
    if(val.image){
      data.append("image", val.image[0].originFileObj)
    }
    const rs = await promotionApi.createPromotionHeader(data);
    if (rs) {
      depatch(setReload(!reload));
      message.success("Tạo mới thành công");
      setShowModalAddCustomer(false);
      
    }
  };

  //change position
  const handleChangeRank = (value) => {
    setRankPicked(value);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    setStartDate(dateString);
  };

  //choise date start worling
  const onChangeEndDate = (date, dateString) => {
    setEndDate(dateString);
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
        title="Thêm CT Khuyến mãi"
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
                <Input placeholder="Hãy nhập tên CT khuyến mãi..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="promotionCode"
                label="Mã CT Khuyến mãi"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mã CT khuyến mãi...",
                  },
                ]}
              >
                <InputNumber placeholder="Hãy nhập mã CT khuyến mãi..." 
                  addonBefore="PRO"  
                  min={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Ngày bắt đầu"
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      console.log(endDate);
                      if (!value) {
                        return Promise.reject("Hãy nhập ngày bắt đầu!");
                      }
                      if ( value < new Date()) {
                        return Promise.reject(
                          "Ngày bắt đầu nhỏ hơn ngày kết thúc!"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().endOf(startDate)
                  }
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày bắt đầu"
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
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value) {
                        return Promise.reject("Hãy nhập ngày kết thúc!");
                      }
                      if (value < moment(startDate)) {
                        return Promise.reject(
                          "Ngày kết thúc phải lớn hơn hoặc ngày bắt đầu!"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().endOf(endDate)
                  }
                  onChange={onChangeEndDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày kết thúc"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rankCustomer"
                label="Nhóm khách hàng áp dụng"
              >
                <Select
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
            <Col span={12}>
              <Form.Item
                name="image"
                label="Hình ảnh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Chỉ chấp nhận file ảnh có dạng .jpg, .jpeg, .png"
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
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="desc"
                label="Mô tả"
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddPromotionHeader;
