import { useState } from 'react';
import { Form, Container, Pagination as BPagination } from 'react-bootstrap';
import { useImmer } from 'use-immer';
import AddModal from './AddModal';
import RenameModal from './RenameModal';
import RemoveModal from './RemoveModal';
import ResetModal from './ResetModal';

const tasksDB = [
  { id: 0, name: 'Test1' },
  { id: 1, name: 'Test2' },
  { id: 2, name: 'Test3' },
  { id: 3, name: 'Test4' },
  { id: 4, name: 'Test5' },
  { id: 5, name: 'Test6' },
  { id: 6, name: 'Test7' },
  { id: 7, name: 'Test8' },
  { id: 8, name: 'Test9' },
  { id: 9, name: 'Test10' },
  { id: 10, name: 'Test11' },
];

const pageFilters = [5, 10, 20, 50, 100];

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [modalState, setModalState] = useImmer({
    type: 'none',
    show: false,
    id: null,
  });
  const [tasks, setTasks] = useImmer(tasksDB);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

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
  const handleRemove = () => {
    if (modalState.id === null) return;
    setTasks((draft) => {
      const idx = draft.findIndex((task) => task.id === modalState.id);
      draft.splice(idx, 1);
    });
    handleCloseModal();
    setCurrentPage(1);
  };

  const handleOpenAddModal = () => {
    setModalState((draft) => {
      draft.show = true;
      draft.type = 'add';
    });
  };

  const handleCloseModal = () => {
    setModalState((draft) => {
      draft.show = false;
      draft.id = null;
    });
    setTimeout(() => {
      setModalState((draft) => {
        draft.type = 'none';
      });
    }, 100);
  };
  const handleAddTask = (name) => {
    setTasks((draft) => {
      draft.push({ id: draft.length, name });
    });
  };

  const handleOpenRenameModal = (id) => () => {
    setModalState((draft) => {
      draft.show = true;
      draft.type = 'rename';
      draft.id = id;
    });
  };

  const handleRenameTask = (name) => {
    setTasks((draft) => {
      draft[modalState.id].name = name;
    });
  };

  const handleOpenRemoveModal = (id) => {
    setModalState((draft) => {
      draft.show = true;
      draft.type = 'remove';
      draft.id = id;
    });
  };

  const handleOpenResetModal = () => {
    setModalState((draft) => {
      draft.show = true;
      draft.type = 'reset';
    });
  };
  const handleReset = () => {
    setTasks(tasksDB);
    setCurrentPage(1);
    handleCloseModal();
  };
  const renderModal = () => {
    switch (modalState.type) {
      case 'add':
        return <AddModal show={modalState.show} onHide={handleCloseModal} onAdd={handleAddTask} />;
      case 'rename':
        return (
          <RenameModal
            show={modalState.show}
            onHide={handleCloseModal}
            initialValue={tasks[modalState.id]?.name}
            onRename={handleRenameTask}
          />
        );
      case 'remove':
        return (
          <RemoveModal show={modalState.show} onHide={handleCloseModal} onRemove={handleRemove} />
        );
      case 'reset':
        return (
          <ResetModal show={modalState.show} onHide={handleCloseModal} onReset={handleReset} />
        );
      default:
        return null;
    }
  };

  const renderTasks = () => {
    return (
      <ul className="list-group mt-3">
        {tasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage).map((task) => {
          return (
            <li
              role="button"
              onClick={handleOpenRenameModal(task.id)}
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{task.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenRemoveModal(task.id);
                }}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
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
              <BPagination.Item key={id} active={id === currentPage} onClick={handlePage(id)}>
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
      <div className="mt-3 d-flex gap-3">
        <Form.Select
          value={tasksPerPage}
          onChange={(e) => {
            setCurrentPage(1);
            setTasksPerPage(e.target.value);
          }}
          aria-label="Default select example"
        >
          {pageFilters.map((filter) => {
            return (
              <option key={filter} value={filter}>
                {filter} paginated
              </option>
            );
          })}
        </Form.Select>
        <div className="btn-group">
          <button onClick={handleOpenAddModal} className="btn btn-success btn-sm float-end">
            Add
          </button>
          <button className="btn btn-danger btn-sm float-end" onClick={handleOpenResetModal}>
            Reset
          </button>
        </div>
      </div>
      {renderTasks()}
      {renderNav()}
      {renderModal()}
    </Container>
  );
};

export default Pagination;
