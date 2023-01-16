import React from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        ` ${isOwn ? 'gallery__delete-item' : 'gallery__delete-item_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `gallery__like ${isLiked ? 'gallery__like_status_active' : ''}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <li key={props.card._id} className="gallery__item">
            <button
                className={cardDeleteButtonClassName}
                type="button"
                onClick={() => {
                    handleDeleteClick()
                }}></button>
            <img
                className="gallery__image"
                src={props.card.link}
                alt={props.card.name}
                onClick={() => {
                    handleClick()
                }} />
            <div className="gallery__item-content">
                <h2 className="gallery__title">{props.card.name}</h2>
                <div className="gallery__like_container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={() => {
                            handleLikeClick()
                        }} ></button>
                    <span className="gallery__like-counter"></span></div>
            </div>
        </li>
    )

}

export default Card