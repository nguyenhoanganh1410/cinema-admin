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
  Select,
} from "antd";
import RevenueTable from "./table/RevenueTable";
import dayjs from "dayjs";
import moment from "moment";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const RevenueComponent = () => {
  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Thống kê doanh thu</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <Col span={6}>
          <RangePicker
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            style={{ minWidth: "50%" }}
            defaultValue={[
              dayjs(moment().startOf("month").format(dateFormat), dateFormat),
              dayjs(moment().format(dateFormat), dateFormat),
            ]}
            format={dateFormat}
          />
        </Col>
        <Col span={12}>
          <Select
            placeholder="Thống kê theo nhân viên"
            style={{
              width: "200px",
              margin: "0 1rem",
            }}
            //   onChange={handleChangePosition}
            options={[
              {
                value: "allFill",
                label: "Tất cả nhân viên",
              },
              {
                value: "emp-01",
                label: "Nhân viên 1",
              },
              {
                value: "emp-02",
                label: "Nhân viên 2",
              },
            ]}
          />
        </Col>
        <Col span={4} style={{ position: "absolute", right: "2.5%" }}>
          <Button type="primary" title="Xuất file">
            Xuất báo cáo
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
          <RevenueTable />
        </Col>
      </Row>
    </div>
  );
};
export default RevenueComponent;
