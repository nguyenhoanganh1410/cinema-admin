import React, { useEffect, useState } from "react";
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
  message, Steps, theme
} from "antd";
import PickFilmComponent from "./PickFilmComponent";
import PickSeatComponent from "./PickSeatComponent";
import PickShowComponent from "./PickShowComponent";


const BookingComponent = ({ setTab }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [film, setFilm] = useState(null)
  
  const next = (currentFilm) => {
    setCurrent(current + 1);
    setFilm(currentFilm)
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'Chọn phim',
      content: <PickFilmComponent next={next}/>,
    },
    {
      title: 'Chọn suất chiếu',
      content: <PickShowComponent next={next} film={film}/>
    },
    {
      title: 'Chọn ghế',
      content: <PickSeatComponent />
    },
    {
      title: 'Chọn khuyến mãi',
      content: 'Last-content',
    },
    {
      title: 'Chọn bắp nước',
      content: 'Last-content',
    },
    {
      title: 'Khách hàng',
      content: 'Last-content',
    },
    {
      title: 'Thanh toán',
      content: 'Last-content',
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    minHeight: '260px',
    
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    minHeight:"80vh"
  };
  return (
    <div className="bookingComponent" style={{marginBottom:"3rem"}}>
      <Breadcrumb style={{ marginBottom: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Đặt vé</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {steps[current].content}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
export default BookingComponent;