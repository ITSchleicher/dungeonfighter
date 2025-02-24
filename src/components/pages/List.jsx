// import dotenv from 'dotenv'; 
import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import "./pages-css/character-sheet.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterDetails, setCharacterDetails] = useState(null);
  const jwtToken = sessionStorage.getItem('jwt_token');

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!jwtToken) {
        setLoading(false); // Set loading to false if no token is present
        return; // Exit early if no token
      }

      try {
        //Creating URL
        const LoadapiUrl = import.meta.env.VITE_PROD_ENV === "production" 
          ? "https://dungeonfighter.onrender.com/api/loadCharacter" 
          : "http://localhost:5000/api/loadCharacter";
        const response = await fetch(LoadapiUrl, {
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
    setCharacterDetails(null); // Clear character details when a new character is selected
  };

  const handleFetchCharacterDetails = async () => {
    if (!selectedCharacter) {
      return; // Exit if no character is selected
    }

    try {
       //Creating URL
       const FetchapiUrl = import.meta.env.VITE_PROD_ENV === "production" 
      ? `https://dungeonfighter.onrender.com/api/character/${selectedCharacter}` 
      : `http://localhost:5000/api/character/${selectedCharacter}`;

      const response = await fetch(FetchapiUrl, {
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
      setCharacterDetails(data);
      // Handle the character details as needed (e.g., display them in the UI)
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  //Delete character
  const handleDeleteCharacter = async (characterId) => {
    if (!window.confirm('Are you sure you want to delete this character?')) return;
  
    try {
      //Creating URL
      const DeleteapiUrl = import.meta.env.VITE_PROD_ENV === "production" 
      ? `https://dungeonfighter.onrender.com/api/character/${characterId}` 
      : `http://localhost:5000/api/character/${characterId}`;
      
      const response = await fetch(DeleteapiUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete character');
      }
  
      const data = await response.json();
      alert(data.message); // Show success message
  
      // Update the character list in the state
      setCharacters((prevCharacters) =>
        prevCharacters.filter((character) => character.id !== characterId)
      );
    } catch (error) {
      console.error('Error deleting character:', error);
      alert('Failed to delete character');
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
                    key={character.id} 
                    onClick={() => handleCharacterSelect(character.id)} // Set selected character on click
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
         {/* DELETE CHARACTER BUTTON */}
      <Dropdown data-bs-theme="dark" className="position-absolute top-0 end-0">
        <Dropdown.Toggle variant="danger" id="delete-dropdown">
          Delete Character
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {loading ? (
            <Dropdown.Item disabled>Loading...</Dropdown.Item>
          ) : jwtToken ? (
            characters.length > 0 ? (
              characters.map((character) => (
                <Dropdown.Item
                  key={character.id}
                  onClick={() => handleDeleteCharacter(character.id)}
                >
                  {character.char_name}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No characters available</Dropdown.Item>
            )
          ) : (
            <Dropdown.Item disabled>
              You Must Log in to Access Characters
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      </Dropdown>

      <Button 
        variant="primary" 
        onClick={handleFetchCharacterDetails} 
        disabled={!selectedCharacter} // Disable button if no character is selected
      >
        Fetch Character Details
      </Button>
         

      {characterDetails && (
            <form className="charsheet">
                  <header>
          <section className="charname">
            <label htmlFor="charname">Character Name</label>
            <input 
            value={characterDetails.char_name || ''}
            readOnly
            name="charname" 
            placeholder="Thoradin Fireforge" />
          </section>
          <section className="misc">
            <ul>
              <li className="class-level">
                <label htmlFor="classlevel">Class & Level</label>
                <input 
                value={characterDetails.class_level || ''}
                readOnly
                name="classlevel" 
                placeholder="Paladin 2" />
              </li>
              <li>
                <label htmlFor="background">Background</label>
                <input 
                value={characterDetails.background || ''}
                readOnly
                name="background" 
                placeholder="Acolyte" />
              </li>
              <li>
                <label htmlFor="playerName">Player Name</label>
                <input 
                value={characterDetails.player_name || ''}
                readOnly
                name="playerName" 
                placeholder="McLovin"></input>
                
              </li>
              <li>
                <label htmlFor="race">Race</label>
                <input
                value={characterDetails.race || ''}
                readOnly
                name="race"
                placeholder="Half-elf" />
              </li>
              <li>
                <label htmlFor="alignment">Alignment</label>
                <input
                value={characterDetails.alignment || ''}
                readOnly
                name="alignment"
                placeholder="Lawful Good" />
              </li>
              <li>
                <label htmlFor="experiencepoints">Experience Points</label>
                <input 
                value={characterDetails.experience_points || ''}
                readOnly
                name="experiencepoints" 
                placeholder="3240" />
              </li>
            </ul>
          </section>
        </header>
        <main>
          <section>
            <section className="attributes">
              <div className="scores">
                <ul>
                  <li>
                    <div className="score">
                      <label htmlFor="Strengthscore">Strength</label><input name="Strengthscore" placeholder="10" className="stat"/>
                    </div>
                    <div className="modifier">
                      <input name="Strengthmod" placeholder="+0" className="statmod"/>
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Dexterityscore">Dexterity</label><input name="Dexterityscore" placeholder="10" className="stat"/>
                    </div>
                    <div className="modifier">
                      <input name="Dexteritymod" placeholder="+0" className="statmod"></input>
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Constitutionscore">Constitution</label><input name="Constitutionscore" placeholder="10" className="stat"/>
                    </div>
                    <div className="modifier">
                      <input name="Constitutionmod" placeholder="+0" className="statmod"/>
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Wisdomscore">Wisdom</label><input name="Wisdomscore" placeholder="10" className="stat"/>
                    </div>
                    <div className="modifier">
                      <input name="Wisdommod" placeholder="+0" />
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Intelligencescore">Intelligence</label><input name="Intelligencescore" placeholder="10" className="stat"/>
                    </div>
                    <div className="modifier">
                      <input name="Intelligencemod" placeholder="+0" className="statmod"/>
                    </div>
                  </li>
                  <li>
                    <div className="score">
                      <label htmlFor="Charismascore">Charisma</label><input name="Charismascore" placeholder="10" className="stat"/>
                    </div>
                    <div className="modifier">
                      <input name="Charismamod" placeholder="+0" className="statmod"/>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="attr-applications">
                <div className="inspiration box">
                  <div className="label-container">
                    <label htmlFor="inspiration">Inspiration</label>
                  </div>
                  <input name="inspiration" type="checkbox" />
                </div>
                <div className="proficiencybonus box">
                  <div className="label-container">
                    <label htmlFor="proficiencybonus">Proficiency Bonus</label>
                  </div>
                  <input name="proficiencybonus" placeholder="+2" />
                </div>
                <div className="saves list-section box">
                  <ul>
                    <li>
                      <label htmlFor="Strength-save">Strength</label><input name="Strength-save" placeholder="+0" type="text" /><input name="Strength-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Dexterity-save">Dexterity</label><input name="Dexterity-save" placeholder="+0" type="text" /><input name="Dexterity-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Constitution-save">Constitution</label><input name="Constitution-save" placeholder="+0" type="text" /><input name="Constitution-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Wisdom-save">Wisdom</label><input name="Wisdom-save" placeholder="+0" type="text" /><input name="Wisdom-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Intelligence-save">Intelligence</label><input name="Intelligence-save" placeholder="+0" type="text" /><input name="Intelligence-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Charisma-save">Charisma</label><input name="Charisma-save" placeholder="+0" type="text" /><input name="Charisma-save-prof" type="checkbox" />
                    </li>
                  </ul>
                  <div className="label">
                    Saving Throws
                  </div>
                </div>
                <div className="skills list-section box">
                  <ul>
                    <li>
                      <label htmlFor="Acrobatics">Acrobatics <span className="skill">(Dex)</span></label><input name="Acrobatics" placeholder="+0" type="text" /><input name="Acrobatics-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Animal Handling">Animal Handling <span className="skill">(Wis)</span></label><input name="Animal Handling" placeholder="+0" type="text" /><input name="Animal Handling-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Arcana">Arcana <span className="skill">(Int)</span></label><input name="Arcana" placeholder="+0" type="text" /><input name="Arcana-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Athletics">Athletics <span className="skill">(Str)</span></label><input name="Athletics" placeholder="+0" type="text" /><input name="Athletics-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Deception">Deception <span className="skill">(Cha)</span></label><input name="Deception" placeholder="+0" type="text" /><input name="Deception-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="History">History <span className="skill">(Int)</span></label><input name="History" placeholder="+0" type="text" /><input name="History-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Insight">Insight <span className="skill">(Wis)</span></label><input name="Insight" placeholder="+0" type="text" /><input name="Insight-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Intimidation">Intimidation <span className="skill">(Cha)</span></label><input name="Intimidation" placeholder="+0" type="text" /><input name="Intimidation-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Investigation">Investigation <span className="skill">(Int)</span></label><input name="Investigation" placeholder="+0" type="text" /><input name="Investigation-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Medicine">Medicine <span className="skill">(Wis)</span></label><input name="Medicine" placeholder="+0" type="text" /><input name="Medicine-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Nature">Nature <span className="skill">(Int)</span></label><input name="Nature" placeholder="+0" type="text" /><input name="Nature-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Perception">Perception <span className="skill">(Wis)</span></label><input name="Perception" placeholder="+0" type="text" /><input name="Perception-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Performance">Performance <span className="skill">(Cha)</span></label><input name="Performance" placeholder="+0" type="text" /><input name="Performance-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Persuasion">Persuasion <span className="skill">(Cha)</span></label><input name="Persuasion" placeholder="+0" type="text" /><input name="Persuasion-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Religion">Religion <span className="skill">(Int)</span></label><input name="Religion" placeholder="+0" type="text" /><input name="Religion-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Sleight of Hand">Sleight of Hand <span className="skill">(Dex)</span></label><input name="Sleight of Hand" placeholder="+0" type="text" /><input name="Sleight of Hand-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Stealth">Stealth <span className="skill">(Dex)</span></label><input name="Stealth" placeholder="+0" type="text" /><input name="Stealth-prof" type="checkbox" />
                    </li>
                    <li>
                      <label htmlFor="Survival">Survival <span className="skill">(Wis)</span></label><input name="Survival" placeholder="+0" type="text" /><input name="Survival-prof" type="checkbox" />
                    </li>
                  </ul>
                  <div className="label">
                    Skills
                  </div>
                </div>
              </div>
            </section>
            <div className="passive-perception box">
              <div className="label-container">
                <label htmlFor="passiveperception">Passive Wisdom (Perception)</label>
              </div>
              <input name="passiveperception" placeholder="10" />
            </div>
            <div className="otherprofs box textblock">
              <label htmlFor="otherprofs">Other Proficiencies and Languages</label><textarea name="otherprofs"></textarea>
            </div>
          </section>
          <section>
            <section className="combat">
              <div className="armorclass">
                <div>
                  <label htmlFor="ac">Armor Class</label><input name="ac" placeholder="10" type="text" />
                </div>
              </div>
              <div className="initiative">
                <div>
                  <label htmlFor="initiative">Initiative</label><input name="initiative" placeholder="+0" type="text" />
                </div>
              </div>
              <div className="speed">
                <div>
                  <label htmlFor="speed">Speed</label><input name="speed" placeholder="30" type="text" />
                </div>
              </div>
              <div className="hp">
                <div className="regular">
                  <div className="max">
                    <label htmlFor="maxhp">Hit Point Maximum</label><input name="maxhp" placeholder="10" type="text" />
                  </div>
                  <div className="current">
                    <label htmlFor="currenthp">Current Hit Points</label><input name="currenthp" type="text" />
                  </div>
                </div>
                <div className="temporary">
                  <label htmlFor="temphp">Temporary Hit Points</label><input name="temphp" type="text" />
                </div>
              </div>
              <div className="hitdice">
                <div>
                  <div className="total">
                    <label onClick="totalhd_clicked()" htmlFor="totalhd">Total</label><input name="totalhd" placeholder="2d10" type="text" />
                  </div>
                  <div className="remaining">
                    <label htmlFor="remaininghd">Hit Dice</label><input name="remaininghd" type="text" />
                  </div>
                </div>
              </div>
              <div className="deathsaves">
                <div>
                  <div className="label">
                    <label>Death Saves</label>
                  </div>
                  <div className="marks">
                    <div className="deathsuccesses">
                      <label>Successes</label>
                      <div className="bubbles">
                        <input name="deathsuccess1" type="checkbox" />
                        <input name="deathsuccess2" type="checkbox" />
                        <input name="deathsuccess3" type="checkbox" />
                      </div>
                    </div>
                    <div className="deathfails">
                      <label>Failures</label>
                      <div className="bubbles">
                        <input name="deathfail1" type="checkbox" />
                        <input name="deathfail2" type="checkbox" />
                        <input name="deathfail3" type="checkbox" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="attacksandspellcasting">
              <div>
                <label>Attacks & Spellcasting</label>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Atk Bonus
                      </th>
                      <th>
                        Damage/Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input name="atkname1" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus1" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage1" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input name="atkname2" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus2" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage2" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input name="atkname3" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus3" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage3" type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <textarea></textarea>
              </div>
            </section>
            <section className="equipment">
              <div>
                <label>Equipment</label>
                <div className="money">
                  <ul>
                    <li>
                      <label htmlFor="cp">cp</label><input name="cp" />
                    </li>
                    <li>
                      <label htmlFor="sp">sp</label><input name="sp" />
                    </li>
                    <li>
                      <label htmlFor="ep">ep</label><input name="ep" />
                    </li>
                    <li>
                      <label htmlFor="gp">gp</label><input name="gp" />
                    </li>
                    <li>
                      <label htmlFor="pp">pp</label><input name="pp" />
                    </li>
                  </ul>
                </div>
                <textarea placeholder="Equipment list here"></textarea>
              </div>
            </section>
          </section>
          <section>
            <section className="flavor">
              <div className="personality">
                <label htmlFor="personality">Personality</label><textarea name="personality"></textarea>
              </div>
              <div className="ideals">
                <label htmlFor="ideals">Ideals</label><textarea name="ideals"></textarea>
              </div>
              <div className="bonds">
                <label htmlFor="bonds">Bonds</label><textarea name="bonds"></textarea>
              </div>
              <div className="flaws">
                <label htmlFor="flaws">Flaws</label><textarea name="flaws"></textarea>
              </div>
            </section>
            <section className="features">
              <div>
                <label htmlFor="features">Features & Traits</label><textarea name="features"></textarea>
              </div>
            </section>
          </section>
        </main>
      </form>
      )}
      
    </div>
    
    
  ); 
};

export default CharacterList;