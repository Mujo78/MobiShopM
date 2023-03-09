
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

export default function BrandNav(props) {

  return (
    
    <ListGroup>
        <ListGroup.Item className="mb-2 text-center w-50" as={Link} to={`/models/${props.b.ime}`} action variant="primary">{props.b.ime}</ListGroup.Item>
    </ListGroup>
  );
}