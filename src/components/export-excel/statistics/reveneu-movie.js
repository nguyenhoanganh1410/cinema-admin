import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';
import statitisApi from '../../../api/statitisApi';
import { fetchRevenueByShow } from "../../../services/StatitisFetch";


export async function exportExcel (data, start_date, end_date) {
    const workbook = new ExcelJS.Workbook();
    const fontNormal = { name: 'Times New Roman', size: 11 };
    const fontBold = { name: 'Times New Roman', size: 11, bold: true };
    const fontTitle = { name: 'Times New Roman', size: 14, bold: true };
    const alignmentCenter = { vertical: 'middle', horizontal: 'center' };
    const alignmentLeft = { vertical: 'middle', horizontal: 'left' };
    const alignmentRight = { vertical: 'middle', horizontal: 'right' };
    const borderAll = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
    const borderTopBottom = { top: { style: 'thin' }, bottom: { style: 'thin' } };
    const borderTable = { bottom: { style: 'dotted', color: { argb: '#000000' } } }
    const borderBottom = { bottom: { style: 'thick' } };
    const borderBT = { bottom: { style: 'thin' }  }
    const borderRight = { right: { style: 'thin' } };
    const colorItem = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffe2efda' }};
    const borderTop = { top: { style: 'thin' } };
    const borderTopBottom_thick = { top: { style: 'thin' }, bottom: { style: 'thick' } };

    let row_index = 8;
    let id_curr;
    let total_revenue = 0;
    let total_revenue_before_discount = 0;
    let discount = 0;
    let count = 0;
    let index_curr = 1;


    const worksheet = workbook.addWorksheet
    ('DTBN_MV',{ 
        views: [{ showGridLines: false }],
        pageSetup: { paperSize: 9, orientation: 'landscape' },
        properties: { defaultColWidth: 20, defaultRowHeight: 30 },
    }); 
    worksheet.addRow(['Hệ thống rạp chiếu phim CMS'])
    worksheet.addRow(['04 Nguyễn Văn Bảo, phường 2, quận Gò Vấp, thành phố Hồ Chí Minh'])
    worksheet.addRow(['Ngày xuất báo cáo: ' + new Date().toLocaleDateString()])
    worksheet.addRow(['DOANH THU THEO PHIM'])
    worksheet.addRow(['Từ ngày: ' + start_date +"         "+' Đến ngày ' + end_date])
    worksheet.addRow([])
    worksheet.addRow(
        ['STT','Mã Phim', 'Tên Phim', 'Ngày','Số vé', 'Chiết khấu', 'Doanh số trước CK', 'Doanh số sau CK'],
    )
    // set font header
    worksheet.getRow(1).font = fontNormal;
    worksheet.getRow(2).font = fontNormal;
    worksheet.getRow(3).font = fontNormal;
    worksheet.getRow(4).font = fontTitle;
    worksheet.getRow(4).alignment = alignmentCenter;
    worksheet.getRow(4).height = 35;
    worksheet.getRow(5).font = fontNormal;
    worksheet.getRow(5).alignment = alignmentCenter;
    worksheet.getRow(7).font = fontBold;
    worksheet.getRow(7).height = 30;
    worksheet.getRow(7).alignment = alignmentCenter;
    // set border table header
    worksheet.getCell('A7').border = borderAll;
    worksheet.getCell('B7').border = borderAll;
    worksheet.getCell('C7').border = borderAll;
    worksheet.getCell('D7').border = borderAll;
    worksheet.getCell('E7').border = borderAll;
    worksheet.getCell('F7').border = borderAll;
    worksheet.getCell('G7').border = borderAll;
    worksheet.getCell('H7').border = borderAll;

    worksheet.mergeCells('A4:H4');
    worksheet.mergeCells('A5:H5');

    worksheet.columns = [
        { key: 'index', width: 5 },
        { key: 'id', width: 10 },
        { key: 'name', width: 35 },
        { key: 'date', width: 20 },
        { key: 'count', width: 10 },
        { key: 'discount', width: 25 },
        { key: 'revenueBeforeDiscount', width: 25 },
        { key: 'revenueAfterDiscount', width: 25 },
    ]

    for (let i = 0; i< data.length; i++) {
        const item = data[i]
        worksheet.addRow({
            index: index_curr,
            id: item?.idMovie,
            name: item?.name,
            date: moment(item.createdAt).format('DD/MM/YYYY'),
            count: item.tickets,
            discount: item.discount,
            revenueBeforeDiscount: item.totalDiscount,
            revenueAfterDiscount: item.total,
        })

        const val = worksheet.getCell(`B${row_index}`).value
        if (val) {
            worksheet.getCell(`A${row_index}`).fill = colorItem;
            worksheet.getCell(`B${row_index}`).fill = colorItem;
            worksheet.getCell(`C${row_index}`).fill = colorItem;
            worksheet.getCell(`D${row_index}`).fill = colorItem;
            worksheet.getCell(`E${row_index}`).fill = colorItem;
            worksheet.getCell(`F${row_index}`).fill = colorItem;
            worksheet.getCell(`G${row_index}`).fill = colorItem;
            worksheet.getCell(`H${row_index}`).fill = colorItem;

            worksheet.getCell(`A${row_index}`).alignment = alignmentCenter;
            worksheet.getCell(`B${row_index}`).alignment = alignmentCenter;

            worksheet.getCell(`B${row_index}`).font = fontNormal;
            worksheet.getCell(`C${row_index}`).font = fontNormal;
            worksheet.getCell(`D${row_index}`).font = fontNormal;
            worksheet.getCell(`E${row_index}`).font = fontNormal;
            worksheet.getCell(`F${row_index}`).font = fontNormal;
            worksheet.getCell(`G${row_index}`).font = fontNormal;
            worksheet.getCell(`H${row_index}`).font = fontNormal;

            worksheet.getCell(`E${row_index}`).numFmt = '#,##0';
            worksheet.getCell(`F${row_index}`).numFmt = '#,##0';
            worksheet.getCell(`G${row_index}`).numFmt = '#,##0';
            worksheet.getCell(`H${row_index}`).numFmt = '#,##0';

            count += item.tickets
            discount += item.discount
            total_revenue_before_discount += item.totalDiscount
            total_revenue += item.total
        }
        if ( i < data.length) {
            const show = await statitisApi.getRevenueByShow({
                date: item.createdAt,
                idMovie: item.idMovie
            })
            worksheet.addRow({
                index: '',
                id: '',
                name: '',
                date: 'Suất chiếu',
                count: 'Số vé',
                discount: 'CK',
                revenueBeforeDiscount: 'Doanh thu trước CK',
                revenueAfterDiscount: 'Doanh thu sau CK',
            }).font = fontBold;

            for (let i = 0; i < show.length; i++) {
                worksheet.addRow({
                    index: '',
                    id: '',
                    name:'',
                    date:  show[i].time,
                    count: show[i].count,
                    discount: show[i].discount,
                    revenueBeforeDiscount: show[i].totalDiscount,
                    revenueAfterDiscount: show[i].total,
                })
            }
            row_index += show.length + 1
        }

        worksheet.getCell(`A${row_index}`).border = borderBT;
        worksheet.getCell(`B${row_index}`).border = borderBT;
        worksheet.getCell(`C${row_index}`).border = borderBT;
        worksheet.getCell(`D${row_index}`).border = borderBT;
        worksheet.getCell(`E${row_index}`).border = borderBT;
        worksheet.getCell(`F${row_index}`).border = borderBT;
        worksheet.getCell(`G${row_index}`).border = borderBT;
        worksheet.getCell(`H${row_index}`).border = borderBT;

        

        worksheet.getCell(`A${row_index}`).font = fontNormal;
        worksheet.getCell(`B${row_index}`).font = fontNormal;
        worksheet.getCell(`C${row_index}`).font = fontNormal;
        worksheet.getCell(`D${row_index}`).font = fontNormal;
        worksheet.getCell(`E${row_index}`).font = fontNormal;
        worksheet.getCell(`F${row_index}`).font = fontNormal;
        worksheet.getCell(`G${row_index}`).font = fontNormal;
        worksheet.getCell(`H${row_index}`).font = fontNormal;

        worksheet.getCell(`E${row_index}`).numFmt = '#,##0';
        worksheet.getCell(`F${row_index}`).numFmt = '#,##0';
        worksheet.getCell(`G${row_index}`).numFmt = '#,##0';
        worksheet.getCell(`H${row_index}`).numFmt = '#,##0';

        worksheet.getCell(`A${row_index}`).alignment = alignmentCenter;
        worksheet.getCell(`B${row_index}`).alignment = alignmentCenter;

        worksheet.getRow(row_index).height = 20;

        row_index++
    }

    worksheet.addRow({
        index: 'Tổng cộng',
        name: '',
        date: '',
        count: count,
        discount: discount,
        revenueBeforeDiscount: total_revenue_before_discount,
        revenueAfterDiscount: total_revenue,
    }).font = fontBold;

    const val = worksheet.lastRow.number
    console.log('v',val)

    for (let i = 8; i <= val; i++) {
        worksheet.getRow(i).height = 20;
        worksheet.getRow(i).getCell(`A`).border = borderRight;
        worksheet.getRow(i).getCell(`B`).border = borderRight;
        worksheet.getRow(i).getCell(`C`).border = borderRight;
        worksheet.getRow(i).getCell(`D`).border = borderRight;
        worksheet.getRow(i).getCell(`E`).border = borderRight;
        worksheet.getRow(i).getCell(`F`).border = borderRight;
        worksheet.getRow(i).getCell(`G`).border = borderRight;
        worksheet.getRow(i).getCell(`H`).border = borderRight;
    }

    worksheet.lastRow.height = 20;
    worksheet.lastRow.alignment = { vertical: 'middle'};
    worksheet.lastRow.getCell(`A`).border = borderTopBottom_thick;
    worksheet.lastRow.getCell(`B`).border = borderTopBottom_thick;
    worksheet.lastRow.getCell(`C`).border = borderTopBottom_thick;
    worksheet.lastRow.getCell(`D`).border = borderTopBottom_thick;
    worksheet.lastRow.getCell(`E`).border = borderTopBottom_thick;
    worksheet.lastRow.getCell(`F`).border = borderTopBottom_thick;
    worksheet.lastRow.getCell(`G`).border = borderTopBottom_thick;
    worksheet.lastRow.getCell(`H`).border = borderTopBottom_thick;

    worksheet.lastRow.getCell(`F`).numFmt = '#,##0';
    worksheet.lastRow.getCell(`G`).numFmt = '#,##0';
    worksheet.lastRow.getCell(`H`).numFmt = '#,##0';

    const fileName = `DTBH_MV_${new Date().toLocaleDateString()}.xlsx`
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const xls64 = workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: fileType })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
    })
}