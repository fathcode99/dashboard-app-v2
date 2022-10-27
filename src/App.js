import React from "react";
import ExcelExportHelper from "./component/ExcelExportHelper";

const STUDENT_DETAILS = [
  
    {
      id: 101,
      name: "Suman Kumar",
      parentName: "Suresh Kumar",
      classroom: "12th",
      subject: "Non Medical",
      division: "1st",
      status: "Pass",
    },
    {
      id: 102,
      name: "Rahul Kumar",
      parentName: "Aatma Ram",
      classroom: "12th",
      subject: "Non Medical",
      division: "1st",
      status: "Pass",
    },
    {
      id: 103,
      name: "Anuj Kumar",
      parentName: "Ashok Kumar",
      classroom: "12th",
      subject: "Non Medical",
      division: "1st",
      status: "Pass",
    }
];

const App = () => {
  return (
    <div style={{ padding: "30px" }}>
      <ExcelExportHelper data={STUDENT_DETAILS} />
      <h3>Student Details</h3>
      <table class="table table-bordered">
        <thead style={{ background: "yellow" }}>
          <tr>
            <th scope="col">Enrolment No.</th>
            <th scope="col">Student Name</th>
            <th scope="col">Parent Name</th>
            <th scope="col">Class</th>
            <th scope="col">Subject</th>
            <th scope="col">Division</th>
            <th scope="col">Result Status</th>
          </tr>
        </thead>
        <tbody>
          {STUDENT_DETAILS.map((studentsData) => (
            <tr>
              <td>
                <strong>{studentsData.id}</strong>{" "}
              </td>
              <td>{studentsData.name}</td>
              <td>{studentsData.parentName}</td>
              <td>{studentsData.classroom}</td>
              <td>{studentsData.subject}</td>
              <td>{studentsData.division}</td>
              <td>
                <strong>{studentsData.status}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;