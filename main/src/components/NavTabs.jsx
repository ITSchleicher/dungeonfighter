import Nav from 'react-bootstrap/Nav';

function NavTabs({ currentPage, handlePageChange }) {
    return (
      <header className="masthead">
        <div className="container">
          <nav className="primary-nav">
          <img id="nav-img" src="https://i.pinimg.com/736x/ae/7c/ae/ae7caeb388343825b9d01eed51d09aab.jpg" alt="dice" height="50px" width="50px" />
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  href="#home"
                  onClick={() => handlePageChange('Home')}
                  className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#character"
                  onClick={() => handlePageChange('Character')}
                  className={currentPage === 'Character' ? 'nav-link active' : 'nav-link'}
                >
                  Character
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#armory"
                  onClick={() => handlePageChange('Armory')}
                  className={currentPage === 'Armory' ? 'nav-link active' : 'nav-link'}
                >
                  Armory
                </a>
              </li>
              <li className="nav-item">
                <a
                  
                  href="#login"
                  onClick={() => handlePageChange('Login')}
                  className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#signup"
                  onClick={() => handlePageChange('Signup')}
                  className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
                >
                  Signup
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

//   function NavTabs () {
//   return (
//     <Nav variant="underline" defaultActiveKey="#home">
//       <img src="https://static.vecteezy.com/system/resources/previews/023/288/132/non_2x/angry-dragon-logo-design-modern-game-style-simple-illustration-vector.jpg" alt="dragon" height="50px" width="50px"  />
//       <Nav.Item>
//         <Nav.Link href="#home">Home</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link href="#character">Character</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="#armory">Armory</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="#login">Login</Nav.Link>
//       </Nav.Item>
//     </Nav>
//   );
// }
  
  export default NavTabs;
  