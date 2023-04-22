import { Table } from "antd";
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
    dataIndex: "total",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "totalDiscount",
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
    dataIndex: "total",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "totalDiscount",
  },
];

const columnsCustomerStattits = [
  {
    title: "Mã khách hàng",
    dataIndex: "idCustomer",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
  },
  {
    title: "SĐT khách hàng",
    dataIndex: "phone",
  },
  {
    title: "Số vé",
    dataIndex: "tickets",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.totalOrder - b.totalOrder
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "total",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "totalDiscount",
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt )
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
    dataIndex: "total",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "totalDiscount",
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
      <Table columns={columnsCustomerStattits} dataSource={revenues} onChange={onChange} />
    );
  }
  return (
    <Table columns={idStaff ? columnsWithEmployee : columns} dataSource={revenues} onChange={onChange} />
  );
}
export default RevenueTable;
