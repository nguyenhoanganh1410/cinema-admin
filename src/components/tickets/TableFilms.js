import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Image,
  message,
  Badge,
  Tag,
  Space,
  Form,
  Row,
  Col,
  Input,
} from "antd";
import {
  ReloadOutlined,
  RetweetOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";

import ModelDetailMovie from "./ModelMovieDetail";
import orderApi from "../../api/orderApi";
import moment from "moment";

const TableFilms = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listMovie, setListMovie] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModalDetailMovie, setShowModalDetailMovie] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [order, setOrder] = useState({});
  const [detailSeats, setDetailSeats] = useState([]);
  const [detailProducts, setDetailProducts] = useState([]);
  const [form] = Form.useForm();

  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

  const currentDay = moment().format("YYYY-MM-DD");
  const currentTimes = moment().format("HH:mm");

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      width: "15%",
      render: (val) => {
        if (val === "N N") {
          return "Khách vãng lai";
        } else {
          return val;
        }
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "staff",
      width: "15%",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (val) => {
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (active) => {
        let color = "";
        if (active === 1) {
          color = "green";
        }
        if (active === 3) {
          color = "volcano";
        }
        return (
          <Tag color={color} key={active}>
            {active === 1 ? "HOÀN THÀNH" : "TRẢ HÀNG"}
          </Tag>
        );
      },
    },
    {
      dataIndex: "action",
      render: (text, record) => (
        console.log("rs", record),
        (
          <div>
            <Space>
              <Button
                title="Đổi trả hóa đơn"
                icon={<RetweetOutlined />}
                disabled={
                  record.status === 3
                    ? true
                    : false ||
                      currentDay > moment(record.showDate).format("YYYY-MM-DD")
                    ? true
                    : false ||
                      (currentDay ===
                        moment(record.showDate).format("YYYY-MM-DD") &&
                        currentTimes > moment(record.showTime).format("HH:mm"))
                    ? true
                    : false
                }
                onClick={() => showModal(record.id)}
              ></Button>
            </Space>
            <Space style={{ marginLeft: "10px" }}>
              <Button
                title="Xem chi tiết"
                icon={<EyeOutlined />}
                onClick={() => {
                  showModalDetail(record.id);
                }}
              ></Button>
            </Space>
          </div>
        )
      ),
    },
  ];

  const columnsSeat = [
    {
      title: "Vị trí",
      dataIndex: "position",
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (val) => {
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    {
      title: "Loại ghế",
      dataIndex: "productType",
    },
  ];

  const columnsProduct = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "qtyProduct",
    },
    {
      title: "Giá",
      dataIndex: "priceProduct",
      render: (val) => {
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  ];

  const showModalDetail = (e) => {
    setShowModalDetailMovie(true);
    setSelectedId(e);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = async (id) => {
    const order = await orderApi.getById(id);
    order.totalPrice = `${order.totalPrice}`.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    const res = await orderApi.getDetail(id);
    if (res) {
      let seats = [];
      let products = [];
      res.forEach((item) => {
        if (item.type === 1) {
          seats.push({
            position:
              item?.CinemaHallSeat?.seatColumn + item?.CinemaHallSeat?.seatRow,
            qty: item.qty,
            price: item.price,
            productType: item?.Product?.productName,
          });
        } else {
          products.push({
            productCode: item?.Product?.productCode,
            name: item?.Product?.productName,
            qtyProduct: item.qtyProduct,
            priceProduct: item.priceProduct,
          });
        }
      });
      setDetailSeats(seats);
      setDetailProducts(products);
    }
    setOrder(order);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const rs = form.getFieldValue("note");
    form.resetFields();
    console.log(rs);
    try {
      const res = await orderApi.refund(order?.id, rs);
      if (res) {
        message.success("Đổi trả thành công");
        depatch(setReload(!reload));
      }
    } catch (error) {
      console.log(error);
    }

    //handle code for log out in here
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  /////

  const handleRefresh = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      // setSelectedRowKeys([]);
      setLoading(false);
      setRefresh(!refresh);
      message.success("Tải lại thành công");
    }, 1000);
  };

  useEffect(() => {
    //load movies
    const gettListOrder = async () => {
      try {
        const response = await orderApi.getAll();
        console.log(response);
        //set user info
        if (response) {
          const newList = response.map((item) => {
            return {
              id: item.id,
              customer: item.Customer.firstName + " " + item.Customer.lastName,
              staff: item.Staff.firstName + " " + item.Staff.lastName,
              showTime: item.ShowMovie.ShowTime.showTime,
              showDate: item.ShowMovie.showDate,
              createdAt: moment(item.createdAt).format("DD/MM/YYYY HH:mm"),
              totalPrice: item.totalPrice,
              status: item.status,
            };
          });

          setListMovie(newList);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    gettListOrder();
  }, [reload]);

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={handleRefresh}
          loading={loading}
          icon={<ReloadOutlined />}
        >
          Làm mới
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""} */}
        </span>
      </div>
      <Table columns={columns} dataSource={listMovie} />
      <Modal
        title="Tạo đơn trả hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Form.Item name="note" label="Lý do trả hàng:">
                <Input placeholder="Hãy nhập lý do trả hàng..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="name" label="Thông tin ghế:">
                <Table
                  columns={columnsSeat}
                  size={"small"}
                  dataSource={detailSeats}
                />
              </Form.Item>
            </Col>
          </Row>
          {detailProducts.length > 0 && (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="name" label="Thông tin sản phẩm:">
                    <Table
                      columns={columnsProduct}
                      size={"small"}
                      dataSource={detailProducts}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Row gutter={16} style={{ marginTop: "5px", marginBottom: "20px" }}>
            <Col span={19}></Col>
            <Col span={5}>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Số tiền hoàn trả:
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {" "}
                  {order?.totalPrice}{" "}
                </span>
              </span>
            </Col>
          </Row>
        </Form>
      </Modal>

      {showModalDetailMovie ? (
        <ModelDetailMovie
          showModalDetailMovie={showModalDetailMovie}
          setShowModalDetailMovie={setShowModalDetailMovie}
          selectedId={selectedId}
        />
      ) : null}
    </div>
  );
};
export default TableFilms;
