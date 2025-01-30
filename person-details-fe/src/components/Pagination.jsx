import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ totalPersons, personsPerPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPersons / personsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        {pageNumbers.map((number) => (
          <Pagination.Item key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
