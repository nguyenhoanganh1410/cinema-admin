import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Space } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import movieApi from "../../api/movieApi";
import promotionApi from "../../api/promotionApi";
import { setPromotionHeader } from "../../redux/actions";

const TablePromotionHeader = ({ setTab }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promotionHeaderList, setPromotionHeaderList] = useState([]);
  const dispatch = useDispatch();
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
            if (item.statusPromotion) {
              item.statusPromotion = "Active";
            } else {
              item.statusPromotion = "Disabled";
            }
            return item;
          });
          setPromotionHeaderList(newList);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    getListPromotionHeader();
  }, []);

  const handleOnclik = (id) => {
    //set id in headerId;
    dispatch(setPromotionHeader(id));
    setTab(1);
  };

  const columns = [
    {
      title: "T??n CT khuy???n m??i",
      dataIndex: "namePromotion",
      key: "name",
      render: (text, record) => (
        <a onClick={() => handleOnclik(record.id)}>{text}</a>
      ),
    },
    {
      title: "M?? t???",
      dataIndex: "title",
    },
    {
      title: "Ng??y b???t ?????u",
      dataIndex: "startDate",
    },
    {
      title: "Ng??y k???t th??c",
      dataIndex: "endDate",
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "statusPromotion",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

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
          X??a
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
        dataSource={promotionHeaderList}
      />
      <Modal
        title="X??a b??? phim"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>B???n mu???n x??a ch????ng tr??nh khuy???n m??i n??y kh??ng?</p>
      </Modal>
    </div>
  );
};
export default TablePromotionHeader;
