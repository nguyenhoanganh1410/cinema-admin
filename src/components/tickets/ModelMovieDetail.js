import React, { useEffect, useState, useRef } from "react";

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
  message,
  Table,
} from "antd";

import { useFormik } from "formik";
import {
  PlusOutlined,
  UploadOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import categoryMovie from "../../api/categoryMovie";
import cinameApi from "../../api/cinemaApi";
import movieApi from "../../api/movieApi";
import moment from "moment";
import orderApi from "../../api/orderApi";
import promotionRsApi from "../../api/promotionRs";
import ReactToPrint from "react-to-print";
import "./index.scss";

const { Option } = Select;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModelDetailMovie = ({
  showModalDetailMovie,
  setShowModalDetailMovie,
  selectedId,
}) => {
  const [listCategory, setListCategory] = useState([]);
  const [listCinema, setListCinema] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  let componentRef = useRef();

  const [nameMovie, setNameMovie] = useState("");
  const [cast, setCast] = useState("");
  const [director, setDirector] = useState("");
  const [linkTrailer, setLinkTrailer] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [desc, setDesc] = useState("");
  const [classify, setClassify] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [movieInfo, setMovieInfo] = useState({});
  const [form] = Form.useForm();

  const [orderDetailSeat, setOrderDetailSeat] = useState([]);
  const [orderDetailProduct, setOrderDetailProduct] = useState([]);
  const [orderDetailPromotion, setOrderDetailPromotion] = useState([]);
  const [order, setOrder] = useState({});

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

  const columnsPromotion = [
    {
      title: "Mã khuyến mãi",
      dataIndex: "promotionCode",
    },
    {
      title: "Mô tả",
      dataIndex: "name",
    },
    {
      title: "Tiền giảm",
      dataIndex: "discount",
      render: (val) => {
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  ];

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalDetailMovie(false);
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangeTime = (value) => {
    setTime(value);
  };
  const handleChangeCategory = (value) => {
    setCategory(value);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    setReleaseDate(dateString);
  };
  const onChangeEndDate = (date, dateString) => {
    setEndDate(dateString);
  };

  const onChangeClassify = (value) => {
    setClassify(value);
  };

  const onChangeStatus = (value) => {
    setStatus(value);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getById(selectedId);
        console.log("order", res);
        if (res) {
          res.createdAt = moment(res.createdAt).format("DD/MM/YYYY HH:mm");
          res.showDate = moment(res.ShowMovie.showDate).format("DD/MM/YYYY");
          const name = res.Customer?.firstName + res.Customer?.lastName;
          // res.totalPrice = res.totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          const totalPrice = res.totalPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          res.totalPrice = totalPrice;
          if (name === "NN") {
            res.customerName = "Khách vãng lai";
          }

          setOrder(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchOrderDetail = async () => {
      const res = await orderApi.getDetail(selectedId);
      console.log("orderDetail", res);
      if (res) {
        let listSeat = [];
        let listProduct = [];
        res.forEach((item) => {
          if (item.type === 1) {
            listSeat.push({
              position:
                item?.CinemaHallSeat?.seatColumn +
                item?.CinemaHallSeat?.seatRow,
              qty: item.qty,
              price: item.price,
              productType: item?.Product?.productName,
            });
          }
          if (item.type === 2) {
            listProduct.push({
              productCode: item?.Product?.productCode,
              name: item?.Product?.productName,
              qtyProduct: item.qtyProduct,
              priceProduct: item.priceProduct,
            });
          }
          return {
            listSeat,
            listProduct,
          };
        });
        setOrderDetailSeat(listSeat);
        setOrderDetailProduct(listProduct);
      }
    };

    const fetchPromotionRs = async () => {
      const res = await promotionRsApi.getByOrderId(selectedId);
      console.log("promotionRs", res);
      if (res) {
        let listPromotion = [];
        res.forEach((item) => {
          listPromotion.push({
            promotionCode: item?.PromotionLine?.promotionCode,
            name: item?.PromotionLine?.desc,
            discount: item.moneyDiscount,
          });
        });
        setOrderDetailPromotion(listPromotion);
      }
    };

    fetchPromotionRs();
    fetchOrder();
    fetchOrderDetail();
  }, []);

  const handleSubmit = async () => {
    //call api create a new movie
    // const data = new FormData();
    // data.append("nameMovie", nameMovie);
    // data.append("cast", cast);
    // data.append("director", director);
    // data.append("linkTrailer", linkTrailer);
    // data.append("idCategoryMovie", category);
    // data.append("duration", time);
    // data.append("releaseDate", releaseDate);
    // data.append("idCinema", 1);
    // data.append("desc", desc);
    // data.append("classify", classify);
    // data.append("endDate", endDate);
    // data.append("status", status);
    // if(image){
    //   data.append("image", image);
    // }

    const data = {
      nameMovie: nameMovie,
      cast: cast,
      director: director,
      linkTrailer: linkTrailer,
      idCategoryMovie: category,
      duration: time,
      releaseDate: releaseDate,
      idCinema: 1,
      desc: desc,
      classify: classify,
      endDate: endDate,
      status: status,
      image: image,
    };
    console.log(data);
    const rs = await movieApi.updateMovie(selectedId, data);
    console.log(rs);
    if (rs) {
      setShowModalDetailMovie(false);
      setTimeout(() => {
        message.success("Cập nhật phim thành công");
      }, 500);
    }
  };
  useEffect(() => {
    //load categories
    const getCategories = async () => {
      try {
        const response = await categoryMovie.getCategory();

        console.log(response);
        //set user info
        if (response) {
          //handle data
          const newArr = response.map((val) => {
            return { value: val.id, label: val.nameCategory };
          });
          setListCategory(newArr);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    //load categories
    const getCinemas = async () => {
      try {
        const response = await cinameApi.getCinemas();

        console.log(response);
        //set user info
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
    getCinemas();
    getCategories();
  }, []);

  const handleExportExcel = () => {
    console.log("export excel");
  };

  console.log("d", orderDetailSeat);

  const PrintTemplate = () => {
    return (
      <>
        <div className="print-template">
          <div
            className="print-template__header"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              HỆ THỐNG RẠP CHIẾU PHIM CINEMA-START
            </span>
            <span
              style={{
                marginTop: "10px",
                fontSize: "20px",
              }}
            >
              123 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí Minh
            </span>
            <span
              style={{
                fontSize: "20px",
              }}
            >
              Điện thoại: 1900.545.436
            </span>
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              HÓA ĐƠN THANH TOÁN
            </span>
          </div>
          <div
            className="print-template__body"
            style={{
              marginTop: "10px",
            }}
          >
            <div
              className="print-template__body__info"
              style={{
                marginRight: "50px",
                marginLeft: "50px",
              }}
            >
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={24}>
                  <span className="info">
                    Phim:
                    <span> {order?.ShowMovie?.Show?.Movie?.nameMovie} </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                  <span className="info">
                    Mã hoán đơn:
                    <span> {order?.id}</span>
                  </span>
                </Col>
                <Col span={12}>
                  <span className="info">
                    Ngày tạo:
                    <span> {order?.createdAt} </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                  <span className="info">
                    Nhân viên:
                    <span>
                      {" "}
                      {order?.Staff?.firstName + order?.Staff?.lastName}{" "}
                    </span>
                  </span>
                </Col>
                <Col span={12}>
                  <span className="info">
                    Khách hàng:
                    <span> {order?.customerName} </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                  <span className="info">
                    Rạp:
                    <span> {order?.ShowMovie?.Show?.Cinema?.name} </span>
                  </span>
                </Col>
                <Col span={12}>
                  <span className="info">
                    Phòng chiếu:
                    <span> {order?.ShowMovie?.Show?.CinemaHall?.name} </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                  <span className="info">
                    Ngày chiếu:
                    <span> {order?.showDate} </span>
                  </span>
                </Col>
                <Col span={12}>
                  <span className="info">
                    Suất chiếu:
                    <span> {order?.ShowMovie?.ShowTime?.showTime} </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: "30px" }}>
                <Col span={12}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Danh sách ghế mua
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <Table
                    columns={columnsSeat}
                    dataSource={orderDetailSeat}
                    size={"middle"}
                    pagination={false}
                    bordered={true}
                  />
                </Col>
              </Row>
              {orderDetailProduct.length > 0 && (
                <>
                  <Row gutter={16} style={{ marginTop: "20px" }}>
                    <Col span={12}>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Danh sách sản phẩm mua
                      </span>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Col span={24}>
                      <Table
                        columns={columnsProduct}
                        dataSource={orderDetailProduct}
                        size={"middle"}
                        pagination={false}
                        bordered={true}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {orderDetailPromotion.length > 0 && (
                <>
                  <Row gutter={16} style={{ marginTop: "20px" }}>
                    <Col span={12}>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Danh sách khuyến mãi
                      </span>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Col span={24}>
                      <Table
                        columns={columnsPromotion}
                        dataSource={orderDetailPromotion}
                        size={"middle"}
                        pagination={false}
                        bordered={true}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <Row gutter={16} style={{ marginTop: "20px" }}>
                <Col span={18}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Tổng tiền
                  </span>
                </Col>
                <Col span={6}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {order?.totalPrice} VNĐ
                  </span>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </>
    );
  };

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
          <PrintTemplate />
        </div>
      );
    }
  }

  return (
    <>
      <Drawer
        title="Thông tin chi tiết hoán đơn"
        width={720}
        onClose={onClose}
        open={showModalDetailMovie}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Thông tin cơ bản
              </span>
            </Col>
            <Col span={6}></Col>
            <Col span={6}>
              <ReactToPrint
                trigger={() => <Button type="primary">Xuất hóa đơn</Button>}
                content={() => componentRef}
              />
            </Col>

            <div style={{ display: "none" }}>
              <ComponentToPrint ref={(el) => (componentRef = el)} />
            </div>
          </Row>
        </Space>
        <Form form={form} id="myForm" layout="vertical">
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Mã hoán đơn:
                <span> {order?.id}</span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Ngày tạo:
                <span> {order?.createdAt} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Nhân viên:
                <span>
                  {" "}
                  {order?.Staff?.firstName + order?.Staff?.lastName}{" "}
                </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Khách hàng:
                <span> {order?.customerName} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Rạp:
                <span> {order?.ShowMovie?.Show?.Cinema?.name} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Phòng chiếu:
                <span> {order?.ShowMovie?.Show?.CinemaHall?.name} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Phim:
                <span> {order?.ShowMovie?.Show?.Movie?.nameMovie} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Suất chiếu:
                <span> {order?.ShowMovie?.ShowTime?.showTime} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Ngày chiếu:
                <span> {order?.showDate} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Tổng tiền:
                <span> {order?.totalPrice} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "10px" }}>
            <Col span={12}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Danh sách ghế mua
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col span={24}>
              <Table
                columns={columnsSeat}
                dataSource={orderDetailSeat}
                size={"small"}
                pagination={false}
              />
            </Col>
          </Row>
          {orderDetailProduct.length > 0 && (
            <>
              <Row gutter={16} style={{ marginTop: "20px" }}>
                <Col span={12}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Danh sách sản phẩm mua
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <Table
                    columns={columnsProduct}
                    dataSource={orderDetailProduct}
                    size={"small"}
                    pagination={false}
                  />
                </Col>
              </Row>
            </>
          )}
          {orderDetailPromotion.length > 0 && (
            <>
              <Row gutter={16} style={{ marginTop: "20px" }}>
                <Col span={12}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Danh sách khuyến mãi
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <Table
                    columns={columnsPromotion}
                    dataSource={orderDetailPromotion}
                    size={"small"}
                    pagination={false}
                  />
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Drawer>
    </>
  );
};
export default ModelDetailMovie;
