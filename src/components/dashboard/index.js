import React from "react";
import { Col, Row, Typography } from "antd";

// import {
//   InfoCircleOutlined,
//   UserOutlined,
//   LockOutlined,
// } from "@ant-design/icons";
import CardDashboard from "./CardDashboard";
import ColumnChart from "../chart/ColunmChart";
import PieChart from "../chart/PieChart";
import TableTopMovie from "../table/TableTopMovie";

const { Title, Text } = Typography;
const IndexDashboard = () => {
  return (
    <div className="site-card-wrapper">
      <Title level={5}>Dashboard</Title>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={6}>
          <CardDashboard />
        </Col>
        <Col span={6}>
          <CardDashboard />
        </Col>
        <Col span={6}>
          <CardDashboard />
        </Col>
        <Col span={6}>
          <CardDashboard />
        </Col>
      </Row>
      <Row
        style={{ margin: "4rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={11}>
          <ColumnChart />
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <PieChart />
        </Col>
      </Row>

      <Row
        style={{ margin: "4rem 0 2rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={12}>
          <TableTopMovie title={"Top 5 bộ phim có doanh thu cao nhất"} />
        </Col>
        <Col span={12}>
          <TableTopMovie title={"Top 5 khách hàng thân thiết"} />
        </Col>
      </Row>
    </div>
  );
};
export default IndexDashboard;
