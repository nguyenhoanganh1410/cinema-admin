import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardTwoTone,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Button,
  Space,
  Typography,
  Modal,
} from "antd";
import "./HomePageStyle.scss";
import ItemNotification from "../components/notification/ItemNotification";
import Index from "../components/dashboard";
import IndexDashboard from "../components/dashboard";
import IndexCustomer from "../components/customer";
const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const dropList = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];
const items = [
  getItem("Dashboard", "1", <DashboardTwoTone />),
  getItem("Đặt vé", "2", <DesktopOutlined />),
  getItem("Quản lý phim", "sub1", <UserOutlined />, [
    getItem("Danh sách phim", "3"),
    getItem("Quản lý suất chiếu", "4"),
  ]),
  getItem("Quản lý rạp", "sub4", <HomeOutlined />, [
    getItem("Rạp", "13"),
    getItem("Ghế", "14"),
  ]),

  getItem("Quản lý khuyến mãi", "sub2", <ThunderboltOutlined />, [
    getItem("Voucher", "6"),
    getItem("Khuyến mãi", "8"),
  ]),
  getItem("Quản lý vé", "sub3", <ProjectOutlined />, [
    getItem("Vé đã đặt", "9"),
    getItem("Các đơn đặt online", "10"),
  ]),

  getItem("Quản lý khách hàng", "11", <TeamOutlined />),
  getItem("Quản lý dịch vụ", "12", <DesktopOutlined />),
  getItem("Quản lý nhân viên", "15", <UserOutlined />),
  getItem("Quản lý tài khoản", "16", <DesktopOutlined />),
  getItem("Quản lý thu chi", "17", <DesktopOutlined />),
  getItem("Thống kê", "18", <PieChartOutlined />),
];
const HomePage = () => {
  //model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);

    //handle code for log out in here

    ////////
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  //click item in tabbar -> render component
  const [itemClicked, setItemClicked] = useState(1);

  //onclich item in menu
  function onClick(info) {
    // console.log(info.key);

    setItemClicked(+info.key);
  }

  const onClickMenuUser = (info) => {
    //console.log(info);
    //if user click logout
    if (info.key === "logout") {
      //show model
      showModal();
    } else if (info.key === "profile") {
    } else if (info.key === " setting") {
    }
  };

  //// console.log("home page");
  const RenderHome = () => {
    console.log(itemClicked);
    if (itemClicked === 1) {
      return <IndexDashboard />;
    } else if (itemClicked === 11) {
      return <IndexCustomer />;
    }else if( itemClicked === 11){

    }
    return <IndexDashboard />;
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 24,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              padding: "0 1rem",
            }}
          >
            <div></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Dropdown
                overlay={
                  <>
                    <Menu>
                      <Menu.Item key="0L">
                        <Text
                          style={{
                            fontSize: "18px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          Thông báo
                        </Text>
                      </Menu.Item>
                      <Menu.Item key="0">
                        <ItemNotification />
                      </Menu.Item>

                      <Menu.Item key="1">
                        {" "}
                        <ItemNotification />
                      </Menu.Item>
                      <Menu.Item key="100">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "blue",
                              cursor: "pointer",
                            }}
                          >
                            View All
                          </Text>
                        </div>
                      </Menu.Item>
                    </Menu>
                  </>
                }
                trigger={["click"]}
              >
                <div
                  className="notification"
                  onClick={(e) => e.preventDefault()}
                >
                  <BellOutlined
                    style={{ color: "#0068ff" }}
                    className="notification_icon"
                  />
                </div>
              </Dropdown>
              <Dropdown
                overlay={
                  <>
                    <Menu onClick={onClickMenuUser}>
                      <Menu.Item key="0">
                        <div style={{ width: "20rem", display: "flex" }}>
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",

                              width: "35px",
                              height: "35px",
                              marginRight: "12px",
                            }}
                          >
                            U
                          </Avatar>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Text style={{ fontWeight: "500", color: "#333" }}>
                              Ant Desig
                            </Text>
                            <Text
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#abb4bc",
                              }}
                            >
                              Employee
                            </Text>
                          </div>
                        </div>
                      </Menu.Item>

                      <Menu.Item
                        key="profile"
                        style={{ padding: " 12px 12px" }}
                      >
                        {" "}
                        <div>
                          <ProfileOutlined />
                          <Text style={{ marginLeft: "12px" }}>Thông tin</Text>
                        </div>
                      </Menu.Item>
                      <Menu.Item
                        key="setting"
                        style={{ padding: " 12px 12px" }}
                      >
                        {" "}
                        <div>
                          <SettingOutlined />
                          <Text style={{ marginLeft: "12px" }}>Cài đặt</Text>
                        </div>
                      </Menu.Item>
                      <Menu.Item key="logout" style={{ padding: " 12px 12px" }}>
                        <div>
                          <LogoutOutlined />
                          <Text style={{ marginLeft: "12px" }}>Đăng xuất</Text>
                        </div>
                      </Menu.Item>
                    </Menu>
                  </>
                }
                trigger={["click"]}
              >
                <div
                  className="avt_group"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "0.5rem",

                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    style={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",

                      width: "35px",
                      height: "35px",
                      marginRight: "6px",
                    }}
                  >
                    U
                  </Avatar>
                  <Text style={{ fontWeight: "500", color: "#333" }}>
                    Ant Desig
                  </Text>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: "0 16px",
            overflow: "auto",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              //padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
            }}
          >
            <RenderHome />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
      <Modal
        title="Đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn đăng xuất không?</p>
      </Modal>
    </Layout>
  );
};
export default HomePage;
