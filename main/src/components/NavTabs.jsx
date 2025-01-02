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
            className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
          >
            Character
          </a>
        </li>
      </ul>
    );
  }
  
  export default NavTabs;
  