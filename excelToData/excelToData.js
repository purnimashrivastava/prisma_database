const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const workbook = new ExcelJS.Workbook();

// Path to the Excel file
const excelFilePath = path.join(__dirname, '..', 'excelToData', 'data.xlsx');

workbook.xlsx.readFile(excelFilePath)
    .then(() => {
        const dataContentArray = [];

        // Iterate over all sheets in the workbook
        workbook.eachSheet((worksheet, sheetId) => {
            const data = [];
            const columnNames = [];
            const sheetName = worksheet.name; // Get the name of the worksheet

            // Extract column names from the first row
            worksheet.getRow(1).eachCell((cell) => {
                columnNames.push(cell.value);
            });

            // Iterate through rows starting from the second row
            worksheet.eachRow({ includeEmpty: false, firstRow: 2 }, (row, rowNumber) => {
                if (rowNumber !== 1) { // Skip the first row (header row)
                    const rowData = {};
                    // Iterate through cells in the row and assign values to corresponding column names
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        rowData[columnNames[colNumber - 1]] = cell.value; // Use column names as keys
                    });
                    data.push(rowData);
                }
            });

            // Push data content for the current sheet to the array
            dataContentArray.push(`const ${sheetName} = ${JSON.stringify(data, null, 2)};\n`);
        });

        // Write data to data.js file with content from all sheets in the prisma folder
        const dataContent = dataContentArray.join('\n');
        const prismaFolderPath = path.join('D:', 'phd-scheme', 'prisma');
        const dataFilePath = path.join(prismaFolderPath, 'data1.js');
        
        // Create prisma folder if it doesn't exist
        if (!fs.existsSync(prismaFolderPath)) {
            fs.mkdirSync(prismaFolderPath);
        }

        // Write data to data.js file
        fs.writeFileSync(dataFilePath, dataContent);

        console.log('Data converted successfully.');
    })
    .catch(error => {
        console.error('Error reading the Excel file:', error);
    });
