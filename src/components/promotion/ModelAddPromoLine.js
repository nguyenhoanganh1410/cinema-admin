import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
  Upload,
  message,
} from "antd";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ProductPromotion from "./ProductPromotion";
import MoneyPromotion from "./MoneyPromotion";
import PercentPromotion from "./PercentPromotion";
import promotionApi from "../../api/promotionApi";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";

import dayjs from "dayjs";
import productApi from "../../api/productApi";

const { Option } = Select;

const newDateFormat = 'YYYY-MM-DD'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModelAddPromoLine = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
  startDateDb,
  endDateDb,
  idHeaderPromotion
}) => {
  const [form] = Form.useForm();

  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

  const [type, setType] = useState(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [listProductSeat, setListProductSeat] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  const [idPromotionLine, setIdPromotionLine] = useState(0);

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalAddCustomer(false);
  };

  //handle submit form create new customer...
  const handleSubmit = (val) => {
    console.log("val", val);

    const payloadLine = {
      promotionCode: val.promotionCode,
      desc: val.desc,
      type: val.type,
      startDate: startDate,
      endDate: endDate,
      max_qty: val.maxUse,
      max_qty_per_customer_per_day: val.maxUsePerCustomer,
      budget: val.budget,
      promotionHeaderId: idHeaderPromotion,
    }

    const payloadDetail = {
      IdProduct_buy: val.productBuy,
      qty_buy: val.qtyBuy,
      money_received: val.moneyReceived,
      IdProduct_receive: val.productReceive,
      qty_receive: val.qtyReceive,
      total_purchase_amount: val.moneyBought,
      percent_reduction: val.percent,
    };

    try {
      const createLine = async () => {
        const response = await promotionApi.createPromotionLine(payloadLine);
        setIdPromotionLine(response.id);
        console.log("response", response);
        if (response) {
          const createDetail = async () => {
            console.log("idPromotionLine", idPromotionLine);
            payloadDetail.idPromotionLine = response.id ;
            console.log("payloadDetail", payloadDetail);
            const res = await promotionApi.createPromotionDetail(payloadDetail);
            console.log("res", res);
            if (res) {
              message.success("Thêm thành công");
              depatch(setReload(!reload));
              onClose();
            }
          };
          createDetail();
        }
      };

      createLine();
    }
    catch (error) {
      console.log("error", error);
    }
  };

  //change position
  const handleChangeTypePro = (value) => {
    setType(value);
  };

  //choise date start worling
  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString);
  };

  //choise date end worling
  const onChangeEndDate = (date, dateString) => {
    setEndDate(dateString);
  };

  useEffect(() => {
    const fetchProductSeats = async () => {
      try {
        const response = await productApi.getListProductByType("Ghe");
        console.log("response", response);
        const options = response.map((item) => ({
          value: item.id,
          label: item.productName,
        }));
        setListProductSeat(options);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchAllProduct = async () => {
      try {
        const response = await productApi.getProducts();
        console.log("response", response);
        const options = response.map((item) => ({
          value: item.id,
          label: item.productName,
        }));
        setListProduct(options);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAllProduct();
    fetchProductSeats();
  }, []);

  console.log("startDate", startDate);
  return (
    <>
      <Drawer
        title="Thêm dòng khuyễn mãi"
        width={720}
        onClose={onClose}
        open={showModalAddCustomer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button form="myFormAddLinePro" htmlType="submit" type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          onFinish={handleSubmit}
          id="myFormAddLinePro"
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="promotionCode"
                label="Mã áp dụng"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mã áp dụng...",
                  },
                ]}
              >
                <Input
                  style={{ textTransform: "uppercase" }}
                  placeholder="Hãy nhập mã áp dụng..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="desc"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mô tả...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập mô tả..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Chọn loại khuyến mãi "
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn loại khuyến mãi...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn loại KM"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangeTypePro}
                  options={[
                    {
                      value: 1,
                      label: "Khuyến mãi giảm tiền",
                    },
                    {
                      value: 2,
                      label: "Khuyễn mãi tặng sản phẩm",
                    },
                    {
                      value: 3,
                      label: "Khuyễn mãi chiết khấu %",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="budget"
                label="Ngân sách"
                rules={[
                  {
                    required: true,
                    message: "Nhập số tiền ngân sách...",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\VNĐ\s?|(,*)/g, "")}
                  // onChange={onChange}
                  placeholder="Nhập số tiền ngân sách.."
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="maxUse" label="Số lượng KH áp dụng tối đa">
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={100}
                  // defaultValue={1}
                  placeholder="Nhập số lương KH áp dụng tối đa..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxUsePerCustomer"
                label="Số lượng tối đa cho 1 KH trên 1 ngày"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={10}
                  // defaultValue={1}
                  placeholder="Nhập số lần KH được sử dụng KM/ngày..."
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
                    message: "Hãy chọn ngày bắt đầu...",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment(startDateDb).subtract(1, "days") || current > moment(endDateDb)
                  }
                  onChange={onChangeStartDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày bắt đầu"
                  defaultValue={dayjs(startDateDb, newDateFormat)}
                  format={newDateFormat}
                />
              </Form.Item>
            </Col>
            <Col span={12} style={{}}>
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
                disabledDate={(current) =>
                  current && current < moment(startDate) || current > moment(endDateDb)
                }
                  onChange={onChangeEndDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày kết thúc"
                  defaultValue={dayjs(endDateDb, newDateFormat)}
                  format={newDateFormat}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space
            direction="vertical"
            style={{
              width: "100%",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Chi tiết loại khuyến mãi
            </span>
          </Space>
          {type === 1 ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="productBuy"
                    label="Chọn sản phẩm mua "
                    rules={[
                      {
                        required: true,
                        message: "Hãy chọn sản phẩm mua...",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn sản phẩm mua"
                      style={{
                        width: "100%",
                      }}
                      // onChange={handleChangePosition}
                      options={listProductSeat}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="qtyBuy"
                    label="Số lượng mua"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Nhập số lượng mua...",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={1}
                      max={10}
                      defaultValue={1}
                      placeholder="Nhập số lượng mua.."
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="moneyReceived"
                    label="Số tiền KM"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số  tiền KM...",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VNĐ\s?|(,*)/g, "")}
                      // onChange={onChange}
                      placeholder="Nhập số tiền KM.."
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : type === 2 ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="productBuy"
                    label="Chọn sản phẩm mua "
                    rules={[
                      {
                        required: true,
                        message: "Hãy chọn sản phẩm mua...",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn sản phẩm mua"
                      style={{
                        width: "100%",
                      }}
                      // onChange={handleChangePosition}
                      options={listProductSeat}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="productReceive"
                    label="Chọn sản phẩm nhận"
                    rules={[
                      {
                        required: true,
                        message: "Hãy chọn sản phẩm nhận...",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn sản phẩm nhận"
                      style={{
                        width: "100%",
                      }}
                      // onChange={handleChangePosition}
                      options={listProduct}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="qtyBuy"
                    label="Số lượng mua"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số lượng mua...",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      max={10}
                      style={{ width: "100%" }}
                      defaultValue={1}
                      placeholder="Nhập số lượng mua.."
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="qtyReceive"
                    label="Số lượng nhận"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số  lượng nhận...",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{ width: "100%" }}
                      max={10}
                      defaultValue={1}
                      placeholder="Nhập số lượng nhận.."
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : type === 3 ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="moneyBought"
                    label="Số tiền Mua"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số  tiền Mua...",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VNĐ\s?|(,*)/g, "")}
                      // onChange={onChange}
                      placeholder="Nhập số tiền Mua.."
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="percent"
                    label="Phần trăm giảm"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số phần trăm giảm...",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{ width: "100%" }}
                      max={100}
                      placeholder="Nhập số phần trăm giảm.."
                      formatter={(value) => `% ${value}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : null}
        </Form>

        {/* <RenderType /> */}
      </Drawer>
    </>
  );
};
export default ModelAddPromoLine;
