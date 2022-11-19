import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportAbsensi = ({ data }) => {
    const createDownLoadData = () => {
        handleExport().then((url) => {
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", url);
            downloadAnchorNode.setAttribute("download", "data_absensi.xlsx");
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
        const title = [{ A: "DATA ABSENSI" }, {}];

        let table1 = [
            {
                A: "No.",
                B: "ID Pengajar",
                C: "Tanggal",
                D: "Nama Pengajar",
                E: "Lembur",
                F: "Fee Pengajar",
                G: "Realisasi Fee Pengajar",
                H: "Biaya Fotokopi",
                I: "ID Siswa",
                J: "Nama Siswa",
                K: "Nama Orang Tua",
                L: "Regional",
                M: "Tagihan Siswa",
                N: "Realisasi Tagihan Siswa",
                O: "Biaya Pendaftaran", 
                P: "Realisasi Biaya Pendaftaran" 
            },
        ];

        data.forEach((row) => {
            const dataBiaya = row;

            table1.push({
                A: "",
                B: dataBiaya.id_pengajar,
                C: dataBiaya.created_at.slice(0, 10),
                D: dataBiaya.nama_pengajar,
                E: dataBiaya.durasi_lembur,
                F: dataBiaya.fee_pengajar,
                G: dataBiaya.realisasi_fee_pengajar,
                H: dataBiaya.biaya_fotokopi,
                I: dataBiaya.id_siswa,
                J: dataBiaya.nama_siswa,
                K: dataBiaya.nama_orang_tua,
                L: dataBiaya.regional,
                M: dataBiaya.tagihan_siswa,
                N: dataBiaya.realisasi_tagihan_siswa,
                O: dataBiaya.biaya_pendaftaran,
                P: dataBiaya.realisasi_biaya_pendaftaran
                
            });
        });

        // table1 = [{ A: "Data Members" }].concat(table1)

        const finalData = [...title, ...table1];

        const wb = XLSX.utils.book_new();

        const sheet = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true,
        });

        XLSX.utils.book_append_sheet(wb, sheet, "data_absensi");

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
            titleRange: "A1:P2",
            tbodyRange: `A3:P${finalData.length}`,
            theadRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:P${headerIndexes[0] + 1}`
                    : null,
            tFirstColumnRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
                    : null,
            tLastColumnRange:
                headerIndexes?.length >= 1
                    ? `P${headerIndexes[0] + 1}:P${totalRecords + headerIndexes[0] + 1}`
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
                sheet.column("B").width(15);
                sheet.column("C").width(20);
                sheet.column("D").width(30);
                sheet.column("E").width(15);
                sheet.column("F").width(15);
                sheet.column("G").width(30);
                sheet.column("H").width(20);
                sheet.column("I").width(15);
                sheet.column("J").width(30);
                sheet.column("K").width(30);
                sheet.column("L").width(15);
                sheet.column("M").width(20);
                sheet.column("N").width(30);
                sheet.column("O").width(20);
                sheet.column("P").width(30); 

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
            title="Export Excel Data Absensi"
            onClick={() => {
                createDownLoadData();
            }}
            className='hover:text-sky-500 cursor-pointer flex justify-center items-center'>
            <span className="material-symbols-rounded dark:text-white">description</span>
        </div>
    );
};

export default ExcelExportAbsensi;