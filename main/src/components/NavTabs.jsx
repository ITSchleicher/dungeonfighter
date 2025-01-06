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

  export default NavTabs;
  