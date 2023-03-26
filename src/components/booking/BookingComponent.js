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
import PayComponent from "./PayComponent";


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
      content: <PickSeatComponent next={next}/>
    },
    {
      title: 'Thanh toán',
      content: <PayComponent next={next} />
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