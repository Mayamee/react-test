import { Button, Modal } from 'react-bootstrap';

const ResetModal = ({ show, onReset, onHide }) => {
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
          <Button onClick={onReset} variant="danger" type="button">
            Reset
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResetModal;
