import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Space, Badge } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import movieApi from "../../api/movieApi";
import promotionApi from "../../api/promotionApi";
import { setPromotionHeader } from "../../redux/actions";

import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";

const TablePromotionHeader = ({ setTab }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promotionHeaderList, setPromotionHeaderList] = useState([]);
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reload);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  //handle delete customer in here...
  const handleDelete = () => {
    showModal();
  };

  // //handle show details of promotion header
  // const handeShowDetailsPromotion = () => {
  //   dispatch(setPromotionHeader());
  //   setTab(1);
  // };

  //model
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

  useEffect(() => {
    //load
    const getListPromotionHeader = async () => {
      try {
        const response = await promotionApi.getPromotionHeader();
        if (response) {
          //handle data
          const newList = response.map((item) => {
            item.startDate = item.startDate.substring(0, 10);
            item.endDate = item.endDate.substring(0, 10);
            // if (item.statusPromotion) {
            //   item.statusPromotion = "Active";
            // } else {
            //   item.statusPromotion = "Disabled";
            // }
            item.statusPromotion = item.statusPromotion;

            return item;
          });
          setPromotionHeaderList(newList);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    getListPromotionHeader();
  }, [reload]);

  const handleOnclik = (id) => {
    //set id in headerId;
    dispatch(setPromotionHeader(id));
    setTab(1);
  };

  const columns = [
    {
      title: "Mã CT khuyễn mãi",
      dataIndex: "promotionCode",
    },
    {
      title: "Tên CT khuyễn mãi",
      dataIndex: "namePromotion",
      key: "name",
      render: (text, record) => (
        <a onClick={() => handleOnclik(record.id)}>{text}</a>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      render: (text) => {
        if (text?.length > 50) {
          return text?.substring(0, 50) + "...";
        } else {
          return text;
        }
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusPromotion",
      render: (text) => {
        if (text === true) {
          return <Badge status="success" text="Hoạt động" />;
        } else {
          return <Badge status="error" text="Ngưng hoạt đông" />;
        }
      },
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={promotionHeaderList} />
      <Modal
        title="Xóa bộ phim"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn xóa chương trình khuyến mãi này không?</p>
      </Modal>
    </div>
  );
};
export default TablePromotionHeader;
