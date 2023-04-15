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
import CardTime from "./CardTime";
import { caculatorDay } from "../../utils/DataCaculator";
import useShowChartHook from "./useShowChartHook";

const { Title, Text } = Typography;
const dateFormat = "YYYY/MM/DD";

const ShowChart = ({ setTab }) => {
  const { cinema, selectCinemaOptions, dataFilm, handleReturn } =
    useShowChartHook({
      setTab,
    });

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item onClick={() => handleReturn()}>
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
            defaultValue={cinema?.name}
            style={{
              width: 200,
            }}
            disabled
            options={selectCinemaOptions}
          />
          <Select
            style={{ margin: "0 0.5rem", width: 300 }}
            placeholder="Chọn phim"
            options={dataFilm}
          ></Select>
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
                <td className="time-row">Sáng </td>
                <td>
                  <CardTime />
                  <CardTime />
                  <CardTime />
                  <CardTime />
                </td>
                <td></td>
                <td>
                  <CardTime />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="css-row">
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
