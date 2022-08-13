import { Nav, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import "../App.css";
function CardNavbar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" exact className="CardNavbar">
              <img id="imgNavbar" src="https://www.seekpng.com/png/full/768-7683212_the-last-airbender-avatar-the-legend-of-aang.png" />
            </NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink to="/GamePlay" exact className="CardNavbar">
                Card Game
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/Leaderboard" exact className="CardNavbar">
                Leader Board
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/CreateCard" exact className="CardNavbar">
                Create Card
              </NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default CardNavbar;
