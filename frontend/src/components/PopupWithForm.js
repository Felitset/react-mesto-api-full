import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? `popup popup-${props.name} popup_is-opened` : `popup popup-${props.name}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose} />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form popup__form_edit-profile"
          name={props.name}
          onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save-button popup__button popup__button_active" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm