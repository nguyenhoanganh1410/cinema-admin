import { Table } from "antd";
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Ngày",
    dataIndex: "date",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "total",

    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "actual",
    sorter: (a, b) => a.age - b.age,
  },
];
const data = [
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },

  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
  {
    key: Math.random().toString(),
    date: "22/04/2022",
    discount: 10000,
    total: 900000,
    actual: 890000,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const RevenueTable = () => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);
export default RevenueTable;
