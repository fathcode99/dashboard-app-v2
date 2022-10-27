// sheet.column("A").width(15);
//         sheet.column("B").width(15);
//         sheet.column("C").width(15);
//         sheet.column("E").width(15);
//         sheet.column("G").width(15);

//         sheet.range(dataInfo.titleRange).merged(true).style({
//           bold: true,
//           horizontalAlignment: "center",
//           verticalAlignment: "center",
//         });

//         if (dataInfo.tbodyRange) {
//           sheet.range(dataInfo.tbodyRange).style({
//             horizontalAlignment: "center",
//           });
//         }

//         sheet.range(dataInfo.theadRange).style({
//           fill: "FFFD04",
//           bold: true,
//           horizontalAlignment: "center",
//         });

//         if (dataInfo.theadRange1) {
//           sheet.range(dataInfo.theadRange1).style({
//             fill: "808080",
//             bold: true,
//             horizontalAlignment: "center",
//             fontColor: "ffffff",
//           });
//         }

//         if (dataInfo.tFirstColumnRange) {
//           sheet.range(dataInfo.tFirstColumnRange).style({
//             bold: true,
//           });
//         }

//         if (dataInfo.tLastColumnRange) {
//           sheet.range(dataInfo.tLastColumnRange).style({
//             bold: true,
//           });
//         }

//         if (dataInfo.tFirstColumnRange1) {
//           sheet.range(dataInfo.tFirstColumnRange1).style({
//             bold: true,
//           });
//         }

//         if (dataInfo.tLastColumnRange1) {
//           sheet.range(dataInfo.tLastColumnRange1).style({
//             bold: true,
//           });
//         }