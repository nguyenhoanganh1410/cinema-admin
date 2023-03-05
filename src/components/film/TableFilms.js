import React, { useEffect, useState } from "react";
import { Button, Table, Modal,Image,message,Badge, } from "antd";
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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      render: (val) => {
        return <a onClick={()=>{
          showModalDetail(val);
        }}>{val}</a>;
      }
    },
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
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color = "";
        if (status === "Đang chiếu") {
          color = "green";
        }
        if (status === "Sắp chiếu") {
          color = "blue";
        }
        if (status === "Ngừng chiếu") {
          color = "red";
        }
        return (
          <Badge status={color} text={status} />
        );
      }
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => (
        <Image
          width={50}
          src={image}
        />
      ),
    }
  ];

  


  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  // const hasSelected = selectedRowKeys.length > 0;
  // const selectedOne = selectedRowKeys.length === 1;

  //handle delete Movie in here...
  const handleDelete = () => {
    showModal();
  };

  //handle update Movie in here ....
  const handleUpdate = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      // setSelectedRowKeys([]);
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
            } else if (status === 2) {
              statusName = "Sắp chiếu";
            } else if(status === 3) {
              statusName = "Ngừng chiếu";
            }
            movie.status = statusName;

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
          danger
          onClick={handleDelete}
          // disabled={!hasSelected}
          loading={loading}
          icon={<DeleteOutlined />}
          style={{ marginRight: "1rem" }}
        >
          Xóa
        </Button>
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
        rowSelection={{
          type:'checkbox',
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
          },
        }} 
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
