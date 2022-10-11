import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const DoctorScheduleReportGenerator = (docSchedule) => {
  
  //console.log("🚀 ~ file: reportGenerator.js ~ line 9 ~ generatePDF ~ schedules", docSchedule)

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Day", "Start Time", "End Time", "Location"];

  // define an empty array of rows
  const tableRows = [];


  // for each ticket pass all its data into an array
  docSchedule.doctorSchedules.forEach(schedule => {
        const scheduleData = [
          schedule._id,
          schedule.day,
          schedule.startTime ,
          schedule.endTime ,
          schedule.location

          // called date-fns to format the date on the ticket
          //format(new Date(ticket.updatedat), "yyyy-MM-dd")
        ];
        // push each tickcet's info into a row
        tableRows.push(scheduleData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // ticket title. and margin-top + margin-left
  doc.text( "Dr." + docSchedule.doctorDetails.name + "'s Doctor Schedule Report", 14, 15);
  // we define the name of our PDF file.
  doc.save(`Dr.${docSchedule.doctorDetails.name}_Doctor_Schedules_Report_.pdf`);
};

export default DoctorScheduleReportGenerator;