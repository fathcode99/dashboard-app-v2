import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportSiswa = ({ data }) => {
    const createDownLoadData = () => {
        handleExport().then((url) => {
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", url);
            downloadAnchorNode.setAttribute("download", "data_siswa.xlsx");
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
        const title = [{ A: "DATA SISWA" }, {}];

        let table1 = [
            {
                A: "No.",
                B: "Id Siswa",
                C: "Nama Orang Tua",
                D: "Alamat",
                E: "Nama Siswa",
                F: "Kelas",
                G: "Mata Pelajaran",
                H: "Jadwal Les",
                I: "Jam Mulai Les",
                J: "Mulai Les",
                K: "Jenis Bimble",
                L: "Status Siswa",
                M: "Email",
                N: "Kurikulum",
                O: "Telp", 
                P: "Gender Tentor",
                Q: "Program",
                R: "Status Pendaftaran",
                S: "Regional"

            },
        ];

        data.forEach((row) => {
            const dataSiswa = row;

            table1.push({
                A: "",
                B: dataSiswa.id_siswa,
                C: dataSiswa.nama_orangtua,
                D: dataSiswa.alamat,
                E: dataSiswa.nama_siswa,
                F: dataSiswa.kelas,
                G: dataSiswa.mapel,
                H: dataSiswa.jadwal_les,
                I: dataSiswa.jam_mulai_les,
                J: dataSiswa.mulai_les,
                K: dataSiswa.jenis_bimble,
                L: dataSiswa.status_siswa,
                M: dataSiswa.email,
                N: dataSiswa.kurikulum,
                O: dataSiswa.no_telp,
                P: dataSiswa.gender_tentor,
                Q: dataSiswa.program,
                R: dataSiswa.status_pendaftaran,
                S: dataSiswa.regional 
            });
        });

        // table1 = [{ A: "Data Members" }].concat(table1)

        const finalData = [...title, ...table1];

        const wb = XLSX.utils.book_new();

        const sheet = XLSX.utils.json_to_sheet(finalData, {
            skipHeader: true,
        });

        XLSX.utils.book_append_sheet(wb, sheet, "data_siswa");

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
            titleRange: "A1:S2",
            tbodyRange: `A3:S${finalData.length}`,
            theadRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:S${headerIndexes[0] + 1}`
                    : null,
            tFirstColumnRange:
                headerIndexes?.length >= 1
                    ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
                    : null,
            tLastColumnRange:
                headerIndexes?.length >= 1
                    ? `S${headerIndexes[0] + 1}:S${totalRecords + headerIndexes[0] + 1}`
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
                sheet.column("C").width(30);
                sheet.column("D").width(15);
                sheet.column("E").width(30);
                sheet.column("F").width(15);
                sheet.column("G").width(15);
                sheet.column("H").width(15);
                sheet.column("I").width(15);
                sheet.column("J").width(15);
                sheet.column("K").width(15);
                sheet.column("L").width(15);
                sheet.column("M").width(15);
                sheet.column("N").width(15);
                sheet.column("O").width(15);
                sheet.column("P").width(15);
                sheet.column("Q").width(15);
                sheet.column("R").width(25);
                sheet.column("S").width(15);

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
            title="Export Excel Data Siswa"
            onClick={() => {
                createDownLoadData();
            }}
            className='hover:text-sky-500 cursor-pointer flex justify-center items-center'>
            <span className="material-symbols-rounded dark:text-white">description</span>
        </div>
    );
};

export default ExcelExportSiswa;