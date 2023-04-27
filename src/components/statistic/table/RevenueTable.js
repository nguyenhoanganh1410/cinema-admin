import { Table, Tag } from "antd";
import useRevenueComponentHook from "../useRevenueComponentHook";
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Ngày",
    dataIndex: "createdAt",
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt )
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "totalDiscount",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "total",
  },
];

const columnsWithEmployee = [
  {
    title: "Mã nhân viên",
    dataIndex: "idEmployee",
  },
  {
    title: "Tên nhân viên",
    dataIndex: "name",
  },
  {
    title: "Ngày",
    dataIndex: "createdAt",
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt )
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "totalDiscount",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "total",
  },
];

const columnsCustomerStattits = [
  {
    title: "Mã KH",
    dataIndex: "idCustomer",
  },
  {
    title: "Tên KH",
    dataIndex: "name",
  },
  {
    title: "Rank",
    dataIndex: "rank",
    render: (rank) => {
      let color = "";
      if (rank === "START") {
        color = "green";
      }
      if (rank === "GOLD") {
        color = "gold";
      }
      if (rank === "SILVER") {
        color = "silver";
      }
      if (rank === "DIAMOND") {
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
    title: "Ngày",
    dataIndex: "createdAt",

    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt )
  },
  {
    title: "Số vé",
    dataIndex: "tickets",
   
    sorter: (a, b) => a.totalOrder - b.totalOrder
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
  },
  {
    title: "DS trước CK",
    dataIndex: "totalDiscount",
  },
  {
    title: "DS sau CK",
    dataIndex: "total",
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt )
  },
  {
    title: "Xã",
    dataIndex: "ward",
  },
  {
    title: "Phường",
    dataIndex: "district",
  },
  {
    title: "Tỉnh",
    dataIndex: "city",
  },
];


const columnsFilmStattits = [
  {
    title: "Mã phim",
    dataIndex: "idMovie",
  },
  {
    title: "Tên phim",
    dataIndex: "name",
  },
  {
    title: "Ngày",
    dataIndex: "createdAt",
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt )
  },
  {
    title: "Số vé",
    dataIndex: "tickets",
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "totalDiscount",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "total",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const RevenueTable = ({revenues, idStaff, tableType}) =>{
  if(tableType === 2) {
    return (
      <Table columns={columnsFilmStattits} dataSource={revenues} onChange={onChange} />
    );
  }
  if(tableType === 1){
    return (
      <Table   scroll={{
        x: 1024,
        
      }} columns={columnsCustomerStattits} dataSource={revenues} onChange={onChange} />
    );
  }
  return (
    <Table columns={idStaff ? columnsWithEmployee : columnsWithEmployee} dataSource={revenues} onChange={onChange} />
  );
}
export default RevenueTable;
