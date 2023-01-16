import React from 'react';

function ImagePopup(props) {
  return (
    <div className={props.isOpen ? "popup popup-card-image popup_is-opened" : "popup popup-card-image"}>
      <div className="popup__transparent-container">
        <button className="popup__close" type="button" onClick={props.onClose} />
        <div className="popup__image-container">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
        </div>
        <h2 className="popup__image-title">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup