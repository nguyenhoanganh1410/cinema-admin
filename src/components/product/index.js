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
import TableProduct from "./TableProduct";
import ModelAddProduct from "./ModelAddProduct";

const { Title, Text } = Typography;
const IndexProduct = () => {
  const [showModalAddProduct, setShowModalAddProduct] = useState(false);

  const showModal = () => {
    setShowModalAddProduct(true);
  };

  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Sản phẩm
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

        {/* <Col span={9}>
        </Col> */}

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
          <TableProduct />
        </Col>
      </Row>
      {showModalAddProduct ? (
        <ModelAddProduct
          showModalAddProduct={showModalAddProduct}
          setShowModalAddProduct={setShowModalAddProduct}
        />
      ) : null}
    </div>
  );
};
export default IndexProduct;
