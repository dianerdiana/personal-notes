import React, { useEffect, useState } from 'react'

import { Container, Alert, Row, Col } from 'react-bootstrap'

import NoteCard from '../components/NoteCard'
import SearchCard from '../components/SearchCard'
import ModalCreateNote from '../components/ModalCreateNote'

import { getInitialData } from '../utils'

function Notepad() {
  const [show, setShow] = useState(false)
  const [data, setData] = useState(getInitialData)
  const [childData, setChildData] = useState(null)
  const [message, setMessage] = useState(null)
  const [filteredResult, setFilteredResult] = useState([])
  const [q, setQ] = useState('')

  const handleDelete = (id) => {
    setData(data.filter((note) => note.id !== id))
  }

  const setArchived = (id) => {
    const editStatus = data.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: true,
        }
      }

      return note
    })
    setData(editStatus)
  }

  const removeArchived = (id) => {
    const editStatus = data.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: false,
        }
      }

      return note
    })
    setData(editStatus)
  }

  const handleSearch = (q) => {
    if (q !== '') {
      setFilteredResult(
        data.filter((note) =>
          note.title.toUpperCase().includes(q.toUpperCase())
        )
      )
    } else {
      setFilteredResult([])
    }
  }

  useEffect(() => {
    function inputData() {
      const isExist = data.some((note) => note.id === childData?.id)

      if (isExist) {
        return
      } else if (childData) {
        setData(data.concat(childData))
      }
    }

    inputData()
    handleSearch(q)
  }, [childData, data.length, q])

  return (
    <Container>
      {message && (
        <Alert variant='success' className='mt-2'>
          {message}
        </Alert>
      )}
      <SearchCard show={() => setShow(true)} setQ={setQ} />
      <Container className='px-0'>
        <h2 className='mt-5 text-secondary mb-4'>Semua Catatan</h2>
        <Row>
          {filteredResult.length > 0
            ? filteredResult.map((note) => (
                <Col lg={3} md={6} sm={6} key={note.id} className='mb-3'>
                  <NoteCard
                    title={note.title}
                    body={note.body}
                    createdAt={note.createdAt}
                    archived={note.archived}
                    deleteNote={() => handleDelete(note.id)}
                    archivedNote={() => setArchived(note.id)}
                    removeArchived={() => removeArchived(note.id)}
                  />
                </Col>
              ))
            : data.map((note) => (
                <Col lg={3} md={6} sm={6} key={note.id} className='mb-3'>
                  <NoteCard
                    title={note.title}
                    body={note.body}
                    createdAt={note.createdAt}
                    archived={note.archived}
                    deleteNote={() => handleDelete(note.id)}
                    archivedNote={() => setArchived(note.id)}
                    removeArchived={() => removeArchived(note.id)}
                  />
                </Col>
              ))}
        </Row>
      </Container>
      <Container className='px-0'>
        <h2 className='mt-5 text-secondary mb-4'>Arsip</h2>
        <Row>
          {data.map(
            (note) =>
              note.archived === true && (
                <Col lg={3} md={6} sm={6} key={note.id} className='mb-3'>
                  <NoteCard
                    title={note.title}
                    body={note.body}
                    createdAt={note.createdAt}
                    archived={note.archived}
                    deleteNote={() => handleDelete(note.id)}
                    removeArchived={() => removeArchived(note.id)}
                  />
                </Col>
              )
          )}
        </Row>
      </Container>
      <ModalCreateNote
        show={show}
        onHide={() => setShow(false)}
        submit={setChildData}
        onExited={() => setChildData(null)}
        onSuccess={setMessage}
      />
    </Container>
  )
}

export default Notepad
