import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, Outlet } from 'react-router-dom';

export default function AdminMenu(){
    return(
      <div className='d-flex flex-wrap flex-row' style={{backgroundColor:"#cce7e8"}}>
        <div >
        <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Admin Menu</Accordion.Header>
        <Accordion.Body>
        <ListGroup variant='flush'>
                    <ListGroup.Item as={Link} to="add-admin">Add new Admin</ListGroup.Item>
                    <ListGroup.Item as={Link} to="delete-admin">Delete Admin</ListGroup.Item>
                </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Mobile Menu</Accordion.Header>
        <Accordion.Body>
        <ListGroup variant='flush'>
                    <ListGroup.Item as={Link} to="add-mobile">Add new mobile</ListGroup.Item>
                    <ListGroup.Item as={Link} to="edit-mobile"> Edit mobile</ListGroup.Item>
                    <ListGroup.Item as={Link} to="delete-mobile">Delete mobile</ListGroup.Item>
                    <ListGroup.Item as={Link} to="add-brand">Add new Brand</ListGroup.Item>
                </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Comments Menu</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item as={Link} to="see-comments">See comments</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Orders Menu</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item as={Link} to="orders">See orders</ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    <div className=' flex-grow-1 mt-4 mb-4 flex-wrap d-flex flex-column align-items-center justify-content-center'>
      <Outlet />
    </div>
    </div>
    )
}