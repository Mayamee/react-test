import { useState } from "react";
import { Form, Container, Pagination as BPagination } from "react-bootstrap";

const tasks = [
  { id: 0, name: "Test1" },
  { id: 1, name: "Test2" },
  { id: 2, name: "Test3" },
  { id: 3, name: "Test4" },
  { id: 4, name: "Test5" },
  { id: 5, name: "Test6" },
  { id: 6, name: "Test7" },
  { id: 7, name: "Test8" },
  { id: 8, name: "Test9" },
  { id: 9, name: "Test10" },
  { id: 10, name: "Test11" },
];

const pageFilters = [5, 10, 20, 50, 100];

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const handleNext = () => {
    if (currentPage > totalPages - 1) return;
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
		if (currentPage === 1) return;
		setCurrentPage((prev) => prev - 1);
	};
  const handlePage = (id) => () => {
    setCurrentPage(id);
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const renderTasks = () => {
    return (
      <ul className="list-group mt-3">
        {tasks
          .slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)
          .map((task) => {
            return (
              <li key={task.id} className="list-group-item">
                {task.name}
              </li>
            );
          })}
      </ul>
    );
  };
  const renderNav = () => {
    return (
      <div className="d-flex justify-content-center mt-3">
        <BPagination>
          <BPagination.Prev onClick={handlePrev} />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((id) => {
            return (
              <BPagination.Item
                key={id}
                active={id === currentPage}
                onClick={handlePage(id)}
              >
                {id}
              </BPagination.Item>
            );
          })}
          <BPagination.Next onClick={handleNext} />
        </BPagination>
      </div>
    );
  };
  return (
    <Container>
      <div className="mt-3">
        <Form.Select
          value={tasksPerPage}
          onChange={(e) => setTasksPerPage(e.target.value)}
          aria-label="Default select example"
        >
          {pageFilters.map((filter) => {
            return (
              <option key={filter} value={filter}>
                {filter}
              </option>
            );
          })}
        </Form.Select>
      </div>
      {renderTasks()}
      {renderNav()}
    </Container>
  );
};

export default Pagination;
