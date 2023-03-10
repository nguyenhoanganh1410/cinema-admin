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
        title="Th??m su???t chi???u"
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
                label="Ch???n phim"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n b??? phim...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n phim"
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
                label="Ch???n chi nh??nh"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n chi nh??nh...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n chi nh??nh"
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
                label="Ch???n ph??ng chi???u"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n ph??ng chi???u...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n ph??ng chi???u"
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
                label="Ng??y b???t ?????u"
                rules={[
                  ({getFieldValue})=>({
                    validator(rule,value){
                      console.log('val',value)
                      if(value < new Date()){
                        return Promise.reject("Ng??y b???t ?????u ph???i l???n h??n ng??y hi???n t???i!");
                      }
                    }
                  })
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Ch???n ng??y chi???u"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="Ng??y k???t th??c"
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
                  placeholder="Ch???n ng??y k???t th??c"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={24}>
              <Form.Item
                name="showTime"
                label="Ch???n su???t chi???u"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n su???t chi???u...",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  tokenSeparators={[',']}
                  placeholder="Ch???n su???t chi???u"
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
