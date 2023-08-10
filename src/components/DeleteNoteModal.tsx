import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Note } from "../App"

type DeleteNoteModalProps = {
    show: boolean,
    handleClose: () => void
    note: Note
    deleteNote: (id: string) => void
}
 
const DeleteNoteModal = ({handleClose, show, note, deleteNote}: DeleteNoteModalProps) => {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this note?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
               <Stack gap={2}>
                    <Row key={note.id}>                    
                        <Col xs="auto">
                            <Button variant="outline-danger"
                                    onClick={() => deleteNote(note.id)}>Yes I wat to delete
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-secondary"
                                    onClick={() => handleClose()}>Cancel
                            </Button>
                        </Col>
                    </Row>
                </Stack> 
            </Form>
        </Modal.Body>
    </Modal>
}

export default DeleteNoteModal