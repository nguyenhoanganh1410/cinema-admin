import React, { useState } from "react";
import {
  Input,
  Col,
  Row,
  Typography,
  Button,
  Modal,
  Breadcrumb,
  Card,
  DatePicker,
  Select,
} from "antd";
import "./ShowChart.scss";
import moment from "moment";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import CardTime from "./CardTime";

const { Title, Text } = Typography;
const dateFormat = "YYYY/MM/DD";
const caculatorDay = (dateNumber) => {
  let day = "";
  switch (dateNumber) {
    case 0:
      day = "Chủ nhật";
      break;
    case 1:
      day = "Thứ 2";
      break;
    case 2:
      day = "Thứ 3";
      break;
    case 3:
      day = "Thứ 4";
      break;
    case 4:
      day = "Thứ 5";
      break;
    case 5:
      day = "Thứ 6";
      break;
    case 6:
      day = "Thứ bảy";
  }

  return day;
};
const ShowChart = ({ setTab }) => {
  //back to
  const handleReturn = () => {
    setTab(0);
  };
  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item onClick={() => handleReturn()}>
          {" "}
          <a>Lịch chiếu</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Biểu đồ lịch</Breadcrumb.Item>
      </Breadcrumb>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <Select
            placeholder="Chọn chi nhánh"
            style={{ width:150}}
          >
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>

          <Select
            style={{ margin: "0 0.5rem", width: 300 }}
            placeholder="Chọn phim"
          >
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
        </div>
        <div
          style={{
            justifyContent: "flex-end",
          }}

        >
          <DatePicker
            defaultValue={moment()}
            format={dateFormat}
            style={{ margin: "0 0.5rem" }}
          />
          <Button type="primary" title="Lịch hiện tại">
            Hiện tại
          </Button>
          <Button
            type="primary"
            title="Lịch hiện tại"
            style={{ margin: "0 0.5rem" }}
          >
            Trở về
          </Button>
          <Button type="primary" title="Lịch hiện tại">
            Tiếp
          </Button>
        </div>
      </div>

      <Row
        // style={{ margin: "1rem 0 1rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,   
        }}
      >
        <Col span={24}>
          <table id="customers">
            <tr>
              <th>Ca chiếu</th>
              <th>
                {caculatorDay(moment().day())} <br />
                {moment().format(dateFormat)}
              </th>
              <th>
                {caculatorDay(moment().add(1, "days").day())} <br />
                {moment().add(1, "days").format(dateFormat)}
              </th>
              <th>
                {caculatorDay(moment().add(2, "days").day())} <br />{" "}
                {moment().add(2, "days").format(dateFormat)}
              </th>
              <th>
                {caculatorDay(moment().add(3, "days").day())} <br />{" "}
                {moment().add(3, "days").format(dateFormat)}
              </th>
              <th>
                {caculatorDay(moment().add(4, "days").day())} <br />{" "}
                {moment().add(4, "days").format(dateFormat)}
              </th>
              <th>
                {caculatorDay(moment().add(5, "days").day())} <br />{" "}
                {moment().add(5, "days").format(dateFormat)}
              </th>
              <th>
                {caculatorDay(moment().add(6, "days").day())} <br />{" "}
                {moment().add(6, "days").format(dateFormat)}
              </th>
            </tr>
            <tbody className="style-table">
              <tr className="css-row">
                {" "}
                <td className="time-row">Sáng </td>
                <td>
                  <CardTime />
                  <CardTime />
                </td>
                <td>
                <CardTime />
                </td>
                <td>
                  <CardTime />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="css-row">
                {" "}
                <td className="time-row">Chiều </td>
                <td></td>
                <td>
                  <CardTime />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <CardTime />
                  <CardTime />
                </td>
                <td></td>
              </tr>
              <tr className="css-row">
                {" "}
                <td className="time-row">Tối </td>
                <td></td>
                <td></td>
                <td></td>
                <CardTime />
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};
export default ShowChart;
