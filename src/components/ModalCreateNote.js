import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

const initialForm = {
  id: '',
  title: '',
  body: '',
  createdAt: '',
  archived: '',
}

function ModalCreateNote({ show, onHide, submit, onExited, onSuccess }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.title === '' || form.body === '') {
      return alert('Silakan isi semua field')
    }

    submit({
      ...form,
      id: Date.now(),
      createdAt: new Date(),
      archived: false,
    })

    onHide()
    onSuccess('Berhasil menambahkan catatan')
  }

  return (
    <Modal show={show} onHide={onHide} onExited={onExited} centered>
      <Modal.Header closeButton>
        <Modal.Title>Buat Catatan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Judul</Form.Label>
            <Form.Control
              name='title'
              type='text'
              placeholder='Tambahkan judul...'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Catatan</Form.Label>
            <Form.Control
              name='body'
              as='textarea'
              rows={5}
              placeholder='Tuliskan catatan...'
              onChange={handleChange}
            />
          </Form.Group>
          <Button type='submit' className='d-block w-100'>
            Buat
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalCreateNote
