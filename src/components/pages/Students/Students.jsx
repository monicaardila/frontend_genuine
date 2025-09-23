import React, { useState, useEffect } from "react";
import "./Students.css";

const API_URL = import.meta.env.VITE_API_URL;

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ id: null, name: "", email: "", grade: "" });
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  // Obtener estudiantes al cargar
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setStudents(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear estudiante
  const handleAdd = async () => {
    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      fetchStudents();
      setForm({ id: null, name: "", email: "", grade: "" });
    }
  };

  // Editar estudiante
  const handleEdit = (student) => {
    setForm(student);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await fetch(`${API_URL}/students/${form.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    fetchStudents();
    setForm({ id: null, name: "", email: "", grade: "" });
    setIsEditing(false);
  };

  // Eliminar estudiante
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStudents();
  };

  // Filtrar estudiantes
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-container">
      <h2>Gestión de Estudiantes</h2>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="students-search"
      />

      <table className="students-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Grado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.grade}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(student)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(student.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron estudiantes</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="students-form">
        <h3>{isEditing ? "Editar estudiante" : "Agregar estudiante"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="grade"
          placeholder="Grado"
          value={form.grade}
          onChange={handleChange}
        />

        {isEditing ? (
          <button className="btn-update" onClick={handleUpdate}>
            Actualizar
          </button>
        ) : (
          <button className="btn-add" onClick={handleAdd}>
            Agregar
          </button>
        )}
      </div>
    </div>
  );
}

export default Students;
