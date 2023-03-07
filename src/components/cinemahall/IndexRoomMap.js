import React, { useState } from "react";
import {
  Input,
  Col,
  Row,
  Typography,
  Button,
  Modal,
  Breadcrumb,
  DatePicker,
  Select,
} from "antd";

import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import TablePromotionHeader from "./TablePromotionHeader";
import moment from "moment";
import ModelAddPromotionHeader from "./ModelAddPromotionHeader";
import { MdOutlineChair } from "react-icons/md";

import "./IndexRoomMap.scss";
const { Title, Text } = Typography;
const dateFormat = "YYYY/MM/DD";

const arrColumn = ["B", "C", "D", "E", "F", "G", "H", "I", "K"];

const arrRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const IndexCinemaMap = ({ setTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [possition, setPossition] = useState("");
  const showModal = (val, idx) => {
    setPossition(val + "-" + idx);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Quản lý rạp</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Sơ đồ rạp</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row
        gutter={{
          xs: 8,
          lg: 32,
        }}
        style={{ minHeight: "100vh", background: "", padding: "1rem" }}
      >
        <Col
          span={20}
          style={{
            background: "",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "24px",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "orange",
              borderRadius: "4px",
            }}
          >
            <text style={{ color: "white", fontWeight: "700" }}>Màn Hình</text>
          </div>

          <div className="block-cinema">
            <div className="cinemaHall_left">
              <span>STT</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
              <span>E</span>
              <span>F</span>
              <span>G</span>
              <span>H</span>
              <span>I</span>
              <span>K</span>
            </div>
            <table id="cinema-hall">
              <tr>
                {arrRow.map((val) => {
                  return <td>{val}</td>;
                })}
              </tr>
              <>
                {arrColumn.map((val, idx) => {
                  let number = 1;
                  let agg = 1;
                  return (
                    <>
                      <tr>
                        <td
                          onClick={() => showModal(val, agg)}
                          title={val + number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 1)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 2)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 3)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 4)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 5)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 6)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 7)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                        <td
                          onClick={() => showModal(val, agg + 8)}
                          title={val + ++number}
                        >
                          <span>
                            <MdOutlineChair />
                          </span>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            </table>
          </div>
        </Col>
        <Col span={4} className="block-content-details">
          <Row style={{ marginTop: "16px" }}>
            <Col span={16}>
              <p>Tổng số vị trí:</p>{" "}
            </Col>
            <Col span={8} className="block-span">
              <span>81</span>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <p>Tổng số ghế:</p>{" "}
            </Col>
            <Col span={8} className="block-span">
              <span>70</span>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <p style={{ fontSize: "16px", color: "blue" }}>
                <MdOutlineChair />
              </p>{" "}
            </Col>
            <Col span={14} className="block-span">
              <span>Ghế đơn</span>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <p style={{ fontSize: "16px", color: "red" }}>
                <MdOutlineChair />
              </p>{" "}
            </Col>
            <Col span={14} className="block-span">
              <span>Ghế đôi</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title="Thông tin ghế"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row style={{ marginBottom: "16px" }}>
          <Col span={4}>Vị trí:</Col>
          <Col span={20}>{possition}</Col>
        </Row>
        <Row style={{ marginBottom: "16px" }}>
          <Col span={4}>Trạng thái:</Col>
          <Col span={20}>
            {" "}
            <Select
              placeholder="Trạng thái"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "1",
                  label: "Có ghế",
                },
                {
                  value: "2",
                  label: "Trống",
                },
              ]}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "16px" }}>
          <Col span={4}>Loại ghế:</Col>
          <Col span={20}>
            {" "}
            <Select
              placeholder="Loại ghế"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "1",
                  label: "Ghế đơn",
                },
                {
                  value: "2",
                  label: "Ghế đôi",
                },
              ]}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default IndexCinemaMap;
