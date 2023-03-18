import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import TableCustomer from "./TableCustomer";
import ModelAddCustomer from "./ModelAddCustomer";

const { Title, Text } = Typography;
const IndexCustomer = ({ setTab }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Bảng giá 
      </Title>
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
            placeholder="Nhập tên, số điện thoại hoặc email..."
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={1}>
          {" "}
          <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
            Thêm
          </Button>
        </Col>
        {/* <Col style={{ margin: "0 1rem" }}>
          {" "}
          <Button type="primary" size="large" icon={<ToolOutlined />}>
            Cập nhật
          </Button>
        </Col> */}
        {/* <Col span={1}>
          <Button type="primary" icon={<DownloadOutlined />}>
            Xuất file
          </Button>
        </Col> */}
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
          <TableCustomer setTab={setTab} />
        </Col>
      </Row>
      {showModalAddCustomer ? (
        <ModelAddCustomer
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
        />
      ) : null}
    </div>
  );
};
export default IndexCustomer;
