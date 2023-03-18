import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Tag, Image, Alert, Space, message,Badge } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined
} from "@ant-design/icons";
import customerApi from "../../api/customerApi";
import ModelAddCustomer from "./ModelAddCustomer";
import ModelDetailCustomer from "./ModelCustomerDetail";
import ModelPriceView from "./ModelPriceView";
import openAddressApi from "../../api/openApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";
import priceApi from "../../api/priceApi";

const TableCustomer = ({ setTab }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listCustomer, setListCustomer] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showModalDetailCustomer, setShowModalDetailCustomer] = useState(false);
  const [showModalPriceView, setShowModalPriceView] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

  const showModalDetail = (e) => {
    setTab(1);
  };

  const showModalPriceViewDetail = (e) => {
    setShowModalPriceView(true);
    setSelectedId(e);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      render: (val) => {
        return (
          <a
            onClick={() => {
              showModalDetail(val);
            }}
          >
            {val}
          </a>
        );
      },
    },
    {
      title: "Tên bảng giá",
      dataIndex: "name",
    },
    {
      title: "Mô tả ",
      dataIndex: "desc",
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
      dataIndex: "status",
      render: (status) => {
        console.log(status);
        let color ;
        let name;

        if (status === true ) {
          color = "green";
          name = "Đang hoạt động";
        } else if (status === false) {
          color = "red";
          name = "Ngừng hoạt động";
        }
        return (
          <Badge status={color} text={name} />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (val) => {
        
        return (
          <Button
            icon={<EyeOutlined />}
                onClick={() => {
                  showModalPriceViewDetail(val);
                }}
          >
          </Button>
        );
      },
    }

  ];

  useEffect(() => {
    //get list customer in here
    const fetchListCustomer = async () => {
      try {
        const data = await priceApi.getPriceHeader();
        setListCustomer(data.reverse());
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchListCustomer();
  }, [reload]);


  const handleShowDetail = (val) => {
    console.log(val);
  };


  //handle delete customer in here...
  const handleDelete = () => {
    showModal();
  };

  const handleRefresh = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
      setRefreshKey((oldKey) => oldKey + 1);
      message.success("Tải lại thành công");
    }, 1000);
  };

  //handle update customer in here ....
  const handleUpdate = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 500);
  };

  //model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const fetchDeleteCustomer = async () => {
      try {
        const response = await customerApi.deleteCustomer(selectedId);
        if (response == 1) {
          depatch(setReload(!reload));
        } else {
          setTimeout(() => {
            message.success("Xóa thất bại");
          }, 1000);
        }
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchDeleteCustomer();
    setTimeout(() => {
      message.success("Xóa thành công");
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
      </div>
      <Table
        columns={columns}
        dataSource={listCustomer}
        
      />
      <Modal
        title="Xóa khách hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn xóa khách hàng không?</p>
      </Modal>
      {showModalDetailCustomer ? (
        <ModelDetailCustomer
          showModalDetailCustomer={showModalDetailCustomer}
          setShowModalDetailCustomer={setShowModalDetailCustomer}
          selectedId={selectedId}
        />
      ) : null}

      {showModalPriceView ? (
        <ModelPriceView
          showModalPriceView={showModalPriceView}
          setShowModalPriceView={setShowModalPriceView}
          selectedId={selectedId}
        />
      ) : null}
      
    </div>
  );
};
export default TableCustomer;
