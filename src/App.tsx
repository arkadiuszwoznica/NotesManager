import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import NewNote from "./pages/NewNote"
import NotesList from"./pages/NotesList"
import NoteLayout from "./components/NotesContainer"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import useLocalStorage from "./hooks/useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import NoteShowpage from "./pages/NoteShowpage"
import EditNote from "./pages/EditPage"

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

  const onCreateNote = ({tags, ...data}: NoteData) => {
    setNotes(prevNotes => {
      return [
        ...prevNotes, 
        {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)},
      ]
    })
  }

  const onUpdateNote = (id: string, {tags, ...data}: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag => tag.id)} 
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return {...tag, label} 
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<NotesList availableTags={tags} notes={notesWithTags}
                                            updateTag={updateTag}
                                            deleteTag={deleteTag}/>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} 
                                            onAddTag={addTag} 
                                            availableTags={tags}/>} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<NoteShowpage onDelete={onDeleteNote}/>}/>
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} 
                                            onAddTag={addTag} 
                                            availableTags={tags}/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  ) 
}

export default App
