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
import RevenueTable from "../table/RevenueTable";
import dayjs from "dayjs";
import moment from "moment";
import useRevenueComponentHook from "../useRevenueComponentHook";
import useCustomerComponentHook from "./useCustomerComponentHook";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const CustomerStatitisComponent = () => {
  const { revenues, onChangeDate, listCinema, cinema } =
    useCustomerComponentHook();
    
  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Thống kê theo khách hàng</a>
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
            onChange={onChangeDate}
            defaultValue={[
              dayjs(moment().startOf("month").format(dateFormat), dateFormat),
              dayjs(moment().format(dateFormat), dateFormat),
            ]}
            format={dateFormat}
          />
        </Col>
        <Col span={12}>
          <Select
            disabled
            defaultValue={cinema?.id}
            placeholder="Chọn rạp"
            style={{
              width: "200px",
              margin: "0 1rem",
            }}
            options={listCinema}
           // onChange={handleChangeEmployee}
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
          <RevenueTable tableType={1} revenues={revenues} />
        </Col>
      </Row>
    </div>
  );
};
export default CustomerStatitisComponent;
