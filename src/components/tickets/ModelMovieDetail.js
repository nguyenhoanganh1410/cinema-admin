import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  message
} from "antd";

import { useFormik } from "formik";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import categoryMovie from "../../api/categoryMovie";
import cinameApi from "../../api/cinemaApi";
import movieApi from "../../api/movieApi";
import moment from "moment";
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModelDetailMovie = ({ showModalDetailMovie, setShowModalDetailMovie,selectedId }) => {
  const [listCategory, setListCategory] = useState([]);
  const [listCinema, setListCinema] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [nameMovie, setNameMovie] = useState("");
  const [cast, setCast] = useState("");
  const [director, setDirector] = useState("");
  const [linkTrailer, setLinkTrailer] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [desc, setDesc] = useState("");
  const [classify, setClassify] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [movieInfo, setMovieInfo] = useState({});
  const [form] = Form.useForm();

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    if (fileList.length < 1) {
      setFileList(newFileList);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalDetailMovie(false);
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangeTime = (value) => {
    setTime(value);
  };
  const handleChangeCategory = (value) => {
    setCategory(value);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    setReleaseDate(dateString);
  };
  const onChangeEndDate = (date, dateString) => {
    setEndDate(dateString);
  };

  const onChangeClassify = (value) => {
    setClassify(value);
  };

  const onChangeStatus = (value) => {
    setStatus(value);
  };

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const response = await movieApi.getMovieById(selectedId);
      console.log(response);
      setMovieInfo(response);
      setNameMovie(response.nameMovie);
      setCast(response.cast);
      setDirector(response.director);
      setLinkTrailer(response.linkTrailer);
      setCategory(response.idCategoryMovie);
      setTime(response.duration);
      setReleaseDate(response.releaseDate);
      setDesc(response.desc);
      setClassify(response.classify);
      setEndDate(response.endDate);
      setStatus(response.status);
      setImage(response.image);
      form.setFieldsValue({
        id: response.id,
        nameMovie: response.nameMovie,
        cast: response.cast,
        director: response.director,
        linkTrailer: response.linkTrailer,
        category: response.idCategoryMovie,
        time: response.duration,
        releaseDate: moment(response.releaseDate),
        desc: response.desc,
        classify: response.classify,
        endDate: moment(response.endDate),
        status: response.status,
        cinema:response.idCinema,
        image: [{
          uid: "-1",
          name: "image.png",
          status: "done",
          url: response?.image,
        }]
      });
    };
    fetchMovieInfo();
  }, []);





  const handleSubmit = async() => {
    //call api create a new movie
    // const data = new FormData();
    // data.append("nameMovie", nameMovie);
    // data.append("cast", cast);
    // data.append("director", director);
    // data.append("linkTrailer", linkTrailer);
    // data.append("idCategoryMovie", category);
    // data.append("duration", time);
    // data.append("releaseDate", releaseDate);
    // data.append("idCinema", 1);
    // data.append("desc", desc);
    // data.append("classify", classify);
    // data.append("endDate", endDate);
    // data.append("status", status);
    // if(image){
    //   data.append("image", image);
    // }

    
    const data = {
      nameMovie: nameMovie,
      cast: cast,
      director: director,
      linkTrailer: linkTrailer,
      idCategoryMovie: category,
      duration: time,
      releaseDate: releaseDate,
      idCinema: 1,
      desc: desc,
      classify: classify,
      endDate: endDate,
      status: status,
      image: image,
    };
    console.log(data);
    const rs = await movieApi.updateMovie(selectedId,data);
    console.log(rs);
    if(rs){
      setShowModalDetailMovie(false);
      setTimeout(() => {
        message.success("Cập nhật phim thành công");
      }, 500);
    }
  };
  useEffect(() => {
    //load categories
    const getCategories = async () => {
      try {
        const response = await categoryMovie.getCategory();

        console.log(response);
        //set user info
        if (response) {
          //handle data
          const newArr = response.map((val) => {
            return { value: val.id, label: val.nameCategory };
          });
          setListCategory(newArr);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };

    //load categories
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
    getCategories();
  }, []);


  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setImage(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);

  };


  return (
    <>
      <Drawer
        title="Thêm bộ phim"
        width={720}
        onClose={onClose}
        open={showModalDetailMovie}
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
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="id" label="ID" >
                <Input disabled={true}  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nameMovie"
                label="Tên bộ phim"
                
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên bộ phim...",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setNameMovie(e.target.value)}
                  placeholder="Hãy nhập tên bộ phim..."
                  
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Thể loại"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn thể loại bộ phim...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn thể loại"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangeCategory}
                  options={listCategory}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Thời lượng"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn thời lượng bộ phim...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn thời lượng"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangeTime}
                  options={[
                    {
                      value: "60",
                      label: "60 phút",
                    },
                    {
                      value: "90",
                      label: "90 phút",
                    },
                    {
                      value: "120",
                      label: "120 phút",
                    },
                    {
                      value: "180",
                      label: "180 phút",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="classify"
                label="Độ tuổi thích hợp"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn độ tuổi thích hợp...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn độ tuổi thích hợp"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeClassify}
                  options={[
                    {
                      value: "C13"  ,
                      label: "C13 - 13 tuổi trở lên",
                    },
                    {
                      value: "C16",
                      label: "C16 - 16 tuổi trở lên",
                    },
                    {
                      value: "C18",
                      label: "C18 - 18 tuổi trở lên",
                    },
                    {
                      value: "C21",
                      label: "C21 - 21 tuổi trở lên",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="releaseDate"
                label="Ngày phát hành"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày phát hành bộ phim...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày phát hành"
                  value={moment(movieInfo?.releaseDate)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="Ngày kết thúc"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày kết thúc bộ phim...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeEndDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày kết thúc"
                  value={moment(movieInfo?.endDate)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="director"
                label="Đạo diễn"
                rules={[
                  {
                    required: true,
                    message: "Hãy tên đạo diễn...",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setDirector(e.target.value)}
                  placeholder="Hãy nhập tên đạo diễn..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cast"
                label="Diễn viên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên diễn viên...",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setCast(e.target.value)}
                  placeholder="Hãy nhập tên diễn viên..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="linkTrailer"
                label="Link trailer"
                rules={[
                  {
                    required: true,
                    message: "Link trailer...",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setLinkTrailer(e.target.value)}
                  placeholder="Hãy nhập link trailer..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cinema"
                label="Chọn rạp"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn rạp...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn rạp"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangePosition}
                  options={listCinema}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
            <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn trạng thái...",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn trạng thái"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeStatus}
                  options={[
                    {
                      value: "1"  ,
                      label: "Đang chiếu",
                    },
                    {
                      value: "2",
                      label: "Sắp chiếu",
                    },
                    {
                      value: "3",
                      label: "Ngừng chiếu",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
              name="image"
              label="Hình ảnh"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Chỉ chấp nhận file ảnh"
              type="file"
            >
              <Upload name="logo" customRequest={dummyRequest}
                 listType="picture" maxCount={1} accept=".jpg,.jpeg,.png"
              >
                <Button  icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }} gutter={16}>
            <Col span={24}>
              <Form.Item name="desc" label="Miêu tả">
                <Input.TextArea
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  placeholder="Nhập miêu tả..."
                />
              </Form.Item>
            </Col>
          </Row>

          
        </Form>
      </Drawer>
    </>
  );
};
export default ModelDetailMovie;
