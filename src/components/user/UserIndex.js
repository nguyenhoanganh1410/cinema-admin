import React, { useState } from "react";
import { Input, Col, Row, Typography, Avatar, Breadcrumb } from "antd";

import { AntDesignOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const UserInfo = () => {
  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin tài khoản</Breadcrumb.Item>
      </Breadcrumb>

      <Row
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px 24px",
        }}
      >
        <Col span={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              style={{ marginBottom: "24px" }}
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              icon={<AntDesignOutlined />}
            />
            <div
              style={{
                textAlign: "start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text>
                MNV:{" "}
                <span style={{ fontWeight: "700", color: "#333" }}>
                  {" "}
                  19444531
                </span>
              </Text>
              <Text>
                Họ tên:{" "}
                <span style={{ fontWeight: "700", color: "#333" }}>
                  {" "}
                  Nguyễn Hoàng Anh
                </span>
              </Text>
            </div>
          </div>
        </Col>
        <Col style={{ backgroundColor: "red" }} span={2}></Col>
        <Col style={{ backgroundColor: "blue" }} span={16}></Col>
      </Row>
    </div>
  );
};
export default UserInfo;
