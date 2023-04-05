
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import useResponsive from './useResponsive';

export default function BrandNav({b: {name}}) {
  const{isMobile} = useResponsive();

  return (
    
    <ListGroup>
        <ListGroup.Item style={{borderRadius: "0px", border:"none", width: isMobile ? "100%" : "50%"}} variant="secondary" action className="mb-2 text-center" as={Link} to={`/models/${name}`} >{name}</ListGroup.Item>
    </ListGroup>
  );
}