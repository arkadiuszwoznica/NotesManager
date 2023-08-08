import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import NewNote from "./pages/NewNote"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import useLocalStorage from "./hooks/useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  text: string
  tagIds: string[]
}

export type Note = {
  id: string
} & NoteData

export type NoteData ={
  title: string
  text: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}



function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes, 
        {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)},
      ]
    })
  }

  return (
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote}/>} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>}/>
          <Route path="edit" element={<h1>Edit</h1>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
