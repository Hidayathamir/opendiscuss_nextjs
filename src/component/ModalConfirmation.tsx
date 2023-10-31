import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

interface IModalConfirmation {
  show: boolean
  handleClose: () => void
  body: string
  onConfirm: () => void
}

export default function ModalConfirmation(prop: IModalConfirmation) {
  return (
    <Modal show={prop.show} onHide={prop.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Opendiscuss</Modal.Title>
      </Modal.Header>
      <Modal.Body>{prop.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={prop.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={prop.onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
