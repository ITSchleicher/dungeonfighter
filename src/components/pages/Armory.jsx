import "./pages-css/armory.css"

export default function Armory() {
    
    const weapons = [
        { id: 1, name: 'Longsword', description: 'A versatile, double-edged sword.' },
        { id: 2, name: 'Battle Axe', description: 'A heavy axe designed to be used by only the strongest.' },
        { id: 3, name: 'Bow', description: 'A ranged weapon only for the most skilled archers.' },
        { id: 4, name: 'Dagger', description: 'A small compact blade that is used for close combat.' },
    ];

    const armors = [
        { id: 1, name: 'Chainmail Armor', description: 'Interlocking rings offering protection.' },
        { id: 2, name: 'Plate Armor', description: 'Heavy armor for knights.' },
        { id: 3, name: 'Leather Armor', description: 'Light and flexible armor.' },
        { id: 4, name: 'Helmet', description: 'Protective headgear.' },
    ];

    const equipment = [
        { id: 1, name: 'Shield', description: 'Used for defense and blocking attacks.' },
        { id: 2, name: 'Quiver', description: 'Holds arrows for archers.' },
        { id: 3, name: 'Torch', description: 'Lights the way in dark places.' },
        { id: 4, name: 'Grappling Hook', description: 'A tool used for scaling tall objects.' },
    ];

    const ItemCard = ({ name, description }) => (
        <div className="item-card">
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );

    return (
        <div className="armory">
            <h1>Armory</h1>
            <div className="section">
                <h2>Weapons</h2>
                <div className="item-grid">
                    {weapons.map((weapon) => (
                        <ItemCard
                            key={weapon.id}
                            name={weapon.name}
                            description={weapon.description}
                        />
                    ))}
                </div>
            </div>
            <div className="section">
                <h2>Armor</h2>
                <div className="item-grid">
                    {armors.map((armor) => (
                        <ItemCard
                            key={armor.id}
                            name={armor.name}
                            description={armor.description}
                        />
                    ))}
                </div>
            </div>
            <div className="section">
                <h2>Equipment</h2>
                <div className="item-grid">
                    {equipment.map((item) => (
                        <ItemCard
                            key={item.id}
                            name={item.name}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
