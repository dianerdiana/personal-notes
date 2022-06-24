import React, { useEffect, useState } from 'react'

import { Row, Col, Button, Form, Container } from 'react-bootstrap'
import { Plus } from 'react-feather'

function SearchCard({ show, setQ }) {
  const [q, getQ] = useState('')

  useEffect(() => {
    setQ(q)
  }, [q])
  return (
    <Container className='mt-3'>
      <Row className='bg-white shadow py-2 rounded-2'>
        <Col md={8} sm={12}>
          <Form>
            <Form.Control
              onChange={(e) => getQ(e.target.value)}
              placeholder='Cari catatan...'
              className='py-2'
            />
          </Form>
        </Col>
        <Col md={4} sm={12} className='text-end'>
          <Button className='w-100 py-2 btn-search' onClick={show}>
            <Plus size={20} color='white' />
            <span className='align-middle ms-25'>Tambah Catatan</span>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchCard
