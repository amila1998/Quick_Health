import React from "react";
import { Link } from "react-router-dom";
const QuestionsByLabelComponent = ({ questionsObject }) => {

  // a function that assigns bootstrap styling classes based on 
  // the status of the ticket
  // const assignColorToTicketStatus = ticket => {
  //   if (ticket.status === "completed") {
  //     return "p-3 mb-2 bg-success text-white";
  //   } else if (ticket.status === "in_progress") {
  //     return "p-3 mb-2 bg-warning text-dark";
  //   } else if (ticket.status === "opened") {
  //     return "p-3 mb-2 bg-light text-dark";
  //   }
  // };
  return (
    <div id="rBody">
      {questionsObject.filterQuestions.length === 0 ? (
        "You currently have no questions created by this label"
      ) : (
        <div className="rTBody">
        <table id="rTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Count of Replies</th>
              <th>Created Date</th>
              <th>Updated Date</th>



            </tr>
          </thead>
          <tbody>
            {questionsObject.filterQuestions.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket._id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.replies.length}</td>
                <td>{ticket.createdAt}</td>
                <td>{ticket.updatedAt}</td>
                

              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default QuestionsByLabelComponent;