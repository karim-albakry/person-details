import { useState, useEffect } from "react";
import axios from "axios";
import FilterForm from "./components/FilterForm.jsx";
import PersonTable from "./components/PersonTable.jsx";
import Pagination from "./components/Pagination.jsx";
import { Spinner } from "react-bootstrap";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filters, setFilters] = useState({ name: "", phone: "", address: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const personsPerPage = 5;

  // Fetch data on mount
  useEffect(() => {
    fetchPersons();
  }, []);

  // Fetch data whenever filters change
  useEffect(() => {
    fetchPersons();
  }, [filters]);

  const fetchPersons = async () => {
    setLoading(true);
    try {
      // Construct query parameters based on filters
      const params = new URLSearchParams();
      if (filters.name) params.append("name", filters.name);
      if (filters.phone) params.append("phone", filters.phone);
      if (filters.address) params.append("address", filters.address);
      if (filters.country) params.append("country", filters.country);

      // Send request with query parameters
      const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || window.VITE_BACKEND_URL || "http://localhost:3000/api";
      const response = await axios.get(`${API_BASE_URL}/person-details?${params.toString()}`);


      // Avoid unnecessary re-renders
      if (JSON.stringify(response.data) !== JSON.stringify(persons)) {
        setPersons(response.data);
        setFilteredPersons(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Pagination logic
  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = filteredPersons.slice(indexOfFirstPerson, indexOfLastPerson);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Person Details</h1>
      <FilterForm filters={filters} setFilters={setFilters} fetchPersons={fetchPersons} />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <PersonTable persons={currentPersons} />
          <Pagination totalPersons={filteredPersons.length} personsPerPage={personsPerPage} setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  );
}
