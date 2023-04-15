import { useState, useEffect } from 'react';
import { Form, Container, Pagination as BPagination } from 'react-bootstrap';
import { useImmer } from 'use-immer';

import AddModal from './AddModal';
import RenameModal from './RenameModal';
import RemoveModal from './RemoveModal';
import ResetModal from './ResetModal';
import tasksDBCreator from './customData';

const tasksDB = tasksDBCreator(1000);

const pageFilters = [5, 10, 20, 50, 100];

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [tasks, setTasks] = useImmer(tasksDB);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const [modalState, setModalState] = useImmer({
    type: 'none',
    show: false,
    id: null,
  });
  useEffect(() => {
    const closeModalListener = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    const nextPageListener = (e) => {
      if (e.code === 'ArrowRight') {
        handleNext();
      }
    };
    const prevPageListener = (e) => {
      if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    const checkKeysListener = (e) => {
      console.log(`key: ${e.key}, code: ${e.code}, keyCode: ${e.keyCode}, which: ${e.which}`);
    };

    document.addEventListener('keydown', closeModalListener);
    document.addEventListener('keydown', nextPageListener);
    document.addEventListener('keydown', prevPageListener);
    document.addEventListener('keydown', checkKeysListener);
    return () => {
      document.removeEventListener('keydown', closeModalListener);
      document.removeEventListener('keydown', nextPageListener);
      document.removeEventListener('keydown', prevPageListener);
      document.removeEventListener('keydown', checkKeysListener);
    };
  }, [totalPages, tasksPerPage]);
  const handleNext = () => {
    setCurrentPage((prev) => {
      console.log({ totalPages, tasksPerPage });
      if (prev > totalPages - 1) return prev;
      return prev + 1;
    });
  };
  const handlePrev = () => {
    setCurrentPage((prev) => {
      if (prev < 2) return prev;
      return prev - 1;
    });
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
    // TODO: add dynamic rendering of pages
    const renderDynamicPages = () => {
      return (
        <>
          {currentPage > 5 && (
            <>
              <BPagination.Item onClick={handlePage(1)}>1</BPagination.Item>
              <BPagination.Ellipsis />
            </>
          )}
          {currentPage > 4 && (
            <BPagination.Item onClick={handlePage(currentPage - 4)}>
              {currentPage - 4}
            </BPagination.Item>
          )}
          {currentPage > 3 && (
            <BPagination.Item onClick={handlePage(currentPage - 3)}>
              {currentPage - 3}
            </BPagination.Item>
          )}
          {currentPage > 2 && (
            <BPagination.Item onClick={handlePage(currentPage - 2)}>
              {currentPage - 2}
            </BPagination.Item>
          )}
          {currentPage > 1 && (
            <BPagination.Item onClick={handlePage(currentPage - 1)}>
              {currentPage - 1}
            </BPagination.Item>
          )}
          <BPagination.Item active>{currentPage}</BPagination.Item>
          {currentPage < totalPages && (
            <BPagination.Item onClick={handlePage(currentPage + 1)}>
              {currentPage + 1}
            </BPagination.Item>
          )}
          {currentPage < totalPages - 1 && (
            <BPagination.Item onClick={handlePage(currentPage + 2)}>
              {currentPage + 2}
            </BPagination.Item>
          )}
          {currentPage < totalPages - 2 && (
            <BPagination.Item onClick={handlePage(currentPage + 3)}>
              {currentPage + 3}
            </BPagination.Item>
          )}
          {currentPage < totalPages - 3 && (
            <BPagination.Item onClick={handlePage(currentPage + 4)}>
              {currentPage + 4}
            </BPagination.Item>
          )}

          {currentPage < totalPages - 4 && (
            <>
              <BPagination.Ellipsis />
              <BPagination.Item onClick={handlePage(totalPages)}>{totalPages}</BPagination.Item>
            </>
          )}
        </>
      );
    };
    return (
      <div className="d-flex justify-content-center mt-3">
        <BPagination>
          <BPagination.Prev onClick={handlePrev} />
          {renderDynamicPages()}
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
