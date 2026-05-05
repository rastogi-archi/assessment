
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const API_URL = (import.meta.env.VITE_API_URL || "") + "/api/projects";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    fetchProjects();

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL + "/getAll");
      const data = await res.json();
      setProjects(data.projects);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async () => {
    if (!form.title.trim()) return;

    try {
      await fetch(API_URL + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      fetchProjects();
      setForm({ title: "", description: "" });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (project) => {
    setEditProject(project);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await fetch(`${API_URL}/${editProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editProject),
      });

      fetchProjects();
      setEditOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-50">

      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-900">Project Manager</h1>

        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200">
              Dashboard
            </button>
          </Link>

          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              {user?.name?.charAt(0) || "U"}
            </div>
            <span className="text-sm text-blue-900">
              {user?.name || "User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className=" text-gray px-3 py-2 text-2xl"
          >
            <IoIosLogOut />
          </button>
        </div>
      </div>

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">
              Your Projects
            </h2>
            <p className="text-gray-500">{projects.length} total</p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed rounded-2xl bg-white text-center">
            <div className="text-6xl mb-4">📂</div>
            <h2 className="text-xl font-semibold text-blue-900">
              No projects yet
            </h2>
            <p className="text-gray-500 mt-2">
              Create your first project
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p._id}
                className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition border"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {p.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  {p.description || "No description"}
                </p>

                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-blue-600 text-sm hover:cursor-pointer border border-black px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500 text-sm hover:cursor-pointer border border-black px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isOpen && (
          <Modal
            title="Create Project"
            form={form}
            setForm={setForm}
            onClose={() => setIsOpen(false)}
            onSubmit={handleAddProject}
            btnText="Create"
          />
        )}

        {editOpen && (
          <Modal
            title="Edit Project"
            form={editProject}
            setForm={setEditProject}
            onClose={() => setEditOpen(false)}
            onSubmit={handleUpdate}
            btnText="Update"
          />
        )}
      </div>
    </div>
  );
};

const Modal = ({ title, form, setForm, onClose, onSubmit, btnText }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">

        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {btnText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Projects;