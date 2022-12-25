// /* eslint-disable*/
import useFetchUserReports from "hook/useFetchUserReports";
import useBlockUser from "hook/useBlockUser";
import useRejectAllReport from "hook/useRejectAllReport";
import useAcceptReport from "hook/useAcceptReport";
import useRejectReport from "hook/useRejectReport";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import "./MerchantRequest.scss";

function ReportsDetail() {
  const [data, getUserReports] = useFetchUserReports();
  const { userId } = useParams();
  const [rejectAllReport] = useRejectAllReport();
  const [rejectReport, reloadWhenReject, isRejected] = useRejectReport();
  const [acceptReport, reloadWhenAccept, isAccepted] = useAcceptReport();
  const [blockUser] = useBlockUser();

  useEffect(() => {
    getUserReports(userId);
  }, [userId, reloadWhenAccept, reloadWhenReject]);

  if ((!data || !data[0]) && (isRejected || isAccepted)) {
    window.location.href = "/reports";
  }
  const tableReports = data?.map((report, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {index + 1}
        </th>
        <td>{report.type}</td>
        <td>{report.problem}</td>
        <td>{report.post?.content || report.comment?.content}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => acceptReport(report._id)}
          >
            Accept
          </button>
          <button
            className="btn btn-danger"
            onClick={() => rejectReport(report._id)}
          >
            Reject
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <h2>
          {data && data[0]
            ? `Reports (${data[0].reportedUser.firstName}#${data[0].reportedUser._id})`
            : "Reports"}
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            rejectAllReport(userId);
            window.location.href = "/reports";
          }}
        >
          Reject All
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            blockUser(userId);
            window.location.href = "/reports";
          }}
        >
          Block
        </button>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>Type</th>
                <th>Problem</th>
                <th style={{ width: "70%" }}>Content</th>
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
// STT User type content problem action
export default ReportsDetail;
