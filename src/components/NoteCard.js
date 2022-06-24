import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { MoreVertical } from 'react-feather'
import { showFormattedDate } from '../utils'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    className='cursor-pointer'
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
  </span>
))

function NoteCard({
  title,
  createdAt,
  body,
  archived,
  deleteNote,
  archivedNote,
  removeArchived,
}) {
  const getDate = showFormattedDate(createdAt)

  return (
    <>
      <Card style={{ maxWidth: '18rem' }} className='rounded-4 py-2'>
        <Card.Header>
          <div className='d-flex align-items-center mb-2'>
            <Card.Title as='h6' className='m-0 text-black'>
              {title}
            </Card.Title>
            <Dropdown className='ms-auto' align='end'>
              <Dropdown.Toggle as={CustomToggle}>
                <MoreVertical
                  size={20}
                  color='black'
                  className='cursor-pointer'
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={archived ? removeArchived : archivedNote}
                >
                  {archived ? 'Batal Arsip' : 'Arsipkan'}
                </Dropdown.Item>
                <Dropdown.Item onClick={deleteNote}>Hapus</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card.Subtitle>{getDate}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default NoteCard
