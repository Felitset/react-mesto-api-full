import React, { useContext} from 'react';
import Card from './Card.js'
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main(props) {
    const {name, about, avatar} = useContext(CurrentUserContext);

    return (
        <main className="main page__main">
            <section className="profile main__profile">
                <div onClick={props.onEditAvatar} className="profile__wrapper">
                    <img
                        className="profile__avatar"
                        src={avatar}
                        alt="Аватар профиля."
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{name}</h1>
                    <button
                        onClick={props.onEditProfile}
                        className="profile__edit-button"
                        type="button" />
                    <h2 className="profile__description">{about}</h2>
                </div>
                <button
                    onClick={props.onAddPlace}
                    className="profile__add-button"
                    type="button" />
            </section>
            <section className="main__gallery">
                <ul className="gallery">
                    {props.cards.map((card) => <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete} />)}
                </ul>
            </section>
        </main>
    )
}

export default Main