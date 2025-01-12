import React, { useState } from "react";
import "./pages-css/character-sheet.css";
import "./pages-css/dice.css";
import DiceImage1 from "./dice-imgs/dice1.png";
import DiceImage2 from "./dice-imgs/dice2.png";
import DiceImage3 from "./dice-imgs/dice3.png";
import DiceImage4 from "./dice-imgs/dice4.png";
import DiceImage5 from "./dice-imgs/dice5.png";
import DiceImage6 from "./dice-imgs/dice6.png";
import DiceImage7 from "./dice-imgs/dice7.png";
import DiceImage8 from "./dice-imgs/dice8.png";
import DiceImage9 from "./dice-imgs/dice9.png";
import DiceImage10 from "./dice-imgs/dice10.png";
import DiceImage11 from "./dice-imgs/dice11.png";
import DiceImage12 from "./dice-imgs/dice12.png";
import DiceImage13 from "./dice-imgs/dice13.png";
import DiceImage14 from "./dice-imgs/dice14.png";
import DiceImage15 from "./dice-imgs/dice15.png";
import DiceImage16 from "./dice-imgs/dice16.png";
import DiceImage17 from "./dice-imgs/dice17.png";
import DiceImage18 from "./dice-imgs/dice18.png";
import DiceImage19 from "./dice-imgs/dice19.png";
import DiceImage20 from "./dice-imgs/dice20.png";

function DiceApp() {
  const diceImages = [
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6,
    DiceImage7,
    DiceImage8,
    DiceImage9,
    DiceImage10,
    DiceImage11,
    DiceImage12,
    DiceImage13,
    DiceImage14,
    DiceImage15,
    DiceImage16,
    DiceImage17,
    DiceImage18,
    DiceImage19,
    DiceImage20,
  ];

  // State htmlFor dice image and character data            (labels)
  const [image, setImage] = useState(diceImages[0]);
  const [charName, setCharName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [background, setBackground] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [race, setRace] = useState('');
  const [alignment, setAlignment] = useState('');
  const [experiencepoints, setExperiencepoints] = useState('');

  // Function to handle dice roll
  const rollDice = () => {
    const randomNum = Math.floor(Math.random() * 20);
    setImage(diceImages[randomNum]);
  };

  // Save character data function
  const handleSave = async () => {
    if (!charName || !classLevel || !background || !playerName || !race || !alignment || !experiencepoints) {  // add labels to check if its been filled out
      alert("Please provide a character name and class/level/background/player name/race/alignment/experience points.");
      return;
    }

    try {
      const token = sessionStorage.getItem("jwt_token");
      if (!token) {
        alert("User not logged in!");
        return;
      }

      // Send data to the server
      const response = await fetch("http://localhost:5000/api/saveCharacter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ charName, classLevel, background, playerName, race, alignment, experiencepoints }),  // add labels to stringify
      });

      if (response.ok) {
        alert("Character saved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to save character: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving.");
    }
  };

  return (        
  <div className="dice-App">
        <div className="dice-container">
          <img className="dice" src={image} alt="dice" />
          
        </div>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={rollDice}
        >
          Roll Dice
        </button>
            <form className="charsheet">
              <div className="save-load-btns">
            <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleSave}
          >
            Save
          </button>
          </div>
            <header>
    <section className="charname">
      <label htmlFor="charname">Character Name</label>
      <input 
      id="charName" 
      value={charName} 
      onChange={(e) => setCharName(e.target.value)} 
      name="charname" 
      placeholder="Thoradin Fireforge" />
    </section>
    <section className="misc">
      <ul>
        <li className="class-level">
          <label htmlFor="classlevel">Class & Level</label>
          <input 
          id="classLevel" 
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)} 
          name="classlevel" 
          placeholder="Paladin 2" />
        </li>
        <li>
          <label htmlFor="background">Background</label>
          <input 
          id="background" 
          value={background} 
          onChange={(e) => setBackground(e.target.value)} 
          name="background" 
          placeholder="Acolyte" />
        </li>
        <li>
          <label htmlFor="playerName">Player Name</label>
          <input 
          id="playername"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          name="playerName" 
          placeholder="McLovin"></input>
        </li>
        <li>
          <label htmlFor="race">Race</label>
          <input
          id="race"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          name="race"
          placeholder="Half-elf" />
        </li>
        <li>
          <label htmlFor="alignment">Alignment</label>
          <input
          id="alignment"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
          name="alignment"
          placeholder="Lawful Good" />
        </li>
        <li>
          <label htmlFor="experiencepoints">Experience Points</label>
          <input 
          id="experiencepoints"
          value={experiencepoints}
          onChange={(e) => setExperiencepoints(e.target.value)}
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
            
        </div>
    );
}


export default DiceApp;
