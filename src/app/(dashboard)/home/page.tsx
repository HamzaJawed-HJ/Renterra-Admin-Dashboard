"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import dayjs from "dayjs";
import { Line, Pie } from "react-chartjs-2";





// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,

);

const Home: React.FC = () => {
  const [stats, setStats] = useState({
    users: [] as any[],
    renters: [] as any[],
    products: [] as any[],
    requests: [] as any[],
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const [usersRes, rentersRes, productsRes, requestsRes] = await Promise.all([
          fetch("http://localhost:3000/api/admin/getAllUsers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3000/api/admin/getAllRenter", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3000/api/admin/getAllProductsWithOwnerDetails", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3000/api/admin/getAllRenterRequest", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usersData = await usersRes.json();
        const rentersData = await rentersRes.json();
        const productsData = await productsRes.json();
        const requestsData = await requestsRes.json();

        setStats({
          users: Array.isArray(usersData.renters) ? usersData.renters : [],
          renters: Array.isArray(rentersData.owners) ? rentersData.owners : [],
          products: Array.isArray(productsData.products) ? productsData.products : [],
          requests: Array.isArray(requestsData.rentalRequests) ? requestsData.rentalRequests : [],
          loading: false,
        });
      } catch {
        setStats((s) => ({ ...s, loading: false }));
      }
    };
    fetchStats();
  }, []);

  const chartOptions = (title: string) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  });

  const groupByDate = (items: any[]) => {
    const dateMap: Record<string, number> = {};
    items.forEach((item) => {
      const date = dayjs(item.createdAt).format("DD MM");
      dateMap[date] = (dateMap[date] || 0) + 1;
    });
    const sortedDates = Object.keys(dateMap).sort((a, b) =>
      dayjs(a, "DD MM").isAfter(dayjs(b, "DD MM")) ? 1 : -1
    );
    return {
      labels: sortedDates,
      data: sortedDates.map((d) => dateMap[d]),
    };
  };

  const userStats = groupByDate(stats.users);
  const renterStats = groupByDate(stats.renters);
  const productStats = groupByDate(stats.products);

  const usersChart = {
    labels: userStats.labels,
    datasets: [
      {
        label: "Users",
        data: userStats.data,
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const rentersChart = {
    labels: renterStats.labels,
    datasets: [
      {
        label: "Renters",
        data: renterStats.data,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#6366f1",
      },
    ],
  };

  const productsChart = {
    labels: productStats.labels,
    datasets: [
      {
        label: "Products",
        data: productStats.data,
        borderColor: "#f59e42",
        backgroundColor: "rgba(245,158,66,0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#f59e42",
      },
    ],
  };

  // Pie chart data for requests
  const statusCounts = {
    accepted: 0,
    rejected: 0,
    pending: 0,
  };

  stats.requests.forEach((req) => {
    const status = (req.status || "pending").toLowerCase();
    if (status === "accepted") statusCounts.accepted++;
    else if (status === "rejected") statusCounts.rejected++;
    else statusCounts.pending++;
  });

  const pieData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        label: "Request Status",
        data: [
          statusCounts.accepted,
          statusCounts.rejected,
          statusCounts.pending,
        ],
        backgroundColor: ["#10b981", "#ef4444", "#f97316"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {

    responsive: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const data = context.chart.data.datasets[0].data;
          const total = data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-emerald-600 text-4xl font-bold">
            {stats.loading ? "-" : stats.users.length}
          </span>
          <span className="mt-2 text-gray-600 font-medium">Users</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-indigo-600 text-4xl font-bold">
            {stats.loading ? "-" : stats.renters.length}
          </span>
          <span className="mt-2 text-gray-600 font-medium">Renters</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-orange-500 text-4xl font-bold">
            {stats.loading ? "-" : stats.products.length}
          </span>
          <span className="mt-2 text-gray-600 font-medium">Products</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-red-500 text-4xl font-bold">
            {stats.loading ? "-" : stats.requests.length}
          </span>
          <span className="mt-2 text-gray-600 font-medium">Requests</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <Line data={usersChart} options={chartOptions("Users")} height={100} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <Line data={rentersChart} options={chartOptions("Renters")} height={100} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <Line data={productsChart} options={chartOptions("Products")} height={100} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-center mb-4 text-gray-700">
            Requests Status
          </h2>
          <Pie data={pieData} options={pieOptions} height={300} width={500} />
        </div>
      </div>

    </div>
  );
};

export default Home;
