import { Button, Modal, Form } from 'react-bootstrap';

const RemoveModal = ({ show, onRemove, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="btn-block text-end">
          <Button variant="primary" className="me-2" onClick={onHide}>
            Close
          </Button>
          <Button onClick={onRemove} variant="danger" type="button">
            Remove
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
