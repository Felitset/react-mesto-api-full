import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const linkRef = useRef();

  useEffect(() => {
    if (props.isOpen) {
      linkRef.current.value = '';
    }
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="new-avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        id="avatar-link-input"
        className="popup__input popup__input_type_avatar-image-link"
        type="url"
        name="avatar_link"
        placeholder="Ссылка на картинку"
        required
        ref={linkRef} />
      <span className="avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup