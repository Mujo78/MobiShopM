
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import useResponsive from './useResponsive';

export default function BrandNav(props) {
  const{isMobile} = useResponsive();

  return (
    
    <ListGroup>
        <ListGroup.Item style={{borderRadius: "0px", border:"none", width: isMobile ? "100%" : "50%"}} variant="secondary" action className="mb-2 text-center" as={Link} to={`/models/${props.b.name}`} >{props.b.name}</ListGroup.Item>
    </ListGroup>
  );
}