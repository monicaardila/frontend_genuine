import React, { useState, useEffect } from "react";
import "./StudentsPage.css";
import apiService from "../../../services/api";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [form, setForm] = useState({ id: null, name: "", email: "", grade: "", phone: "", address: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table, grid, cards

  // Obtener estudiantes al cargar
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await apiService.getStudents();
      console.log('API Response:', data);
      
      // Asegurar que data sea un array
      const studentsArray = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);
      setStudents(studentsArray);
      setError("");
    } catch (error) {
      console.error('Error fetching students:', error);
      setError("Error al cargar los estudiantes");
      setStudents([]); // Establecer array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear estudiante
  const handleAdd = async () => {
    if (!form.name || !form.email || !form.grade) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      await apiService.createStudent(form);
      await fetchStudents();
      setForm({ id: null, name: "", email: "", grade: "", phone: "", address: "" });
      setShowForm(false);
      setSuccess("Estudiante agregado exitosamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Error creating student:', error);
      
      // Manejar errores específicos
      if (error.response && error.response.status === 422) {
        const errorData = error.response.data;
        if (errorData.errors && errorData.errors.email) {
          setError(`Error: ${errorData.errors.email[0]}`);
        } else {
          setError(`Error de validación: ${errorData.message || 'Datos inválidos'}`);
        }
      } else if (error.response && error.response.status === 409) {
        setError("El email ya está registrado. Por favor usa un email diferente.");
      } else {
        setError("Error al crear el estudiante. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Editar estudiante
  const handleEdit = (student) => {
    setForm(student);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdate = async () => {
    if (!form.name || !form.email || !form.grade) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      await apiService.updateStudent(form.id, form);
      await fetchStudents();
      setForm({ id: null, name: "", email: "", grade: "", phone: "", address: "" });
      setIsEditing(false);
      setShowForm(false);
      setSuccess("Estudiante actualizado exitosamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Error updating student:', error);
      setError("Error al actualizar el estudiante");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar estudiante
  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar a ${name}?`)) {
      return;
    }

    setLoading(true);
    try {
      await apiService.deleteStudent(id);
      await fetchStudents();
      setSuccess("Estudiante eliminado exitosamente");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Error deleting student:', error);
      setError("Error al eliminar el estudiante");
    } finally {
      setLoading(false);
    }
  };

  // Ordenar estudiantes
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filtrar y ordenar estudiantes
  const filteredStudents = (Array.isArray(students) ? students : [])
    .filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.grade.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      
      if (sortDirection === "asc") {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    });

  // Paginación
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const resetForm = () => {
    setForm({ id: null, name: "", email: "", grade: "", phone: "", address: "" });
    setIsEditing(false);
    setShowForm(false);
    setError("");
  };

  return (
    <div className="students-page">
      {/* Header con navegación */}
      <header className="page-header">
        <div className="header-content">
          <div className="breadcrumb">
            <a href="/dashboard" className="breadcrumb-link">Dashboard</a>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current"> Estudiantes</span>
          </div>
          <div className="header-title">
            <h1>Gestión de Estudiantes</h1>
            <p>Sistema de administración escolar - Genuine School</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => window.location.href = '/dashboard'}>
            ← Volver al Dashboard
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="page-content">
        {/* Estadísticas */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <div className="stat-number">{students.length}</div>
              <div className="stat-label">Total Estudiantes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <div className="stat-number">{filteredStudents.length}</div>
              <div className="stat-label">Mostrando</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <div className="stat-number">{totalPages}</div>
              <div className="stat-label">Páginas</div>
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="alert alert-error">
            <div className="alert-icon"></div>
            <div className="alert-content">{error}</div>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <div className="alert-icon"></div>
            <div className="alert-content">{success}</div>
          </div>
        )}

        {/* Barra de herramientas */}
        <div className="toolbar-section">
          <div className="search-bar">
            <div className="search-icon"></div>
            <input
              type="text"
              placeholder="Buscar estudiantes por nombre, email o grado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="toolbar-actions">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Vista de tabla"
              >
                
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Vista de cuadrícula"
              >
                
              </button>
              <button 
                className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
                title="Vista de tarjetas"
              >
                
              </button>
            </div>
            
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
              disabled={loading}
            >
              <div className="btn-icon"></div>
              <div className="btn-text">Agregar Estudiante</div>
            </button>
            
            <button
              className="btn btn-secondary"
              onClick={fetchStudents}
              disabled={loading}
            >
              <div className="btn-icon"></div>
              <div className="btn-text">Actualizar</div>
            </button>
          </div>
        </div>

        {/* Contenido de estudiantes */}
        <div className="students-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <div className="loading-text">Cargando estudiantes...</div>
            </div>
          ) : (
            <>
              {viewMode === 'table' && (
                <div className="table-view">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("name")} className="sortable">
                          <div className="th-content">
                            <div className="th-icon"></div>
                            <div className="th-text">Nombre</div>
                            <div className="th-sort">{sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}</div>
                          </div>
                        </th>
                        <th onClick={() => handleSort("email")} className="sortable">
                          <div className="th-content">
                            <div className="th-icon"></div>
                            <div className="th-text">Email</div>
                            <div className="th-sort">{sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}</div>
                          </div>
                        </th>
                        <th onClick={() => handleSort("grade")} className="sortable">
                          <div className="th-content">
                            <div className="th-icon"></div>
                            <div className="th-text">Grado</div>
                            <div className="th-sort">{sortField === "grade" && (sortDirection === "asc" ? "↑" : "↓")}</div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <div className="th-icon"></div>
                            <div className="th-text">Teléfono</div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <div className="th-icon"></div>
                            <div className="th-text">Dirección</div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <div className="th-icon">⚙️</div>
                            <div className="th-text">Acciones</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.length > 0 ? (
                        currentStudents.map((student) => (
                          <tr key={student.id}>
                            <td className="student-name">
                              <div className="avatar">
                                {student.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="student-info">
                                <div className="student-name-text">{student.name}</div>
                                <div className="student-id">ID: {student.id}</div>
                              </div>
                            </td>
                            <td>
                              <div className="email-cell">
                                <div className="email-icon"></div>
                                <div className="email-text">{student.email}</div>
                              </div>
                            </td>
                            <td>
                              <span className="grade-badge">{student.grade}</span>
                            </td>
                            <td>
                              <div className="phone-cell">
                                <div className="phone-icon"></div>
                                <div className="phone-text">{student.phone || "—"}</div>
                              </div>
                            </td>
                            <td>
                              <div className="address-cell">
                                <div className="address-icon"></div>
                                <div className="address-text">{student.address || "—"}</div>
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="btn btn-sm btn-edit"
                                  onClick={() => handleEdit(student)}
                                  title="Editar"
                                >
                                  <div className="btn-icon"></div>
                                </button>
                                <button
                                  className="btn btn-sm btn-delete"
                                  onClick={() => handleDelete(student.id, student.name)}
                                  title="Eliminar"
                                >
                                  <div className="btn-icon"></div>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="no-data">
                            <div className="no-data-content">
                              <div className="no-data-icon"></div>
                              <div className="no-data-text">
                                {search ? "No se encontraron estudiantes que coincidan con la búsqueda" : "No hay estudiantes registrados"}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {viewMode === 'cards' && (
                <div className="cards-view">
                  {currentStudents.length > 0 ? (
                    <div className="cards-grid">
                      {currentStudents.map((student) => (
                        <div key={student.id} className="student-card">
                          <div className="card-header">
                            <div className="card-avatar">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="card-info">
                              <div className="card-name">{student.name}</div>
                              <div className="card-id">ID: {student.id}</div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="card-field">
                              <div className="field-icon"></div>
                              <div className="field-text">{student.email}</div>
                            </div>
                            <div className="card-field">
                              <div className="field-icon"></div>
                              <div className="field-text">{student.grade}</div>
                            </div>
                            {student.phone && (
                              <div className="card-field">
                                <div className="field-icon"></div>
                                <div className="field-text">{student.phone}</div>
                              </div>
                            )}
                            {student.address && (
                              <div className="card-field">
                                <div className="field-icon"></div>
                                <div className="field-text">{student.address}</div>
                              </div>
                            )}
                          </div>
                          <div className="card-actions">
                            <button
                              className="btn btn-sm btn-edit"
                              onClick={() => handleEdit(student)}
                            >
                               Editar
                            </button>
                            <button
                              className="btn btn-sm btn-delete"
                              onClick={() => handleDelete(student.id, student.name)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-data">
                      <div className="no-data-content">
                        <div className="no-data-icon"></div>
                        <div className="no-data-text">
                          {search ? "No se encontraron estudiantes que coincidan con la búsqueda" : "No hay estudiantes registrados"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pagination-section">
            <div className="pagination-info">
              Mostrando {startIndex + 1} - {Math.min(endIndex, filteredStudents.length)} de {filteredStudents.length} estudiantes
            </div>
            <div className="pagination-controls">
              <button
                className="btn btn-sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ← Anterior
              </button>
              <div className="page-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      className={`page-number ${page === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                className="btn btn-sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Formulario modal */}
      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <div className="modal-icon">{isEditing ? "" : ""}</div>
                <div className="modal-title-text">
                  {isEditing ? "Editar Estudiante" : "Agregar Estudiante"}
                </div>
              </div>
              <button className="close-btn" onClick={resetForm}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>
                  <div className="label-icon">👤</div>
                  <div className="label-text">Nombre *</div>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <div className="label-icon"></div>
                  <div className="label-text">Email *</div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <div className="label-icon"></div>
                  <div className="label-text">Grado *</div>
                </label>
                <input
                  type="text"
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  placeholder="Ej: 10° A, 11° B"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <div className="label-icon"></div>
                  <div className="label-text">Teléfono</div>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+57 300 123 4567"
                />
              </div>
              <div className="form-group">
                <label>
                  <div className="label-icon"></div>
                  <div className="label-text">Dirección</div>
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Dirección completa"
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={resetForm}>
                <div className="btn-icon"></div>
                <div className="btn-text">Cancelar</div>
              </button>
              {isEditing ? (
                <button className="btn btn-warning" onClick={handleUpdate} disabled={loading}>
                  <div className="btn-icon">{loading ? "" : ""}</div>
                  <div className="btn-text">Actualizar</div>
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleAdd} disabled={loading}>
                  <div className="btn-icon">{loading ? "" : ""}</div>
                  <div className="btn-text">Agregar</div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentsPage;
