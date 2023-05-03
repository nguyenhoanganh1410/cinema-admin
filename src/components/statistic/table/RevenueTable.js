import useRevenueComponentHook from "../useRevenueComponentHook";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { fetchRevenueByShow } from "../../../services/StatitisFetch";
import { VND } from "../../../constant";
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Ngày",
    dataIndex: "createdAt",
    defaultSortOrder: "descend",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "totalDiscount",
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
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
    defaultSortOrder: "descend",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "totalDiscount",
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
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

    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    title: "Số vé",
    dataIndex: "tickets",

    sorter: (a, b) => a.totalOrder - b.totalOrder,
  },
  {
    title: "DS trước CK",
    dataIndex: "totalDiscount",
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
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
    defaultSortOrder: "descend",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
  {
    title: "Số vé",
    dataIndex: "tickets",
  },
  {
    title: "Doanh số trước chiết khấu",
    dataIndex: "totalDiscount",
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount",
  },
  {
    title: "Doanh số sau chiết khấu",
    dataIndex: "total",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ExpandedRowRender = ({ record }) => {
  const { createdAt, movie_id } = record;
  const columns = [
    {
      title: "Suất chiếu",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Ngày",
      dataIndex: "dateShow",
      key: "dateShow",
    },
    {
      title: "Số vé",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "DS trước CK",
      dataIndex: "totalDiscount",
      key: "totalDiscount",
    },
    {
      title: "Chiết khấu",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "DS sau CK",
      dataIndex: "total",
      key: "total",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRevenueByShow({
      date: createdAt,
      idMovie: movie_id,
    })
      .then((result) => {
        //console.log(result);
        const newData = result.map((val) => {
          return {
            ...val,
            dateShow: createdAt,
            discount: VND.format(val?.discount.toString()),
            totalDiscount: VND.format(val?.totalDiscount.toString()),
            total: VND.format(val?.total.toString()),
          };
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

const RevenueTable = ({ revenues, idStaff, tableType, setParamShow }) => {
  if (tableType === 2) {
    return (
      <Table
        columns={columnsFilmStattits}
        dataSource={revenues}
        onChange={onChange}
        expandable={{
          expandedRowRender: (record) => <ExpandedRowRender record={record} />,
          expandRowByClick: true,
          defaultExpandedRowKeys: ["0", "1"],
        }}
      />
    );
  }
  if (tableType === 1) {
    return (
      <Table
        scroll={{
          x: 1024,
        }}
        columns={columnsCustomerStattits}
        dataSource={revenues}
        onChange={onChange}
      />
    );
  }
  return (
    <Table
      columns={idStaff ? columnsWithEmployee : columnsWithEmployee}
      dataSource={revenues}
      onChange={onChange}
    />
  );
};
export default RevenueTable;
