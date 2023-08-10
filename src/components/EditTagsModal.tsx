import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../App"

type EditTagsModalProps = {
    show: boolean,
    _availableTags: Tag[],
    handleClose: () => void
    deleteTag: (id: string) => void
    updateTag: (id: string, label: string) => void
}
 
const EditTagsModal = ({_availableTags, handleClose, show, updateTag, deleteTag }: EditTagsModalProps) => {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
               <Stack gap={2}>
                {_availableTags.map(tag => (
                    <Row key={tag.id}>
                        <Col>
                            <Form.Control type="text" value={tag.label}
                                        onChange={event => updateTag(tag.id, event.target.value)}/>
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-danger"
                                    onClick={() => deleteTag(tag.id)}>&times;
                            </Button>
                        </Col>
                    </Row>
                ))}
                </Stack> 
            </Form>
        </Modal.Body>
    </Modal>
}

export default EditTagsModal