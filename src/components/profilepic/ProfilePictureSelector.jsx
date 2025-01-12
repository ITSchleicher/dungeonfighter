import React, { useState } from 'react';

const profilePictures = [
  'https://i0.wp.com/dice-scroller.com/wp-content/uploads/2022/12/barbare.png?resize=400%2C417&ssl=1', //barbarian
  'https://i0.wp.com/dice-scroller.com/wp-content/uploads/2022/12/barde.png?resize=400%2C406&ssl=1', //bard
  'https://www.dndbeyond.com/avatars/thumbnails/6/371/420/618/636272706155064423.png', //cleric
  'https://www.dndbeyond.com/attachments/8/788/druid.jpg', //druid
  'https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png', //fighter
  'https://i0.wp.com/dice-scroller.com/wp-content/uploads/2022/12/moench.png?resize=400%2C490&ssl=1', //monk
  'https://www.dndbeyond.com/avatars/thumbnails/6/365/420/618/636272701937419552.png', //paladin
  'https://www.dndbeyond.com/attachments/8/789/ranger.jpg', //ranger
  'https://www.dndbeyond.com/avatars/thumbnails/6/384/420/618/636272820319276620.png', //rogue
  'https://i0.wp.com/dice-scroller.com/wp-content/uploads/2022/12/zauberer.png?resize=400%2C517&ssl=1', //sorcerer
  'https://i0.wp.com/dice-scroller.com/wp-content/uploads/2022/12/hexenmeister.png?resize=399%2C512&ssl=1', //warlock
  'https://i0.wp.com/dice-scroller.com/wp-content/uploads/2022/12/magier.png?resize=400%2C484&ssl=1', //wizard
];

export default function ProfilePictureSelector({ onSelect }) {
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onSelect(image); // Pass the selected image URL to the parent component
  };

  return (
    <div className="profile-picture-selector">
      <h4>Select a Profile Picture</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {profilePictures.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Profile ${index + 1}`}
            onClick={() => handleImageClick(image)}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              cursor: 'pointer',
              border: selectedImage === image ? '3px solid blue' : '1px solid gray',
            }}
          />
        ))}
      </div>
    </div>
  );
}
