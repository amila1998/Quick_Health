import React from "react";
import { Link } from "react-router-dom";
import './style.css'
const ReportedQuestionsComponent = ({ tickets }) => {

  // a function that assigns bootstrap styling classes based on 
  // the status of the ticket
  const assignColorToTicketStatus = ticket => {
    if (ticket.status === "completed") {
      return "p-3 mb-2 bg-success text-white";
    } else if (ticket.status === "in_progress") {
      return "p-3 mb-2 bg-warning text-dark";
    } else if (ticket.status === "opened") {
      return "p-3 mb-2 bg-light text-dark";
    }
  };
  return (
    <div id="rBody">
      {tickets.length === 0 ? (
        "You currently have no tickets created"
      ) : (
        <div className="rTBody">
        <table id="rTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Reports</th>



            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket._id}</td>
                <td>{ticket.title}</td>
                <td><>
                <thead>
                        <tr>
                          <th>Uesr ID</th>
                          <th>User Name</th>
                          <th>Message</th>
                          <th>Reported Date</th>
                        </tr>
                        </thead>
                  {
                    ticket.reports.map(r => (
                        <tbody key={r.userID}>
                        <td>{r.userID}</td>
                        <td>{r.userName}</td>
                        <td>{r.message}</td>
                        <td>{r.reportedDate}</td>
                        </tbody>
                    ))
                  }

                </></td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default ReportedQuestionsComponent;