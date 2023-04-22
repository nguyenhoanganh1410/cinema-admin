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

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const RevenueTable = ({revenues, idStaff}) =>{
  console.log(idStaff);
  return (
    <Table columns={idStaff ? columnsWithEmployee : columns} dataSource={revenues} onChange={onChange} />
  );
}
export default RevenueTable;
