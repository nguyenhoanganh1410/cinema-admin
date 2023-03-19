import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Select, Badge, Tag } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import showApi from "../../api/showApi";
import showTimeApi from "../../api/showTimeApi";
import moment from "moment/moment";

const TableShowTime = ({ record }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listShow, setListShow] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [listShowTime, setListShowTime] = useState([]);

  const columns = [
    {
      title: "Ngày chiếu",
      dataIndex: "showDate",
    },
    {
      title: "Giờ chiếu",
      dataIndex: "showTime",
      render: (val) => {
        return val.map((item, index) => {
          let color = "";
          const timeCheck = moment(item, "HH:mm");

          if (
            timeCheck.isBetween(
              moment("06:00", "HH:mm"),
              moment("12:00", "HH:mm")
            )
          ) {
            color = "volcano";
          } else if (
            timeCheck.isBetween(
              moment("12:00", "HH:mm"),
              moment("18:00", "HH:mm")
            )
          ) {
            color = "green";
          } else if (
            timeCheck.isBetween(
              moment("18:00", "HH:mm"),
              moment("24:00", "HH:mm")
            )
          ) {
            color = "geekblue";
          }
          return (
            <Tag color={color} key={index}>
              {item}
            </Tag>
          );
        });
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (val) => {
        let color = "";
        let nameStatus = "";
        if (val === 1) {
          color = "green";
          nameStatus = "Đang chiếu";
        } else if (val === 2) {
          color = "blue";
          nameStatus = "Sắp chiếu";
        } else if (val === 3) {
          color = "red";
          nameStatus = "Đã kết thúc";
        }
        return (
          <Badge status={color} text={nameStatus} />
        );
      },
    },
    {
      dataIndex: "id",
      render: (val) => {
        return (
          <MinusCircleOutlined
            style={{
              color: "#ff4d4f",
              fontSize: "15px",
            }}
          />
        );
      },
      width: 30,
    },
  ];

  useEffect(() => {
    const fetchShowTimeByShowId = async () => {
      const response = await showTimeApi.getShowTimeByShowId(record.id);
      let data = [];
      if (response) {
        for (const index in response) {
          console.log(response[index]);
          data.push({
            showDate: index,
            showTime: response[index].map((item, index) => {
              return item.showTime;
            }),
            status: response[index][0].status,
          });
        }
      }
      setListShowTime(data);
    };

    fetchShowTimeByShowId();
  }, []);

  // const response = showTimeApi.getShowTimeByShowId(selectedId).then((res) => {
  //   let data = [];
  //   if (res) {
  //     for (const index in res) {
  //       data.push({
  //         showDate: index,
  //         showTime: res[index].map((item, index) => {
  //           return item.showTime;
  //         }),
  //       });
  //     }
  //   }
  //   return Promise.resolve(data);
  // });

  //     console.log('listShowTime', listShowTime);

  //   return <Table columns={columns} pagination={false} dataSource={listShowTime} />;
  // };

  const onSelectChange = (selectedId) => {
    setSelectedRowKeys(selectedId);
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

  // const handleOpenAddShow = () => {
  //   setShowModalAddCustomer(true);
  // };

  // //show chart
  // const handleShowChart = () => {
  //   setTab(1);
  // };

  useEffect(() => {
    //load movies
    const getListShow = async () => {
      try {
        const response = await showApi.getShow();
        console.log(response);
        //set user info
        if (response) {
          const data = response.map((item, index) => {
            let statusName = "";
            if (item.status === 1) {
              statusName = "Đang chiếu";
            } else if (item.status === 2) {
              statusName = "Sắp chiếu";
            } else if (item.status === 3) {
              statusName = "Đã kết thúc";
            }
            return {
              key: index,
              id: item.id,
              filmShow: item.Movie.nameMovie,
              startDate: item.startDate,
              endDate: item.endDate,
              locationShow: item.Cinema.name,
              roomShow: item.CinemaHall.name,
              status: statusName,
            };
          });

          setListShow(data);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    getListShow();
  }, []);

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Table columns={columns} dataSource={listShowTime} pagination={false} />
    </div>
  );
};
export default TableShowTime;
