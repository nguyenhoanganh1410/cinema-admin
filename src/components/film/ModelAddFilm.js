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
import { fimlValidator } from "./FilmSchema";
import cinameApi from "../../api/cinemaApi";
import movieApi from "../../api/movieApi";
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModelAddFilm = ({ showModalAddCustomer, setShowModalAddCustomer }) => {
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
    setShowModalAddCustomer(false);
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





  const handleSubmit = async() => {
    //call api create a new movie
    const data = new FormData();
    data.append("nameMovie", nameMovie);
    data.append("cast", cast);
    data.append("director", director);
    data.append("linkTrailer", linkTrailer);
    data.append("idCategoryMovie", category);
    data.append("duration", time);
    data.append("releaseDate", releaseDate);
    data.append("idCinema", 1);
    data.append("desc", desc);
    data.append("classify", classify);
    data.append("endDate", endDate);
    data.append("status", status);
    console.log(image);
    if(image){
      data.append("image", image);
    }
    const rs = await movieApi.createMovie(data);
    console.log(rs);
    if(rs){
      setShowModalAddCustomer(false);
      setTimeout(() => {
        message.success("Th??m phim th??nh c??ng");
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
        title="Th??m b??? phim"
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
                name="name"
                label="T??n b??? phim"
                rules={[
                  {
                    required: true,
                    message: "H??y nh???p t??n b??? phim...",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setNameMovie(e.target.value)}
                  placeholder="H??y nh???p t??n b??? phim..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Th??? lo???i"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n th??? lo???i b??? phim...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n th??? lo???i"
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
                label="Th???i l?????ng"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n th???i l?????ng b??? phim...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n th???i l?????ng"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChangeTime}
                  options={[
                    {
                      value: "60",
                      label: "60 ph??t",
                    },
                    {
                      value: "90",
                      label: "90 ph??t",
                    },
                    {
                      value: "120",
                      label: "120 ph??t",
                    },
                    {
                      value: "180",
                      label: "180 ph??t",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="classify"
                label="????? tu???i th??ch h???p"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n ????? tu???i th??ch h???p...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n ????? tu???i th??ch h???p"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeClassify}
                  options={[
                    {
                      value: "C13"  ,
                      label: "C13 - 13 tu???i tr??? l??n",
                    },
                    {
                      value: "C16",
                      label: "C16 - 16 tu???i tr??? l??n",
                    },
                    {
                      value: "C18",
                      label: "C18 - 18 tu???i tr??? l??n",
                    },
                    {
                      value: "C21",
                      label: "C21 - 21 tu???i tr??? l??n",
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
                label="Ng??y ph??t h??nh"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n ng??y ph??t h??nh b??? phim...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  placeholder="Ch???n ng??y ph??t h??nh"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="Ng??y k???t th??c"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n ng??y k???t th??c b??? phim...",
                  },
                ]}
              >
                <DatePicker
                  onChange={onChangeEndDate}
                  style={{ width: "100%" }}
                  placeholder="Ch???n ng??y k???t th??c"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="daoDien"
                label="?????o di???n"
                rules={[
                  {
                    required: true,
                    message: "H??y t??n ?????o di???n...",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setDirector(e.target.value)}
                  placeholder="H??y nh???p t??n ?????o di???n..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dienVien"
                label="Di???n vi??n"
                rules={[
                  {
                    required: true,
                    message: "H??y nh???p t??n di???n vi??n...",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setCast(e.target.value)}
                  placeholder="H??y nh???p t??n di???n vi??n..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="link"
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
                  placeholder="H??y nh???p link trailer..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="chonRap"
                label="Ch???n r???p"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n r???p...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n r???p"
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
                label="Tr???ng th??i"
                rules={[
                  {
                    required: true,
                    message: "H??y ch???n tr???ng th??i...",
                  },
                ]}
              >
                <Select
                  placeholder="Ch???n tr???ng th??i"
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeStatus}
                  options={[
                    {
                      value: "1"  ,
                      label: "??ang chi???u",
                    },
                    {
                      value: "2",
                      label: "S???p chi???u",
                    },
                    {
                      value: "3",
                      label: "Ng???ng chi???u",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
              name="image"
              label="H??nh ???nh"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Ch??? ch???p nh???n file ???nh"
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
              <Form.Item name="description" label="Mi??u t???">
                <Input.TextArea
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  placeholder="Nh???p mi??u t???..."
                />
              </Form.Item>
            </Col>
          </Row>

          
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddFilm;
