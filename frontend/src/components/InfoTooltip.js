import React from "react";
import './InfoTooltip.css';

function InfoTooltip(props) {
  return (
      <div className="popup popup_is-opened" >
        <div className="infoTooltip__container">
          <button
            className="popup__close"
            type="button"
            onClick={props.onClose} />
          <img className="infoTooltip__img" src={props.image} alt="пиктограмма"></img>
          <h1 className="infoTooltip__title">{props.title}</h1>
        </div>
      </div>
  )
}

export default InfoTooltip