import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal, Breadcrumb } from "antd";

import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import TableCustomer from "../customer/TableCustomer";
import ModelAddCustomer from "../customer/ModelAddCustomer";
import TableFilms from "./TableFilms";
import ModelAddFilm from "./ModelAddFilm";

const { Title, Text } = Typography;
const IndexTicketRefund = () => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>

        <Breadcrumb.Item>Hóa đơn trả</Breadcrumb.Item>
      </Breadcrumb>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={12}>
          <Input
            placeholder="Nhập mã hóa đơn / vé..."
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={9}>
        
        </Col>
        <Col span={1}>
          <Button type="primary" icon={<DownloadOutlined />}>
            Xuất file
          </Button>
        </Col>
      </Row>

      <Row
        style={{ margin: "1rem 0 1rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={24}>
          <TableFilms />
        </Col>
      </Row>
      {showModalAddCustomer ? (
        <ModelAddFilm
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
        />
      ) : null}
    </div>
  );
};
export default IndexTicketRefund;
