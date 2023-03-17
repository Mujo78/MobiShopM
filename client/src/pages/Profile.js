import Nav from "react-bootstrap/Nav";
import { Link, Outlet } from "react-router-dom";

export default function Profile(){
    return(
        <>
        <Nav className="mt-3">
            <Nav.Item>
                <Nav.Link as={Link} to="/profile/overview">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/profile/my-cart">My cart</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link as={Link} to="/profile/setings">Setings</Nav.Link>
            </Nav.Item>
        </Nav>

        <Outlet />
        </>
    )
}