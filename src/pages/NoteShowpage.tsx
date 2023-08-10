import {Button, Stack, Row, Col, Badge} from "react-bootstrap"
import {useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import {useNote} from "../hooks/useNote"
import DeleteNoteModal from "../components/DeleteNoteModal"

type NoteProps = {
    onDelete: (id: string) => void
}

const NoteShowpage = ({onDelete}: NoteProps) => {
    const note = useNote()
    const navigate = useNavigate()
    const [deleteNoteModalIsOpen, setDeleteNoteModalIsOpen] = useState(false)


    return <>
        <Row className="align-items-center mb-4">
            <Col>
            <h1>{note.title}</h1>
            {note.tags.length > 0 && (<Stack gap={1} direction="horizontal" 
                    className="flex-wrap">
                {note.tags.map(tag => (
                    <Badge className="text-truncates"key={tag.id}>{tag.label}</Badge>
                ))}
            </Stack>)}
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to={`/${note.id}/edit`}>
                        <Button variant="primary">Edit</Button>
                    </Link> 
                    <Button variant="outline-danger" onClick={() => setDeleteNoteModalIsOpen(true)
                        }>Delete</Button>
                    <Link to="/">
                        <Button variant="outline-secondary">Home</Button>
                    </Link> 
                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>
            {note.text}
        </ReactMarkdown>
        <DeleteNoteModal show={deleteNoteModalIsOpen}
                        handleClose={() => setDeleteNoteModalIsOpen(false)}
                        deleteNote={() => {
                            onDelete(note.id) 
                            navigate("/")}}
                        note={note}/>
    </>
}

export default NoteShowpage