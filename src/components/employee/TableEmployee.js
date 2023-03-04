import React, { useEffect,useState } from "react";
import { Button, Table, Modal, Tag, Image } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import staffApi from "../../api/staffApi";
const onClick=(e)=>{
  console.log("evet",e)
}
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Họ và Tên",
    dataIndex: "name",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
  },
  {
    title: "Giới Tính",
    dataIndex: "gender",
  },
  {
    title: "Ngày sinh",
    dataIndex: "dob",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Chức vụ",
    dataIndex: "position",
    render: (position) => {
      let color = "green";
      if (position === "Nhân Viên") {
        color = "green";
      }
      if (position === "Quản Lý") {
        color = "blue";
      }
      return (
        <Tag color={color} key={position}>
          {position?.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Người Quản Lý",
    dataIndex: "maneger",
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    render: (image) => <Image width={50} src={image} />,
  },
];

const TableEmployee = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listStaff, setListStaff] = useState([]);

  useEffect(() => {
    const fetchListStaff = async () => {
      try {
        const response = await staffApi.getStaffs();
        console.log(response);
        const data = response.map((item, index) => {
          return {
            key: index,
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            phone: item.phone,
            gender: item.gender,
            dob: item.dob,
            address: ` ${item.ward_id} ${item.district_id} ${item.city_id}`,
            email: item.email,
            position: item.position,
            status: item.status,
            // maneger: `${item.Staffs[0]?.firstName} ${item.Staffs[0]?.lastName}`,
            maneger: item.Staffs[0]?.firstName + item.Staffs[0]?.lastName,
            image: item.image,
          };
        });
        setListStaff(data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchListStaff();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const selectedOne = selectedRowKeys.length === 1;

  //handle delete customer in here...
  const handleDelete = () => {
    showModal();
  };

  //handle update customer in here ....
  const handleUpdate = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  ///
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
  /////

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          danger
          onClick={handleDelete}
          disabled={!hasSelected}
          loading={loading}
          icon={<DeleteOutlined />}
          style={{ marginRight: "1rem" }}
        >
          Xóa
        </Button>
        <Button
          type="primary"
          onClick={handleUpdate}
          disabled={!selectedOne}
          loading={loading}
          icon={<ToolOutlined />}
        >
          Cập nhật
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={listStaff} />
      <Modal
        title="Xóa nhân viên"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn xóa nhân viên không?</p>
      </Modal>
    </div>
  );
};
export default TableEmployee;
