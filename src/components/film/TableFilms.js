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
    title: "Tên phim",
    dataIndex: "nameMovie",
  },
  {
    title: "Đạo diễn",
    dataIndex: "director",
  },
  {
    title: "Thời lượng",
    dataIndex: "duration",
  },
  {
    title: "Ngày phát hành",
    dataIndex: "releaseDate",
  },
];

const TableFilms = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listMovie, setListMovie] = useState([]);

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

  useEffect(() => {
    //load movies
    const gettListMovie = async () => {
      try {
        const response = await movieApi.getMovies();

        console.log(response);
        //set user info
        if (response) {
          //handle data
          const newList = response.map((movie) => {
            movie.releaseDate = movie.releaseDate.substring(0, 10);
            movie.duration = movie.duration + " " + "phút";
            return movie;
          });
          setListMovie(response);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    gettListMovie();
  }, []);

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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={listMovie}
      />
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
export default TableFilms;
