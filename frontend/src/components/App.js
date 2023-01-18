import React, { useState, useEffect, useCallback  } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api_config.js';
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import successImage from '../images/success.png';
import failImage from '../images/fail.png';
import * as apiAuthHost from '../utils/ApiAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarOpened, setIsEditAvatarOpened] = useState(false);
  const [isAddPlaceOpened, setIsAddPlaceOpened] = useState(false);
  const [selectedCard, isSelectedCard] = useState({});
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState('');

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  

  const checkToken = useCallback(() => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('No token in storage');
      }
      else {
        apiAuthHost.getUserContent(jwt).then((data) => {
          setLoggedIn(true);
          setUserEmail(data.email)
        })

      }
    } catch { }
  }, [])

  const authenticateUser = useCallback(async (email, password) => {
    try {
      const { token } = await apiAuthHost.signInUser(email, password);
      if (!token) {
        throw new Error('No token');
      }

      if (!loggedIn) {
        setUserEmail(email);
        localStorage.setItem('jwt', token);
        setLoggedIn(true);
        return (<Redirect to='/'/>)
      }
      
    } catch { }
  }, []);

  const registerUser = useCallback(async (email, password) => {
    try {
      const data = await apiAuthHost.signUpUser(email, password);
      if (!data) {
        setIsFailModalOpen(true);
        throw new Error('No data');
      }
      setIsSuccessModalOpen(true);
    } catch {
      setIsFailModalOpen(true);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
  }, [])

  useEffect(() => {
    checkToken()
  }, [checkToken])


  useEffect(() => {
    if (loggedIn) {
    api.getAllCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err)
      })}
  },
    [loggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (loggedIn) {
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })}
  }

  function handleCardDelete(card) {
    if (loggedIn) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err)
      })}
  }

  useEffect(() => {
    if (loggedIn) {
    api.getUser()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      })}
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpened(true);
  }

  function handleCardClick(card) {
    isSelectedCard(card);
    setIsImagePopupOpened(true);
  }

  function closeAllPopups() {
    setIsEditAvatarOpened(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlaceOpened(false);
    isSelectedCard({});
    setIsImagePopupOpened(false);
    setIsSuccessModalOpen(false);
    setIsFailModalOpen(false);
  }

  function handleUpdateUser(userInfo) {
    if (loggedIn) {
    api.saveUser(userInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })}
  }

  function handleUpdateAvatar(imageLink) {
    if (loggedIn) {
    api.postNewAvatar(imageLink)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })}
  }

  function handleAddPlaceSubmit(placeInfo) {
    if (loggedIn) {
    api.saveCard(placeInfo)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })}
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
<Header onLogout={logout} userEmail={userEmail}/>
          <Switch>
            <Route path="/sign-up">

              <Register isLoggedIn={loggedIn} onRegister={registerUser} />

              {isSuccessModalOpen && <InfoTooltip 
                title="Вы успешно зарегистрировались!"
                image={successImage}
                onClose={closeAllPopups} />}

              {isFailModalOpen && <InfoTooltip 
                title="Что-то пошло не так! Попробуйте ещё раз."
                image={failImage}
                onClose={closeAllPopups} />}
            </Route>

            <Route path="/sign-in">
   
              <Login isLoggedIn={loggedIn} onLogin={authenticateUser} />
            </Route>

            <ProtectedRoute exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards} />
          </Switch>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlaceOpened}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpened} />

          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            buttonText="Да">
          </PopupWithForm>

          <EditAvatarPopup
            isOpen={isEditAvatarOpened}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
        </div>
      </CurrentUserContext.Provider>

    </>
  );
};

export default withRouter(App);
