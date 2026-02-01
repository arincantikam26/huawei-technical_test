import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [view, setView] = useState("welcome");
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    joinDate: "",
    releaseDate: "",
    experience: "",
    salary: "",
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      const result = await response.json();
      setEmployees(result.data || []);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    if (view === "list") fetchEmployees();
  }, [view]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        experience: Number(formData.experience),
        salary: Number(formData.salary),
      };

      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Error: " + result.error);
        return;
      }

      alert("Employee saved successfully!");
      setFormData({
        name: "", position: "", joinDate: "", releaseDate: "", experience: "", salary: ""
      });
      setView("list");
    } catch (err) {
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  return (
    <div className="app-container">
      {/* Welcome Screen */}
      {view === "welcome" && (
        <div className="welcome-screen">
          <h1>Welcome to Employee System</h1>
          <p>Manage your employee data efficiently</p>
          <button className="start-btn" onClick={() => setView("menu")}>
            Get Started
          </button>
        </div>
      )}

      {/* Menu Screen */}
      {view === "menu" && (
        <div className="menu-screen">
          <h1>Employee Management</h1>
          <div className="menu-options">
            <div className="menu-option" onClick={() => setView("form")}>
              <h3>Add Employee</h3>
              <p>Register new employee data</p>
            </div>
            <div className="menu-option" onClick={() => setView("list")}>
              <h3>View Employees</h3>
              <p>See all employee records</p>
            </div>
          </div>
          <button className="back-btn" onClick={() => setView("welcome")}>
            Back to Welcome
          </button>
        </div>
      )}

      {/* Form Screen */}
      {view === "form" && (
        <div className="form-screen">
          <h2>Employee Registration</h2>
          <form className="employee-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Position <span className="required">*</span></label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Join Date</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Experience (Years) <span className="required">*</span></label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Salary <span className="required">*</span></label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                className="back-btn"
                onClick={() => setView("menu")}
              >
                Back to Menu
              </button>
              <button
                type="submit"
                className="save-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Employee"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List Screen */}
      {view === "list" && (
        <div className="list-screen">
          <div className="list-header">
            <h2>Employee List</h2>
            <button className="add-btn" onClick={() => setView("form")}>
              + Add New
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : employees.length === 0 ? (
            <div className="loading">No employees found</div>
          ) : (
            <>
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Salary</th>
                    <th>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.position}</td>
                      <td>{emp.experience} years</td>
                      <td>Rp {emp.salary.toLocaleString()}</td>
                      <td>{formatDate(emp.joinDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="table-actions">
                <button className="back-btn" onClick={() => setView("menu")}>
                  Back to Menu
                </button>
                <button className="add-btn" onClick={fetchEmployees}>
                  Refresh
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}