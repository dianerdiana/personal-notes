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

  const allNotes = data.filter((note) => note.archived === false)
  const notesArchived = data.filter((note) => note.archived === true)
  const filteredResultArchived = filteredResult.filter(
    (note) => note.archived === true
  )

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
          {filteredResult.length > 0 ? (
            filteredResult.map((note) => (
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
          ) : filteredResult <= 0 && q !== '' ? (
            <Alert variant='warning'>Maaf, hasil tidak ditemukan</Alert>
          ) : allNotes.length > 0 ? (
            allNotes.map((note) => (
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
          ) : (
            <Alert variant='danger'>
              Catatan kosong, silakan buat catatan.
            </Alert>
          )}
        </Row>
      </Container>
      <Container className='px-0'>
        <h2 className='mt-5 text-secondary mb-4'>Arsip</h2>
        <Row>
          {filteredResult.length > 0 ? (
            filteredResultArchived.length > 0 ? (
              filteredResultArchived.map((note) => (
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
              ))
            ) : (
              <Alert variant='warning'>Maaf, hasil tidak ditemukan.</Alert>
            )
          ) : filteredResult <= 0 && q !== '' ? (
            <Alert variant='warning'>Maaf, hasil tidak ditemukan.</Alert>
          ) : notesArchived.length > 0 ? (
            notesArchived.map((note) => (
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
            ))
          ) : (
            <Alert variant='danger'>
              Arsip kosong, silakan arsipkan catatan.
            </Alert>
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
