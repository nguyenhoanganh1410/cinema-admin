import { Table } from "antd";

const TableData = ({ data }) => {
    
    const columns = [
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'promotionCode',
        },
        {
            title: 'Tên khuyến mãi',
            dataIndex: 'desc',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
        },
        {
            title: 'Số lượng sử dụng',
            dataIndex: 'count',
            render: (val) => {
                return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        {
            title: 'Số tiền CK',
            dataIndex: 'discount',
            render: (val) => {
                if (val === 0) return "0";
                return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        {
            title: 'Ngân sách tổng',
            dataIndex: 'budget',
            render: (val) => {
                return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        {
            title: 'Ngân sách đã dùng',
            dataIndex: 'totalUsed',
            render: (val) => {
                return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        {
            title: 'Ngân sách còn lại',
            dataIndex: 'budgetLeft',
            render: (val) => {
                return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
        />
    );

};

export default TableData;