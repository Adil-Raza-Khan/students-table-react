import * as XLSX from "xlsx";

export const exportToExcel = (data) => {
  if (!data || data.length === 0) {
    alert("No student data available to export.");
    return;
  }

  // Map data to omit the internal 'id' property and use friendly column headers
  const formattedData = data.map(({ name, email, age }) => ({
    Name: name,
    Email: email,
    Age: age
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  XLSX.writeFile(workbook, "students.xlsx");

};