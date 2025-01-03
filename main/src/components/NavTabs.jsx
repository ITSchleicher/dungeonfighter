function NavTabs({ currentPage, handlePageChange }) {
    return (
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
      </ul>
    );
  }
  
  export default NavTabs;
  