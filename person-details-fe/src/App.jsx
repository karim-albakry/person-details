import { useState, useEffect } from "react";
import axios from "axios";
import FilterForm from "./components/FilterForm.jsx";
import PersonTable from "./components/PersonTable.jsx";
import Pagination from "./components/Pagination.jsx";
import { Spinner } from "react-bootstrap";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]); // Store filtered data separately
  const [filters, setFilters] = useState({ name: "", phone: "", address: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const personsPerPage = 5;

  useEffect(() => {
    fetchPersons();
  }, []); // Fetch data only on mount

  useEffect(() => {
    applyFilters();
  }, [filters, persons]); // Apply filters when filters change

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/person-details`);
      setPersons(response.data);
      setFilteredPersons(response.data); // Initially, filtered data is the same as full data
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    const trimmedFilters = {
      name: filters.name.trim(),
      phone: filters.phone.trim(),
      address: filters.address.trim(),
      country: filters.country.trim(),
    };
    
    const filteredData = persons.filter(person =>
      (trimmedFilters.name
      ? person["first name"].toLowerCase().includes(trimmedFilters.name.toLowerCase()) ||
        person["last name"].toLowerCase().includes(trimmedFilters.name.toLowerCase())  
      : true) &&
    (trimmedFilters.phone ? person["telephone number"].includes(trimmedFilters.phone) : true) &&
    (trimmedFilters.address ? person["address"].toLowerCase().includes(trimmedFilters.address.toLowerCase()) : true) &&
    (trimmedFilters.country ? person["country"].toLowerCase().includes(trimmedFilters.country.toLowerCase()) : true)
  );

    setFilteredPersons(filteredData);
    setCurrentPage(1); // Reset to first page when filters change
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
