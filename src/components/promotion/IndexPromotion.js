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
  Form,
  Select,
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
  const [valueStatusPick, setValueStatusPick] = useState(1)
  const [searchText, setSearchText] = useState('')
  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  const handleChange = (value) =>{
    setValueStatusPick(value)
  }
  
  const handleChangeSearch = (e) =>{
    setSearchText(e.target.value)
  }

  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Chương trình khuyến mãi
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
            onChange={(e) => handleChangeSearch(e)}
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
          <Form.Item>
            <Select
              defaultValue={1}
              style={{
                width: 220,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 1,
                  label: "Tất cả",
                },
                {
                  value: 2,
                  label: "Hoạt động",
                },
                {
                  value: 3,
                  label: "Ngưng Hoạt động",
                },
              ]}
            />
          </Form.Item>
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
          <TablePromotionHeader searchText={searchText} setTab={setTab} valueStatusPick={valueStatusPick}/>
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
