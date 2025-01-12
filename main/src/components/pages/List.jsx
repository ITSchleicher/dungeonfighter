import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';


const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const jwtToken = sessionStorage.getItem('jwt_token');

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!jwtToken) {
        setLoading(false); // Set loading to false if no token is present
        return; // Exit early if no token
      }

      try {
        const response = await fetch('http://localhost:5000/api/loadCharacter', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [jwtToken]);

  const handleCharacterSelect = (characterName) => {
    setSelectedCharacter(characterName);
  };

  const handleFetchCharacterDetails = async () => {
    if (!selectedCharacter) {
      return; // Exit if no character is selected
    }

    try {
      const response = await fetch(`http://localhost:5000/api/character/${selectedCharacter}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Character details:', data);
      // Handle the character details as needed (e.g., display them in the UI)
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  return (
    <div className="text-center">
      <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {loading ? 'Loading...' : 'Select Character'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {loading ? (
            <Dropdown.Item disabled>Loading...</Dropdown.Item>
          ) : (
            jwtToken ? (
              characters.length > 0 ? (
                characters.map(character => (
                  <Dropdown.Item 
                    key={characters.id} 
                    onClick={() => handleCharacterSelect(character.char_name)} // Set selected character on click
                  >
                    {character.char_name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No characters available</Dropdown.Item>
              )
            ) : (
              <Dropdown.Item disabled>You Must Log in to Access Characters</Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Button 
        variant="primary" 
        onClick={handleFetchCharacterDetails} 
        disabled={!selectedCharacter} // Disable button if no character is selected
      >
        Fetch Character Details
      </Button>
    </div>
  );
};

export default CharacterList;