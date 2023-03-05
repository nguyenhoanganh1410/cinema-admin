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
const { Title, Text } = Typography;
const dateFormat = "YYYY/MM/DD";
const IndexPromotion = ({ setTab }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Quản lý Khuyễn mãi</a>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Danh sách CT Khuyến mãi</Breadcrumb.Item>
      </Breadcrumb>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={10}>
          <Input
            placeholder="Nhập tên khuyễn mãi..."
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={8}>
          {" "}
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={showModal}
            title="Thêm mới bộ phim"
          >
            Thêm
          </Button>
        </Col>
        <Col span={4}>
          <DatePicker
            defaultValue={moment()}
            format={dateFormat}
            style={{ margin: "0 0.5rem" }}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" title="Xóa lọc">
            Xóa lọc
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
          <TablePromotionHeader setTab={setTab} />
        </Col>
      </Row>
      {showModalAddCustomer ? (
        <ModelAddPromotionHeader
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
        />
      ) : null}
    </div>
  );
};
export default IndexPromotion;
