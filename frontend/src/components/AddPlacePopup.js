import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (props.isOpen) {
            setTitle('');
            setLink('');
        }
    }, [props.isOpen])

    function handleNewTitle(e) {
        setTitle(e.target.value);
    }

    function handleNewLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: title,
            link: link
        })
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            buttonText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                id="card-title-input"
                className="popup__input popup__input_type_card-title"
                type="text"
                name="card_title"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                value={title}
                onChange={handleNewTitle} />
            <span className="card-title-input-error"></span>

            <input
                id="image-link-input"
                className="popup__input popup__input_type_image-link"
                type="url"
                name="image_link"
                placeholder="Ссылка на картинку"
                required
                value={link}
                onChange={handleNewLink} />
            <span className="image-link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup