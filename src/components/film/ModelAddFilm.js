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
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import categoryMovie from "../../api/categoryMovie";

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
    setFileList(newFileList);
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

  /////

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
  };

  useEffect(() => {
    //load movies
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
    getCategories();
  }, []);
  return (
    <>
      <Drawer
        title="Thêm bộ phim"
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
                label="Tên bộ phim"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên bộ phim...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên bộ phim..." />
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
                  onChange={handleChangePosition}
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
                  onChange={handleChangePosition}
                  options={[
                    {
                      value: "time01",
                      label: "60 phút",
                    },
                    {
                      value: "time02",
                      label: "90 phút",
                    },
                    {
                      value: "time03",
                      label: "120 phút",
                    },
                    {
                      value: "time04",
                      label: "180 phút",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
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
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Form.Item
                name="daoDien"
                label="Đạo diễn"
                rules={[
                  {
                    required: true,
                    message: "Hãy tên đạo diễn...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên đạo diễn..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dienVien"
                label="Diễn viên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên diễn viên...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên diễn viên..." />
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
                <Input placeholder="Hãy nhập link trailer..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="chonRap"
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
                  options={[
                    {
                      value: "ciname01",
                      label: "cinema võ văn ngân",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            statu
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddFilm;
