import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/api/projects`;

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const redirectToLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout?.();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!token) {
      redirectToLogin();
      return;
    }

    fetchProjects();
    fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL + "/getAll");
      const data = await res.json();
      setProjects(data.projects);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    redirectToLogin();
  };

  const allTasks = projects.flatMap((p) => p.tasks || []);
  const isOverdue = (date) => new Date(date) < new Date();

  return (
    <div className="min-h-screen bg-blue-50">

      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            PM
          </div>
          <h1 className="text-xl font-semibold text-blue-900">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">

          {/* Projects Button */}
          <Link to="/projects">
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200">
              Projects
            </button>
          </Link>

          {/* Profile */}
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <span className="text-sm text-blue-900">
              {user?.fullName || "User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          >
            <IoIosLogOut />
          </button>
        </div>
      </div>

      <div className="p-6">

        <div className="bg-blue-200 rounded-2xl p-6 flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">
              Today Task
            </h2>
            <p className="text-blue-700">
              Check your daily tasks and schedules
            </p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg">
              Today's schedule
            </button>
          </div>
          <div className="text-2xl">{new Date().toLocaleDateString()}</div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {projects.slice(0, 3).map((project) => {
            const total = project.tasks?.length || 1;
            const completed =
              project.tasks?.filter((t) => t.status === "completed")
                .length || 0;

            const progress = Math.round((completed / total) * 100);

            return (
              <div
                key={project._id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <h3 className="font-semibold text-lg text-blue-900">
                  {project.title}
                </h3>

                <div className="mt-3">
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm mt-1 text-gray-500">
                    Progress {progress}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* 📊 TASK PROGRESS */}
          <div className="bg-white p-6 rounded-xl shadow col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-blue-900">
              Tasks Progress
            </h3>

            <div className="flex items-end gap-3 h-40">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="bg-blue-500 w-6 rounded"
                    style={{
                      height: `${Math.random() * 100 + 20}px`,
                    }}
                  />
                  <span className="text-xs mt-1">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4 text-blue-900">
              Assignments ({allTasks.length})
            </h3>

            <div className="space-y-3">
              {allTasks.slice(0, 5).map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded ${task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4 text-red-600">
            Overdue Tasks
          </h3>

          {allTasks.filter((t) => isOverdue(t.dueDate)).length === 0 ? (
            <p className="text-gray-400">No overdue tasks 🎉</p>
          ) : (
            allTasks
              .filter((t) => isOverdue(t.dueDate))
              .map((task) => (
                <p key={task._id} className="text-sm text-red-500">
                  {task.title}
                </p>
              ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
