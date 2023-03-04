import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Select } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import showApi from "../../api/showApi";
const columns = [
  {
    title: "Bộ phim",
    dataIndex: "filmShow",
  },
  {
    title: "Ngày chiếu",
    dataIndex: "dateShow",
  },
  {
    title: "Giờ chiếu",
    dataIndex: "timeShow",
  },
  {
    title: "Chi nhánh",
    dataIndex: "locationShow",
  },
  {
    title: "Phòng chiếu",
    dataIndex: "roomShow",
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
    filmShow: `Edward King ${i}`,
    dateShow: "30/01/2023",
    timeShow: "10h-12h",
    locationShow: "Cinema Võ Văn Ngân",
    roomShow: "Room 3D",
    status: "Chưa công chiếu",
  });
}
const TableShows = ({ setShowModalAddCustomer, setTab }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listShow, setListShow] = useState([]);

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

  const handleOpenAddShow = () => {
    setShowModalAddCustomer(true);
  };

  //show chart
  const handleShowChart = () => {
    setTab(1);
  };

  useEffect(() => {
    //load movies
    const getListShow = async () => {
      try {
        const response = await showApi.getShow();
        console.log(response);
        //set user info
        if (response) {
          setListShow(response);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    getListShow();
  }, []);

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            onClick={handleOpenAddShow}
            type="primary"
            icon={<UserAddOutlined />}
            title="Thêm mới suất chiếu"
          >
            Thêm
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            disabled={!hasSelected}
            loading={loading}
            icon={<DeleteOutlined />}
            style={{ marginRight: "1rem", marginLeft: "1rem" }}
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

        <div>
          <Button
            type="primary"
            icon={<ToolOutlined />}
            onClick={() => handleShowChart()}
          >
            Xem biểu đồ
          </Button>
          <Select
            placeholder="Hôm nay"
            style={{
              width: "150px",
              margin: "0 1rem",
            }}
            //   onChange={handleChangePosition}
            options={[
              {
                value: "allFill",
                label: "Tất cả",
              },
              {
                value: "todayFill",
                label: "Hôm nay",
              },
              {
                value: "todayFill",
                label: "Ngày mai",
              },
              {
                value: "sevenNextFill",
                label: "7 ngày trước",
              },
              {
                value: "sevenFill",
                label: "7 ngày sau",
              },
            ]}
          />
          <Select
            placeholder="Lọc theo phim"
            style={{
              width: "150px",
            }}
            //   onChange={handleChangePosition}
            options={[
              {
                value: "filmAll",
                label: "Tất cả phim",
              },
              {
                value: "film01",
                label: "Cánh diều âu",
              },
              {
                value: "film02",
                label: "Hoa vàng trên cỏ xanh",
              },
            ]}
          />
        </div>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <Modal
        title="Xóa bộ phim"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn xóa bộ phim này không?</p>
      </Modal>
    </div>
  );
};
export default TableShows;
