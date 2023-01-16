import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }
   
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile-edit"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                id="profile-name-input"
                className="popup__input popup__input_type_name"
                type="text"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                value={name || ''}
                onChange={handleNameChange} />
            <span className="profile-name-input-error"></span>

            <input
                id="job-input"
                className="popup__input popup__input_type_job"
                type="text"
                name="profession"
                placeholder="Профессия"
                required
                minLength="2"
                maxLength="200"
                value={description || ''}
                onChange={handleDescriptionChange} />
            <span className="job-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup