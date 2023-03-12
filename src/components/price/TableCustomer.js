import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Tag, Image, Alert, Space, message } from "antd";
import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import customerApi from "../../api/customerApi";
import ModelAddCustomer from "./ModelAddCustomer";
import ModelDetailCustomer from "./ModelCustomerDetail";
import openAddressApi from "../../api/openApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";

const TableCustomer = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listCustomer, setListCustomer] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showModalDetailCustomer, setShowModalDetailCustomer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);

  const showModalDetail = (e) => {
    setShowModalDetailCustomer(true);
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
      title: "Họ và Tên",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (rank) => {
        let color = "green";
        if (rank === "Start") {
          color = "green";
        }
        if (rank === "Gold") {
          color = "gold";
        }
        if (rank === "Silver") {
          color = "silver";
        }
        if (rank === "Diamond") {
          color = "blue";
        }
        return (
          <Tag color={color} key={rank}>
            {rank?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => <Image width={50} src={image} />,
    },
  ];

  useEffect(() => {
    //get list customer in here
    const fetchListCustomer = async () => {
      try {
        const response = await customerApi.getCustomers();

        const data = await Promise.all(
          response.map(async (item, index) => {
            const ward = await openAddressApi.getWardByCode(item.ward_id);
            const district = await openAddressApi.getDistrictByCode(
              item.district_id
            );
            const city = await openAddressApi.getProvinceByCode(item.city_id);
            item.ward_id = ward.name;
            item.district_id = district.name;
            item.city_id = city.name;
            return {
              key: index,
              id: item.id,
              name: `${item.firstName} ${item.lastName}`,
              phone: item.phone,
              address: ` ${item?.ward_id + " /"} ${item?.district_id + " /"} ${
                item?.city_id
              }`,
              email: item.email,
              dob: item.dob,
              rank: item.Rank?.nameRank,
              image: item.image,
            };
          })
        );
        setListCustomer(data.reverse());
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchListCustomer();
  }, [reload]);

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
          onClick={handleRefresh}
          loading={loading}
          icon={<ReloadOutlined />}
          style={{ marginRight: "1rem" }}
        >
          Làm mới
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
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          onSelect: (record) => {
            setSelectedId(record.id);
          },
        }}
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
    </div>
  );
};
export default TableCustomer;
