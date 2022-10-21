import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const DrugReportGenerator = (drugs) => {
  
  //console.log("🚀 ~ file: reportGenerator.js ~ line 9 ~ generatePDF ~ drugs", drugs)

  // initialize jsPDF
  const doc = new jsPDF();
  const addFooters = doc => {
    const pageCount = doc.internal.getNumberOfPages()
  
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
        align: 'center'
      })
    }
  }
  // define the columns we want and their titles
  const tableColumn = ["Id", "Drug Name", "Drug Quantity", "Description","DrugPrice"];

  // define an empty array of rows
  const tableRows = [];


  // for each ticket pass all its data into an array
  drugs.forEach(drug => {
        const drugData = [
          drug._id,
          drug.DrugName,
          drug.DrugQuantity ,
          drug.Description,
          drug.DrugPrice


          // called date-fns to format the date on the ticket
          //format(new Date(ticket.updatedat), "yyyy-MM-dd")
        ];
        // push each tickcet's info into a row
        tableRows.push(drugData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // ticket title. and margin-top + margin-left
  doc.text( "Quick Health",7,8);
  doc.text( "Drug Report", 14, 15);
  addFooters(doc);
  // we define the name of our PDF file.
  doc.save("Drug__Report_.pdf");
};

export default DrugReportGenerator;