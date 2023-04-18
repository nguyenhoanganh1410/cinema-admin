import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Space, Badge } from "antd";
import promotionApi from "../../api/promotionApi";
import { setPromotionHeader } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";
import moment from "moment";

const TablePromotionHeader = ({ setTab, valueStatusPick, searchText }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promotionHeaderList, setPromotionHeaderList] = useState([]);

  const [promotionHeaderListTmp, setPromotionHeaderListTmp] = useState([]);
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reload);

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
          console.log(response);
          //handle data
          const sortRes = response.sort((a, b) => {
            return moment(b.startDate).diff(a.startDate);
          });
          const newList = sortRes.map((item) => {
            item.startDate = item.startDate.substring(0, 10);
            item.endDate = item.endDate.substring(0, 10);
            item.statusPromotion = item.statusPromotion;
            return item;
          });
          setPromotionHeaderListTmp(newList);
          setPromotionHeaderList(newList);
        }
      } catch (error) {
        console.log("Failed to login ", error);
      }
    };
    getListPromotionHeader();
  }, [reload]);

  useEffect(() => {
    if (valueStatusPick === 2) {
      const newArr = promotionHeaderListTmp.filter((val) => {
        return val?.statusPromotion === true;
      });
      setPromotionHeaderList(newArr);
      return;
    } else if (valueStatusPick === 3) {
      const newArr = promotionHeaderListTmp.filter((val) => {
        return val?.statusPromotion === false;
      });
      setPromotionHeaderList(newArr);
      return;
    }
    setPromotionHeaderList(promotionHeaderListTmp);
  }, [valueStatusPick]);

  useEffect(() => {
    if(!searchText){
      setPromotionHeaderList(promotionHeaderListTmp);
      return;
    }
    const newArr = promotionHeaderListTmp.filter((val) => {
      return val?.promotionCode.toLowerCase().search(searchText.toLowerCase()) !== -1
    });
    setPromotionHeaderList(newArr);
  }, [searchText]);

  const handleOnclik = (id) => {
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
        <a
          style={{ textTransform: "capitalize" }}
          onClick={() => handleOnclik(record.id)}
        >
          {text.toLowerCase()}
        </a>
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
    },
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
