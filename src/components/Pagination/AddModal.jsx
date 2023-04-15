import { useFormik } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useRef } from 'react';

const AddModal = ({ show, onAdd, onHide: hideHandler }) => {
  const inputRef = useRef(null);
  const onHideHandler = () => {
    hideHandler();
    f.resetForm();
  };
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [show]);
  const f = useFormik({
    initialValues: {
      name: '',
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length === 0) {
        errors.name = 'required';
      }
      return errors;
    },
    onSubmit: ({ name }) => {
      onAdd(name);
      onHideHandler();
    },
  });

  return (
    <Modal show={show} onHide={onHideHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Add task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="New task name"
              name="name"
              value={f.values.name}
              onChange={f.handleChange}
            />
          </Form.Group>
          <div className="btn-block text-end">
            <Button variant="primary" className="me-2" onClick={onHideHandler}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
