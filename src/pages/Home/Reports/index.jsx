// /* eslint-disable*/
import useFetchReportsSummary from "hook/useFetchReportsSummary";
import useBlockUser from "hook/useBlockUser";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./MerchantRequest.scss";

function Reports() {
  const [data, getReportsSummary] = useFetchReportsSummary();
  const [blockUser, reload] = useBlockUser();

  useEffect(() => {
    getReportsSummary();
  }, [reload]);

  const tableReports = data?.map((report, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {index + 1}
        </th>
        <td>
          {report.firstName} {report.lastName}
        </td>
        <td>{report.totalReport}</td>
        <td>{report.totalReportingUser}</td>
        <td>
          {report.firstDate} &gt; {report.lastDate}
        </td>
        <td>
          <button
            className="btn btn-success"
            onClick={() =>
              (window.location.href = `/reports/${report.reportedUserId}`)
            }
          >
            View
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger"
            onClick={() => blockUser(report.reportedUserId)}
          >
            Block
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Reports Management</h2>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>User Name</th>
                <th>Total Reports</th>
                <th>Reported By</th>
                <th>From - To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{tableReports}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default Reports;
