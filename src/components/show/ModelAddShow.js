import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  TimePicker,
  Upload,
  message,
  Popover,
} from "antd";

import { PlusOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import movieApi from "../../api/movieApi";
import cinameApi from "../../api/cinemaApi";
import showTimeApi from "../../api/showTimeApi";
import moment from "moment/moment";

import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";
import showApi from "../../api/showApi";

const { Option } = Select;

const ModelAddShow = ({ showModalAddCustomer, setShowModalAddCustomer }) => {
  const [listMovie, setListMovie] = useState([]);
  const [moviePicked, setMoviePicked] = useState("");
  const [listCinema, setListCinema] = useState([]);
  const [cinemaPicked, setCinemaPicked] = useState("");
  const [listHall, setListHall] = useState([]);
  const [hallPicked, setHallPicked] = useState("");
  const [listTime, setListTime] = useState([]);
  const [timePicked, setTimePicked] = useState([]);
  const [startDatePicked, setStartDatePicked] = useState("");
  const [durationPicked, setDurationPicked] = useState(0);
  const [durationString, setDurationString] = useState("");
  const [status, setStatus] = useState("");
  const [endDatePicked, setEndDatePicked] = useState("");

  const { RangePicker } = DatePicker;


  const [form] = Form.useForm();

  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalAddCustomer(false);
  };

  //handle submit form create new customer...
  const handleSubmit = async (values) => {
    const payload = {
      startDate: startDatePicked,
      endDate: endDatePicked,
      showTime: timePicked,
      idCinemaHall: values.hall,
      idMovie: values.movie,
      idCinema: values.cinema,
    };

    console.log("payload", payload);
    
    try {
      const res = await showApi.createShow(payload);
      if (res) {
        message.success("Thêm lịch chiếu thành công");
        setShowModalAddCustomer(false);
        depatch(setReload(!reload));
      }
    } catch (error) {
      
      console.log("error", error);
      const { data } = error.response;
      let errorString;
      if (data) {
        for (const val of data.data) {
          const time = await showTimeApi.getTime(val.idShowTime);
          errorString = `Thêm lịch chiếu thất bại: ${val.showDate}, khung giờ ${time.showTime} đã tồn tại trong lịch chiếu có id là ${val.idShow}`;
          message.error(errorString, 10);
        }
      }
     }

  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    setStartDatePicked(dateString[0]);
    setEndDatePicked(dateString[1]);

  };

  const onChangeDateEnd = (date, dateString) => {
  };

  const onChangeMovie = async (value) => {
    setMoviePicked(value);
    const { duration } = await movieApi.getMovieById(value);
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const durationString = `${hours} giờ ${minutes} phút`;
    setDurationString(durationString);
  };

  const onChangeCinema = (value) => {
    console.log(`selected ${value}`);
    setCinemaPicked(value);
  };

  const onChangeHall = (value) => {
    console.log(`selected ${value}`);
    setHallPicked(value);
  };

  const onChangeTime = async (value) => {
    // console.log("value", value);
    const { duration } = await movieApi.getMovieById(moviePicked);
    if (!duration) {
      message.error("Vui lòng chọn phim trước");
      setTimePicked([]);
      return;
    } else {
      setTimePicked(value);
    }
  };

  // fetch list movies
  useEffect(() => {
    //load movies
    const getMovies = async () => {
      try {
        const response = await movieApi.getMovieByType(1)
        if (response) {
          const arrMovie = response.map((item) => {
            return {
              value: item.id,
              label: item.nameMovie,
            };
          });
          setListMovie(arrMovie);
        }
      } catch (error) {
        console.log("Failed to fetch movies list: ", error);
      }
    };

    const getCinemas = async () => {
      try {
        const response = await cinameApi.getCinemas();

        console.log(response);
        //set user info
        if (response) {
          const newArr = response.map((val) => {
            return { value: val.id, label: val.name };
          });

          setListCinema(newArr);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    getCinemas();
    getMovies();
  }, []);

  useEffect(() => {
    const getTimes = async () => {
      try {
        const response = await showTimeApi.getListShowTime();
        const { duration } = await movieApi.getMovieById(moviePicked);
        if (response) {
          let arrTime = [];
          for (let i = 0; i < response.length; i++) {
            const options = {
              value: response[i].id,
              label: response[i].showTime,
            };
            arrTime.push(options);
          }
          console.log("timePicked--", timePicked);
          const timePic = timePicked[timePicked.length - 1];
          console.log("timePic", timePic);

          // get list time start from timePicked[0] with condition between element in list time is greater than duration
          const index = arrTime.findIndex((item) => item.value === timePic);
          console.log("index--", index);
          if (index !== -1) {
            for (let i = 0; i < arrTime.length; i++) {
              if (i < index && !timePicked.includes(arrTime[i].value)) {
                arrTime[i].disabled = true;
              } else {
                if (arrTime[i + 1]) {
                  const betweenTime = Math.abs(
                    moment(arrTime[index].label, "HH:mm").diff(
                      moment(arrTime[i + 1].label, "HH:mm"),
                      "minutes"
                    )
                  );
                  if (betweenTime < duration) {
                    arrTime[i + 1].disabled = true;
                  }
                }
              }
            }
          }
          setListTime(arrTime);
          console.log("========================");
        }
      } catch (error) {
        console.log("Failed to fetch movies list: ", error);
      }
    };

    if (moviePicked) {
      getTimes();
    }
  }, [moviePicked, timePicked]);

  useEffect(() => {
    const getHalls = async () => {
      try {
        if (cinemaPicked) {
          console.log("cinemaPicked", cinemaPicked);
          const response = await cinameApi.getHallByCinema(cinemaPicked);
          console.log("hall", response);
          if (response) {
            const newArr = response.map((val) => {
              return { value: val.id, label: val.name };
            });

            setListHall(newArr);
          }
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    getHalls();
  }, [cinemaPicked]);

  const content = (
    <div>
      <p>
        {` Bạn có thể chọn những khung giờ chiếu lớn hơn hoặc bằng thời lượng phim: ${durationString}`}
      </p>
    </div>
  );


  return (
    <>
      <Drawer
        title="Tạo mới bảng giá"
        width={720}
        onClose={onClose}
        open={showModalAddCustomer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button form="myForm" htmlType="submit" type="primary">
              Thêm
            </Button>
          </Space>
        }
      >
        <Form form={form} onFinish={handleSubmit} id="myForm" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="movie"
                label="Chọn phim"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn bộ phim...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn phim"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeMovie}
                  options={listMovie}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cinema"
                label="Chọn chi nhánh"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn chi nhánh...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn chi nhánh"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeCinema}
                  options={listCinema}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="hall"
                label="Chọn phòng chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn phòng chiếu...",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn phòng chiếu"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeHall}
                  options={listHall}
                />
              </Form.Item>
            </Col>
          
            <Col span={12}>
              <Form.Item
                name="date"
                label="Thời gian chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn thời gian chiếu...",
                  },
                ]}
              >
                <RangePicker 
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                  onChange={onChangeDate}
                  disabledDate={
                    (current) => {
                      return current && current < moment().endOf('day');
                    }
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="showTime"
                label={
                  <p>
                    Chọn suất chiếu
                    {durationString && (
                      <Popover content={content} title="Chọn suất chiếu">
                        <InfoCircleTwoTone />
                      </Popover>
                    )}
                  </p>
                }
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn suất chiếu...",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  tokenSeparators={[","]}
                  placeholder="Chọn suất chiếu"
                  value={timePicked}
                  style={{
                    width: "100%",
                  }}
                  options={listTime}
                  onChange={onChangeTime}
                  status={status}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddShow;
