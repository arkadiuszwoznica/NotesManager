import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import {NewNote} from "./pages/NewNote"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"


function App() {

  return (
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="/new" element={<NewNote/>} />
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
