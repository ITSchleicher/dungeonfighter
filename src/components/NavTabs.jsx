import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import ProfilePictureSelector from './profilepic/ProfilePictureSelector'; 
import { Modal, Button } from 'react-bootstrap';

function NavTabs({ currentPage, handlePageChange }) {
  const [profilePicture, setProfilePicture] = useState(
    'https://i.redd.it/d-d-logo-feel-free-to-use-for-whatever-v0-swx169zi1e6c1.jpg?width=1024&format=pjpg&auto=webp&s=7a1ab5636acc8ca4689123370b14eda053d2f518' // Default profile picture
  );
  const [showModal, setShowModal] = useState(false);

  const handleProfilePictureUpdate = (newProfilePicture) => {
    // Simulate updating profile picture in the backend
    setProfilePicture(newProfilePicture);
    setShowModal(false);
  };

  return (
    <header className="masthead">
      <div className="container">
        <nav className="primary-nav">
          <img
            id="nav-img"
            src="https://i.pinimg.com/736x/ae/7c/ae/ae7caeb388343825b9d01eed51d09aab.jpg"
            alt="dice"
            height="50px"
            width="50px"
          />
          <ul className="nav nav-tabs" style={{ display: 'flex', alignItems: 'center' }}>
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
                href="#list"
                onClick={() => handlePageChange('List')}
                className={currentPage === 'List' ? 'nav-link active' : 'nav-link'}
              >
                Character List
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
            {/* Profile Picture Dropdown */}
            <li className="nav-item dropdown" style={{ marginLeft: 'auto' }}>
              <div
                className="dropdown"
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => setShowModal(true)}
              >
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Profile Picture Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfilePictureSelector onSelect={handleProfilePictureUpdate} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default NavTabs;
