import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const PersonTable = ({ persons }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPersons = [...persons].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key]?.toString().toLowerCase() || "";
    const valueB = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const getSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          {["first name", "last name", "telephone code", "telephone number", "address", "country"].map((col) => (
            <th key={col} onClick={() => requestSort(col)} style={{ cursor: "pointer" }}>
              {col.charAt(0).toUpperCase() + col.slice(1)} {getSortIcon(col)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedPersons.length > 0 ? (
          sortedPersons.map((person, index) => (
            <tr key={index}>
              <td>{person["first name"]}</td>
              <td>{person["last name"]}</td>
              <td>{person["telephone code"]}</td>
              <td>{person["telephone number"]}</td>
              <td>{person["address"]}</td>
              <td>{person["country"]}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No data found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PersonTable;
