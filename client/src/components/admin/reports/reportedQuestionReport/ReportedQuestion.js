import React, { useEffect, useState } from "react";
import generatePDF from "./services/reportGenerator";
import ReportedQuestionsComponent from "./ReportedQuestionsComponent";
import axios from "axios";

const ReportedQuestion = () => {
  
  const [tickets, setTickets] = useState([]);
  
  const allTickets = []

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const response = await axios.get("/api/questions/AllQuestions");
        setTickets(response.data.questions);
      } catch (err) {
        console.log("error");
      }
    };
    getAllTickets();
  }, []);

  for(const ql of tickets){
    if(tickets.reports?.lenght!=0){
      allTickets.push(ql)
    }
  }

const reportTickets = tickets.filter(ticket => ticket.reports.length> 0);



  
  return (
    <div>
      <div className="rBody">
        <div className="rRow">
         
            <button
              className="btnOrange"
              onClick={() => generatePDF(reportTickets)}
            >
              Generate Report
            </button>
      
        </div>
      </div>
      <ReportedQuestionsComponent tickets={reportTickets} />
    </div>
  );
};

export default ReportedQuestion;