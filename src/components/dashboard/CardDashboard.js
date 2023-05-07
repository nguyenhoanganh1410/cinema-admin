import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Row,
  Typography,
  Tooltip,
  Space,
  Card,
} from "antd";
import "./DashBoardStyle.scss";
import { LineChartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const CardDashboard_Revenue = ({ total, ratio, rs }) => {
  return (
    <Card>
      <Text className="card_title">Doanh thu</Text>
      <div className="card_content">
        <Text className="card_content_text">
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <div className="card_content-div">
          <LineChartOutlined />
          <span>{ratio}%</span>
        </div>
      </div>
      <Text className="card_extra">
        Tăng thêm{" "}
        <span
          style={{
            color: "#1890ff",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {" "}
          {rs?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        </span>{" "}
        trong tháng này
      </Text>
    </Card>
  );
};

const CardDashboard_NewCus = ({ total, ratio, rs }) => {
  return (
    <Card>
      <Text className="card_title">Khách hàng mới</Text>
      <div className="card_content">
        <Text className="card_content_text">
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <div className="card_content-div">
          <LineChartOutlined />
          <span>{ratio}%</span>
        </div>
      </div>
      <Text className="card_extra">
        Tăng thêm{" "}
        <span
          style={{
            color: "#1890ff",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {" "}
          {rs?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        </span>{" "}
        trong tháng này
      </Text>
    </Card>
  );
};

const CardDashboard_Ticket = ({ total, ratio, rs }) => {
  return (
    <Card>
      <Text className="card_title">Tổng số vẽ bán ra</Text>
      <div className="card_content">
        <Text className="card_content_text">
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <div className="card_content-div">
          <LineChartOutlined />
          <span>{ratio}%</span>
        </div>
      </div>
      <Text className="card_extra">
        Tăng thêm{" "}
        <span
          style={{
            color: "#1890ff",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {" "}
          {rs?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        </span>{" "}
        trong tháng này
      </Text>
    </Card>
  );
};

const CardDashboard_Refund = ({ total, ratio, rs }) => {
  return (
    <Card>
      <Text className="card_title">Tổng số vé trả</Text>
      <div className="card_content">
        <Text className="card_content_text">
          {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <div className="card_content-div">
          <LineChartOutlined />
          <span>{ratio}%</span>
        </div>
      </div>
      <Text className="card_extra">
        Tăng thêm{" "}
        <span
          style={{
            color: "#1890ff",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {" "}
          {rs?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        </span>{" "}
        trong tháng này
      </Text>
    </Card>
  );
};
export {
  CardDashboard_Revenue,
  CardDashboard_NewCus,
  CardDashboard_Ticket,
  CardDashboard_Refund,
};
