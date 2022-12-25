/* eslint-disable */
import React, { useEffect } from "react";
 import MainLayout from "layout/MainLayout/MainLayout";
// import { Table } from "reactstrap";
// import { Button } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import useSummaryUser from "hook/useSummaryUser";
import useSummaryPost from "hook/useSummaryPost";
import useSummaryCase from "hook/useSummaryCase";

import { Chart as ChartJS, CategoryScale, LinearScale, LineElement,PointElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Line} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement,PointElement, Title, ArcElement, Tooltip, Legend);

export default function DashboardScreen() {
    const [users, summaryUser] = useSummaryUser();
    useEffect(() => {
        summaryUser();
    }, []);
    const [posts, summaryPost] = useSummaryPost();
    useEffect(() => {
        summaryPost();
    }, []);
    const [cases, summaryCase] = useSummaryCase();
    useEffect(() => {
        summaryCase();
    }, []);
  var dataUser = {
    labels: users?.key,
    datasets: [
      {
        label: `Users`,
        data: users?.value,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  var dataPost = {
    labels: posts?.map( x => x.date),
    datasets: [
      {
        label: `Posts`,
        data: posts?.map( x => x.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  var dataCase = {
    labels: cases?.map(x => x.date),
    datasets: [
      {
        label: `Cases`,
        data: cases?.map(x => x.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25
      }
    }
  };
 
  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Dasboard</h2>
        <div className="main" style={{marginLeft: '40px', marginRight: '40px'}}>
        <Pie data={dataUser} height={400} options={options} />
        </div>
        <div style={{marginTop: '10px', marginBottom: '100px'}}>
          <h2 style={{ textAlign: 'center' }}>User Chart</h2>
        </div>
        <div className="main" style={{marginLeft: '40px', marginRight: '40px'}}>
        <Line data={dataPost} height={400} width={1000} options={options} />
        </div>
        <div style={{marginTop: '10px', marginBottom: '100px'}}>
          <h2 style={{ textAlign: 'center' }}>Number of posts last 7 days</h2>
        </div>
        <div className="main" style={{marginLeft: '40px', marginRight: '40px'}}>
        <Line data={dataCase} height={400} width={1000} options={options} />
        </div>
        <div style={{marginTop: '10px', marginBottom: '100px'}}>
          <h2 style={{ textAlign: 'center' }}>Number of cases last 7 days</h2>
        </div>
      </div>
    </MainLayout>
  );
}
