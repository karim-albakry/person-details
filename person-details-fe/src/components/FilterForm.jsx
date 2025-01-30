const FilterForm = ({ filters, setFilters, fetchPersons }) => {
  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPersons();
  };

  const handleClearFilters = () => {
    setFilters({ name: "", phone: "", address: "", country: "" });
    fetchPersons();
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-3">
      <div className="col-md-3">
        <input type="text" name="name" value={filters.name} onChange={handleInputChange} placeholder="Name" className="form-control" />
      </div>
      <div className="col-md-3">
        <input type="text" name="phone" value={filters.phone} onChange={handleInputChange} placeholder="Phone" className="form-control" />
      </div>
      <div className="col-md-3">
        <input type="text" name="address" value={filters.address} onChange={handleInputChange} placeholder="Address" className="form-control" />
      </div>
      <div className="col-md-3">
        <input type="text" name="country" value={filters.country} onChange={handleInputChange} placeholder="Country" className="form-control" />
      </div>
      <div className="col-md-12 text-center">
        <button type="submit" className="btn btn-primary me-2">Search</button>
        <button type="button" className="btn btn-secondary" onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </form>
  );
};

export default FilterForm;
