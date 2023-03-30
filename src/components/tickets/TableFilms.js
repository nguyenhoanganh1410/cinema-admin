import React, { useEffect, useState } from "react";
import { Button, Table, Modal,Image,message,Badge,Tag, } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import movieApi from "../../api/movieApi";
import ModelDetailMovie from "./ModelMovieDetail";
const columns = [
  {
    title: "Mã hóa đơn",
    dataIndex: "codeBill",
  },
  {
    title: "Khách hàng",
    dataIndex: "duration",
  },
  {
    title: "Phim",
    dataIndex: "releaseDate",
  },
  {
    title: "Suất chiếu",
    dataIndex: "endDate",
  },
  {
    title: "Tổng tiền",
    dataIndex: "status",
  
  },
  {
    title: "Active",
    dataIndex: "active",
    render: (active) => {
      let color = "green";
      if (active === "Đã thanh toán") {
        color = "green";
      }
      if (active === "Đã trả vé") {
        color = "blue";
      }
      return (
        <Tag color={color} key={active}>
          {active.toUpperCase()}
        </Tag>
      );
    },
  },

];

const TableFilms = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listMovie, setListMovie] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModalDetailMovie, setShowModalDetailMovie] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const showModalDetail = (e) => {
    setShowModalDetailMovie(true);
    setSelectedId(e);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);

    //handle code for log out in here

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  /////

  const handleRefresh = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      // setSelectedRowKeys([]);
      setLoading(false);
      setRefresh(!refresh);
      message.success("Tải lại thành công");
    }, 1000);
  };

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
            movie.releaseDate = movie?.releaseDate?.substring(0, 10);
            movie.duration = movie?.duration + " " + "phút";
            movie.endDate = movie?.endDate?.substring(0, 10);
            const status = Number(movie?.status);
            let statusName = "";
            if (status === 1) {
              statusName = "Đang chiếu";
            } else if (status === 0) {
              statusName = "Sắp chiếu";
            } else if(status === 2) {
              statusName = "Ngừng chiếu";
            }
            movie.status = statusName;

            const active = movie?.isActived;
            console.log('ac',active);
            let activeName = "";
            if (active === true) {
              activeName = "Hoạt động";
            } else if (active === false) {
              activeName = "Ngừng hoạt động";
            }
            movie.active = activeName;

            return movie;
          });
          setListMovie(response);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    gettListMovie();
  }, [refresh]);

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        
        <Button
          type="primary"
          onClick={handleRefresh}
          loading={loading}
          icon={<ReloadOutlined />}
        >
          Làm mới
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""} */}
        </span>
      </div>
      <Table columns={columns} dataSource={listMovie}
       
      />
      <Modal
        title="Xóa bộ phim"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn xóa bộ phim này không?</p>
      </Modal>

      {showModalDetailMovie ? (
        <ModelDetailMovie
          showModalDetailMovie={showModalDetailMovie}
          setShowModalDetailMovie={setShowModalDetailMovie}
          selectedId={selectedId}
        />
      ) : null}

    </div>
  );
};
export default TableFilms;
