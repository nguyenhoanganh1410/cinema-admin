import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Row,
  Typography,
  Tooltip,
  Space,
} from "antd";
import "./LoginForm.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import tokenService from "../../service/token.service";

const { Title, Text } = Typography;
const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const dispatch = useDispatch();

  const setOnChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const setOnChangePass = (e) => {
    setPassword(e.target.value);
  };

  //handle submit to login user
  const handleSubmitForm = () => {
    setLoadingStatus(true);
    //call api for login
    const loginUser = async (username, pass) => {
      try {
        const response = await userApi.login(username, pass);

        setLoadingStatus(false);
        //console.log(response);
        //set user info
        if (response) {
          //redirct home page
          navigate("/");
          dispatch(setUser(response.data.staff));

          //luu thông tin acessTonken vào localstorage
          tokenService.setUser(response.data);
        }
      } catch (error) {
        console.log("Failed to login ", error);
        setLoadingStatus(false);
      }
    };
    loginUser(userName, password);
  };

  return (
    <Row style={{ height: "100vh" }} className="login">
      <Col span={8}></Col>
      <Col span={8} style={{ height: "100%", padding: "0 12px" }}>
        <div className="login_form">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "#0068ff", fontSize: "3rem", margin: 0 }}>
              CineStar
            </h1>
            <p
              style={{
                fontSize: "18px",
                textAlign: "center",
                color: "#31465e",
                marginBottom: "2rem",
              }}
            >
              Đăng nhập hệ thống quản lý rạp để tối ưu hóa{" "}
              <span
                style={{
                  color: "#0068ff",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                công việc
              </span>{" "}
              hiệu quả
            </p>
          </div>
          <form
            onSubmit={() => handleSubmitForm()}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "2rem 2rem",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "500",
                textAlign: "center",
                color: "#0068ff",
                margin: 0,
                marginBottom: "2rem",
              }}
            >
              Đăng Nhập
            </p>
            <Input
              size="large"
              placeholder="Nhập tên tài khoản"
              onChange={(e) => setOnChangeUserName(e)}
              prefix={<UserOutlined />}
            />

            <Input.Password
              size="large"
              placeholder="Nhập mật khẩu"
              onChange={(e) => setOnChangePass(e)}
              prefix={<LockOutlined />}
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            />
            {userName && password ? (
              <Button
                onClick={() => handleSubmitForm()}
                type="primary"
                style={{ width: "100%", height: "40px", marginBottom: "1rem" }}
                loading={loadingStatus}
              >
                Đăng Nhập
              </Button>
            ) : (
              <Button
                onClick={() => handleSubmitForm()}
                disabled
                type="primary"
                style={{ width: "100%", height: "40px", marginBottom: "1rem" }}
              >
                Đăng Nhập
              </Button>
            )}
            <p className="forgetPassword">
              Quên mật khẩu? <span> Lấy lại mật khẩu</span>
            </p>
          </form>
        </div>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};
export default LoginForm;
