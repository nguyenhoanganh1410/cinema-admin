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
import moment from "moment";
import ModelAddCinema from "./ModelAddCinema";
import TableCinema from "./TableCinema";
const { Title, Text } = Typography;
const dateFormat = "YYYY/MM/DD";
const IndexCinema = ({ setTab, setSelectedIdCinema, setStatusDb }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);
  const [keyword, setKeyword] = useState("");


  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  const handleRouter = (value) => {
    setTab(value);
  };

  return (
    <div className="site-card-wrapper">
      
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Rạp
      </Title>
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
            placeholder="Nhập tên rạp hoặc mã rạp"
            prefix={<SearchOutlined />}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                setKeyword(e.target.value);
              }
            }}
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
          <TableCinema keyword={keyword} setTab={setTab} setSelectedIdCinema={setSelectedIdCinema} setStatusDb={setStatusDb} />
        </Col>
      </Row>
      {showModalAddCustomer ? (
        <ModelAddCinema
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
        />
      ) : null}
    </div>
  );
};
export default IndexCinema;