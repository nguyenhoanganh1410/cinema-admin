import React, { useState } from "react";
import { Button, Table, Modal } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const columns = [
  {
    title: "Họ và Tên",
    dataIndex: "name",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  {
    title: "Chức vụ",
    dataIndex: "chucVu",
  },
   {
    title: "Trạng thái",
    dataIndex: "status",
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    phone: "0397574636",
    address: `London, Park Lane no. ${i}`,
    chucVu: "Nhân viên",
    status:"active"
  });
}
const TableEmployee = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
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
