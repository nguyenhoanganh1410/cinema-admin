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
const IndexCinemaHall = ({ setTab }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Quản lý rạp</a>
        </Breadcrumb.Item>

      
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
            placeholder="Nhập tên rạp..."
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={8}>
          {" "}
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={showModal}
            title="Thêm mới rạp"
          >
            Thêm
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
export default IndexCinemaHall;
