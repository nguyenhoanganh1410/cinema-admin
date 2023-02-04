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
import TableShows from "./TableShows";
import ModelAddShow from "./ModelAddShow";

const { Title, Text } = Typography;
const IndexShow = ({ setTab }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);
  // //model
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);

  //   //handle code for log out in here

  //   ////////
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  // /////

  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Quản lý phim</a>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Suất chiếu</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={12}>
          <Input placeholder="Nhập tên phim..." prefix={<SearchOutlined />} />
        </Col>
        <Col span={9}>
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

        <Col span={1}>
          <Button type="primary" icon={<DownloadOutlined />}>
            Xuất file
          </Button>
        </Col>
      </Row> */}

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
          <TableShows
            setTab={setTab}
            showModalAddCustomer={showModalAddCustomer}
            setShowModalAddCustomer={setShowModalAddCustomer}
          />
        </Col>
      </Row>
      {showModalAddCustomer ? (
        <ModelAddShow
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
        />
      ) : null}
    </div>
  );
};
export default IndexShow;
