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
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import movieApi from "../../api/movieApi";
import cinameApi from "../../api/cinemaApi";
import showTimeApi from "../../api/showTimeApi";

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
  const [startDatePicked,setStartDatePicked] = useState("");


  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalAddCustomer(false);
  };

  //handle submit form create new customer...
  const handleSubmit = () => {
    //write code in here...
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setStartDatePicked(dateString)
  };

  const onChangeMovie = (value) => {
    console.log(`selected ${value}`);
    setMoviePicked(value);
  };

  const onChangeCinema = (value) => {
    console.log(`selected ${value}`);
    setCinemaPicked(value);
  };

  const onChangeHall = (value) => {
    console.log(`selected ${value}`);
    setHallPicked(value);
  };

  const onChangeTime = (value) => {
    setTimePicked(value);
    
  };


  // fetch list movies
  useEffect(() => {
    //load movies
    const getMovies = async () => {
      try {
        const response = await movieApi.getMovies();
        if(response){
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

    const getTimes = async () => {
      try {
        const response = await showTimeApi.getListShowTime();
        if(response){
          const arrTime = response.map((item) => {
            return {
              value: item.id,
              label: item.showTime,
            };
          });
          setListTime(arrTime);
        }
      } catch (error) {
        console.log("Failed to fetch movies list: ", error);
      }
    };

    getTimes();
    getCinemas();
    getMovies();
  }, []);

  useEffect(() => {
    const getHalls = async () => {
      try {
        if(cinemaPicked){
          console.log('cinemaPicked',cinemaPicked);
          const response = await cinameApi.getHallByCinema(cinemaPicked);
          console.log('hall',response);
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






  return (
    <>
      <Drawer
        title="Thêm suất chiếu"
        width={720}
        onClose={onClose}
        open={showModalAddCustomer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
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
                  placeholder="Chọn phòng chiếu"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeHall}
                  options={listHall}
                />
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="startDate"
                label="Ngày bắt đầu"
                rules={[
                  ({getFieldValue})=>({
                    validator(rule,value){
                      console.log('val',value)
                      if(value < new Date()){
                        return Promise.reject("Ngày bắt đầu phải lớn hơn ngày hiện tại!");
                      }
                    }
                  })
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày chiếu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="Ngày kết thúc"
                rules={[
                  ({getFieldValue})=>({
                    validator(rule,value){
                      console.log('val',value)
                      console.log('start',new Date(startDatePicked))
                      if(value < new Date(startDatePicked)){
                        console.log('ok')
                      }
                    }
                  })
                ]}
              >
                <DatePicker
                  // onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày kết thúc"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={24}>
              <Form.Item
                name="showTime"
                label="Chọn suất chiếu"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn suất chiếu...",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  tokenSeparators={[',']}
                  placeholder="Chọn suất chiếu"
                  style={{
                    width: "100%",
                  }}
                  options={listTime}
                  onChange={onChangeTime}

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
