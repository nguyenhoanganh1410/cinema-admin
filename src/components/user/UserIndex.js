import React, { useEffect, useState } from "react";
import {
  Input,
  Col,
  Row,
  Typography,
  message,
  Avatar,
  Breadcrumb,
  Upload,
  Button,
  Form,
  Modal,
} from "antd";
import useUserHook, { yupSync } from "./useUserHook";
import { PlusOutlined } from "@ant-design/icons";

const UserInfo = () => {
  const {
    form,
    uploadButton,
    user,
    imageUrl,
    loading,
    handleChange,
    beforeUpload,
    getBase64,
    handleUpdateProfile,
    loadingProfile,
    setImageUrl,
    previewImage,
    previewOpen,
    previewTitle,
    fileList,
    handleCancel,
    setFileList,
    handlePreview,
  } = useUserHook();
  useEffect(() => {
    form.setFieldsValue({
      first_name: user?.firstName.toLowerCase(),
      last_name: user?.lastName.toLowerCase(),
    });
    if (user?.image) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: user?.image,
        },
      ]);
    }
  }, [user]);

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin tài khoản</Breadcrumb.Item>
      </Breadcrumb>

      <Row
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px 24px",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={24}>
          <Form
            layout="vertical"
            id="myFormAddLinePro"
            form={form}
            onFinish={handleUpdateProfile}
          >
            <Row>
              <Col span={10}></Col>
              <Col span={14}>
                <>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
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
                </>
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  First Name
                </p>
              </Col>
              <Col span={14}>
                <Form.Item rules={[yupSync]} name="first_name">
                  <Input
                    style={{ width: "50%", textTransform:"capitalize" }}
                    placeholder="Enter first name"

                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Last Name
                </p>
              </Col>
              <Col span={14}>
                <Form.Item rules={[yupSync]} name="last_name">
                  <Input
                     style={{ width: "50%", textTransform:"capitalize" }}
                    placeholder="Enter last name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Email
                </p>
              </Col>
              <Col span={14}>
                <Input
                  style={{ width: "50%" }}
                  value={user?.email}
                  placeholder="Enter email"
                  disabled
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              ></Col>
              <Col span={14}>
                <Button
                  form="myFormAddLinePro"
                  htmlType="submit"
                  type="primary"
                  loading={loadingProfile}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>

          <Form style={{ marginTop: "2rem" }}>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Current Password
                </p>
              </Col>
              <Col span={14}>
                <Form.Item rules={[yupSync]} name="current_password">
                  <Input.Password
                    style={{ width: "50%" }}
                    placeholder="Enter password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  New Password
                </p>
              </Col>
              <Col span={14}>
                <Form.Item rules={[yupSync]} name="new_password">
                  <Input.Password
                    style={{ width: "50%" }}
                    placeholder="Enter password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Password Confimation
                </p>
              </Col>
              <Col span={14}>
                <Form.Item rules={[yupSync]} name="confirm_password">
                  <Input.Password
                    style={{ width: "50%" }}
                    placeholder="Enter password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              ></Col>
              <Col span={14}>
                <Button type="primary">Save</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default UserInfo;
