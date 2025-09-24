import React, { useState, useEffect } from "react";
import "./StudentsPageProfessional.css";
import apiService from "../../../services/api";
import { 
  FiUsers, 
  FiSearch, 
  FiPlus, 
  FiRefreshCw, 
  FiEdit2, 
  FiTrash2, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiBook,
  FiUser,
  FiGrid,
  FiList,
  FiEye,
  FiArrowLeft,
  FiChevronUp,
  FiChevronDown,
  FiX,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
  FiBookOpen
} from "react-icons/fi";

function StudentsPageProfessional() {
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
  const [viewMode, setViewMode] = useState("table");

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
    <div className="students-page-professional">
      {/* Header con navegación */}
      <header className="page-header">
        <div className="header-content">
          <div className="breadcrumb">
            <a href="/dashboard" className="breadcrumb-link">
              <FiArrowLeft className="breadcrumb-icon" />
              Dashboard
            </a>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Estudiantes</span>
          </div>
          <div className="header-title">
            <h1>Gestión de Estudiantes</h1>
            <p>Sistema de administración escolar - Genuine School</p>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="page-content">
        {/* Estadísticas */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>
            <div className="stat-content">
              <div className="stat-number">{students.length}</div>
              <div className="stat-label">Total Estudiantes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiSearch />
            </div>
            <div className="stat-content">
              <div className="stat-number">{filteredStudents.length}</div>
              <div className="stat-label">Mostrando</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiBookOpen />
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalPages}</div>
              <div className="stat-label">Páginas</div>
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className="alert alert-error">
            <FiAlertCircle className="alert-icon" />
            <div className="alert-content">{error}</div>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <FiCheckCircle className="alert-icon" />
            <div className="alert-content">{success}</div>
          </div>
        )}

        {/* Barra de herramientas */}
        <div className="toolbar-section">
          <div className="search-bar">
            <FiSearch className="search-icon" />
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
                <FiList />
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Vista de cuadrícula"
              >
                <FiGrid />
              </button>
              <button 
                className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
                title="Vista de tarjetas"
              >
                <FiEye />
              </button>
            </div>
            
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
              disabled={loading}
            >
              <FiPlus className="btn-icon" />
              <span className="btn-text">Agregar Estudiante</span>
            </button>
            
            <button
              className="btn btn-secondary"
              onClick={fetchStudents}
              disabled={loading}
            >
              <FiRefreshCw className="btn-icon" />
              <span className="btn-text">Actualizar</span>
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
                            <FiUser className="th-icon" />
                            <span className="th-text">Nombre</span>
                            <div className="th-sort">
                              {sortField === "name" && (sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                            </div>
                          </div>
                        </th>
                        <th onClick={() => handleSort("email")} className="sortable">
                          <div className="th-content">
                            <FiMail className="th-icon" />
                            <span className="th-text">Email</span>
                            <div className="th-sort">
                              {sortField === "email" && (sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                            </div>
                          </div>
                        </th>
                        <th onClick={() => handleSort("grade")} className="sortable">
                          <div className="th-content">
                            <FiBook className="th-icon" />
                            <span className="th-text">Grado</span>
                            <div className="th-sort">
                              {sortField === "grade" && (sortDirection === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <FiPhone className="th-icon" />
                            <span className="th-text">Teléfono</span>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <FiMapPin className="th-icon" />
                            <span className="th-text">Dirección</span>
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <FiEdit2 className="th-icon" />
                            <span className="th-text">Acciones</span>
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
                                <FiMail className="email-icon" />
                                <span className="email-text">{student.email}</span>
                              </div>
                            </td>
                            <td>
                              <span className="grade-badge">{student.grade}</span>
                            </td>
                            <td>
                              <div className="phone-cell">
                                <FiPhone className="phone-icon" />
                                <span className="phone-text">{student.phone || "—"}</span>
                              </div>
                            </td>
                            <td>
                              <div className="address-cell">
                                <FiMapPin className="address-icon" />
                                <span className="address-text">{student.address || "—"}</span>
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="btn btn-sm btn-edit"
                                  onClick={() => handleEdit(student)}
                                  title="Editar"
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  className="btn btn-sm btn-delete"
                                  onClick={() => handleDelete(student.id, student.name)}
                                  title="Eliminar"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="no-data">
                            <div className="no-data-content">
                              <FiBookOpen className="no-data-icon" />
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
                              <FiMail className="field-icon" />
                              <span className="field-text">{student.email}</span>
                            </div>
                            <div className="card-field">
                              <FiBook className="field-icon" />
                              <span className="field-text">{student.grade}</span>
                            </div>
                            {student.phone && (
                              <div className="card-field">
                                <FiPhone className="field-icon" />
                                <span className="field-text">{student.phone}</span>
                              </div>
                            )}
                            {student.address && (
                              <div className="card-field">
                                <FiMapPin className="field-icon" />
                                <span className="field-text">{student.address}</span>
                              </div>
                            )}
                          </div>
                          <div className="card-actions">
                            <button
                              className="btn btn-sm btn-edit"
                              onClick={() => handleEdit(student)}
                            >
                              <FiEdit2 />
                              <span>Editar</span>
                            </button>
                            <button
                              className="btn btn-sm btn-delete"
                              onClick={() => handleDelete(student.id, student.name)}
                            >
                              <FiTrash2 />
                              <span>Eliminar</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-data">
                      <div className="no-data-content">
                        <FiBookOpen className="no-data-icon" />
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
                <div className="modal-icon">
                  {isEditing ? <FiEdit2 /> : <FiPlus />}
                </div>
                <div className="modal-title-text">
                  {isEditing ? "Editar Estudiante" : "Agregar Estudiante"}
                </div>
              </div>
              <button className="close-btn" onClick={resetForm}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>
                  <FiUser className="label-icon" />
                  <span className="label-text">Nombre *</span>
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
                  <FiMail className="label-icon" />
                  <span className="label-text">Email *</span>
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
                  <FiBook className="label-icon" />
                  <span className="label-text">Grado *</span>
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
                  <FiPhone className="label-icon" />
                  <span className="label-text">Teléfono</span>
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
                  <FiMapPin className="label-icon" />
                  <span className="label-text">Dirección</span>
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
                <FiX className="btn-icon" />
                <span className="btn-text">Cancelar</span>
              </button>
              {isEditing ? (
                <button className="btn btn-warning" onClick={handleUpdate} disabled={loading}>
                  <FiSave className="btn-icon" />
                  <span className="btn-text">Actualizar</span>
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleAdd} disabled={loading}>
                  <FiPlus className="btn-icon" />
                  <span className="btn-text">Agregar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentsPageProfessional;
