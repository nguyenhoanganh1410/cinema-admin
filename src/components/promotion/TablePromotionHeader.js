import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import movieApi from "../../api/movieApi";
const columns = [
  {
    title: "Tên CT khuyễn mãi",
    dataIndex: "nameMovie",
  },
  {
    title: "Mô tả",
    dataIndex: "director",
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "duration",
  },
  {
    title: "Ngày kết thúc",
    dataIndex: "releaseDate",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "CT con",
    dataIndex: "childPromotion",
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    nameMovie: `Edward King ${i}`,
    director: "0397574636",
    duration: `London, Park Lane no. ${i}`,
    releaseDate: "Nhân viên",
    status: "active",
    childPromotion: "Xem CT con (5)",
  });
}
const TablePromotionHeader = ({ setTab }) => {
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

  //handle show details of promotion header
  const handeShowDetailsPromotion = () => {
    setTab(1);
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

  //   useEffect(() => {
  //     //load movies
  //     const gettListMovie = async () => {
  //       try {
  //         const response = await movieApi.getMovies();

  //         console.log(response);
  //         //set user info
  //         if (response) {
  //           //handle data
  //           const newList = response.map((movie) => {
  //             movie.releaseDate = movie.releaseDate.substring(0, 10);
  //             movie.duration = movie.duration + " " + "phút";
  //             return movie;
  //           });
  //           setListMovie(response);
  //         }
  //       } catch (error) {
  //         console.log("Failed to login ", error);
  //       }
  //     };
  //     gettListMovie();
  //   }, []);

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
          onClick={handeShowDetailsPromotion}
          disabled={!selectedOne}
          loading={loading}
          icon={<ToolOutlined />}
        >
          Chi tiết
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
export default TablePromotionHeader;
