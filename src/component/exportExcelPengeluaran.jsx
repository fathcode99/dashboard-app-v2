import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportPengeluaran = ({ data }) => {
    const createDownLoadData = () => {
        handleExport().then((url) => {
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", url);
            downloadAnchorNode.setAttribute("download", "data_pengeluaran.xlsx");
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    };

    const workbook2blob = (workbook) => {
        const wopts = {
            bookType: "xlsx",
            bookSST: false,
            type: "binary",
        };

        const wbout = XLSX.write(workbook, wopts);

        // The application/octet-stream MIME type is used for unknown binary files.
        // It preserves the file contents, but requires the receiver to determine file type,
        // for example, from the filename extension.
        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream",
        });

        return blob;
    };

    const s2ab = (s) => {
        // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
        // create an ArrayBuffer with a size in bytes
        const buf = new ArrayBuffer(s.length);

        //create a 8 bit integer array
        const view = new Uint8Array(buf);

        //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i);
        }

        return buf;
    };

    const handleExport = () => {
        const title = [{ A: "DATA TOTAL PENGELUARAN" }, {}];

        let table1 = [
            {
                A: "No.", 
                B: "Keterangan",
                C: "Nominal" 
            },
        ];

        data.forEach((row) => {
            const dataTotal = row;

            table1.push({
                A: "",
                B: dataTotal.hal,
                C: dataTotal.nominal
            });
        });

        // table1 = [{ A: "Data Members" }].concat(table1)

        const finalData = [...title, ...table1];

        const wb = XLSX.utils.book_new();

        const sheet = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true,
        });

        XLSX.utils.book_append_sheet(wb, sheet, "data_pengeluaran");

        // binary large object
        // Since blobs can store binary data, they can be used to store images or other multimedia files.

        const workbookBlob = workbook2blob(wb);

        var headerIndexes = [];
        finalData.forEach((data, index) =>
            data["A"] === "No." ? headerIndexes.push(index) : null
        );

        const totalRecords = data.length;

        const dataInfo = {
            titleCell: "A2",
            titleRange: "A1:C2",
            tbodyRange: `A3:C${finalData.length}`,
            theadRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:C${headerIndexes[0] + 1}`
                    : null,
            tFirstColumnRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
                    : null,
            tLastColumnRange:
                headerIndexes?.length >= 1
                    ? `C${headerIndexes[0] + 1}:C${totalRecords + headerIndexes[0] + 1}`
                    : null,
        };

        return addStyle(workbookBlob, dataInfo);
    };

    const addStyle = (workbookBlob, dataInfo) => {
        return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
            workbook.sheets().forEach((sheet) => {
                sheet.usedRange().style({
                    fontFamily: "Arial",
                    verticalAlignment: "center",
                });

                
                sheet.column("A").width(5);
                sheet.column("B").width(30);
                sheet.column("C").width(20); 

                // TITLE
                sheet.range(dataInfo.titleRange).merged(true).style({
                    bold: true,
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                });

                // TEXT ALIGN CENTER SEMUA DATA
                if (dataInfo.tbodyRange) {
                    sheet.range(dataInfo.tbodyRange).style({
                        horizontalAlignment: "left",
                    });
                }

                // MEWARNAI SHEET HEAD
                sheet.range(dataInfo.theadRange).style({
                    fill: "0284c7",
                    bold: true,
                    horizontalAlignment: "center",
                });

                // CUSTOMISASI COLUMN PERTAMA
                if (dataInfo.tFirstColumnRange) {
                    sheet.range(dataInfo.tFirstColumnRange).style({
                        // bold: true,
                        horizontalAlignment: "center",
                    });
                }

                // CUSTOMISASI COLUMN TERAKHIT
                // if (dataInfo.tLastColumnRange) {
                //     sheet.range(dataInfo.tLastColumnRange).style({
                //         bold: true,
                //     });
                // }

            });

            return workbook
                .outputAsync()
                .then((workbookBlob) => URL.createObjectURL(workbookBlob));
        });
    };

    return (
        <div
            title="Export Excel Data Pengeluaran"
            onClick={() => {
                createDownLoadData();
            }}
            className='hover:text-sky-500 cursor-pointer flex justify-center items-center'>
            <span className="material-symbols-rounded dark:text-white">description</span>
        </div>
    );
};

export default ExcelExportPengeluaran;