import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as Auth from "../utils/Auth";
import  api  from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePoppup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import RemovePlacePopup from "./RemovePlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import "../index.css";

function App() {
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("mousedown", handleOverlayClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("mousedown", handleOverlayClose);
    };
  });

  useEffect(() => {
    if (loggedIn === true) {
    Promise.all([api.getCards(), api.getUserInfo()])
      .then(([cards, userData]) => {
        setCards(cards);
        setCurrentUser(userData.user);
      })
      .catch((err) => {
        console.log(err);
      })};
  }, [loggedIn]);
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Auth.getContent(localStorage.token)
        .then(() => {
            setLoggedIn(true);
            history.push("/");
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [history]);
  
  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/signin");
  };

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then(() => {
        setIsTooltipOpen(true);
        setIsAuth(true);
        history.push("/signin");
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsAuth(false);
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  function handleLogin(email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsAuth(false);
        console.log(`Произошла ошибка: ${err}`);
      });
  };
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(item => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .saveUserChanges({ name, about })
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(url) {
    const data = { avatar: url };
    api
      .changeAvatar(data)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleTrashClick = (card) => {
    // setIsRemovePlacePopupOpen(true);
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRemovePlacePopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard({});
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header loggedIn={loggedIn} logout={handleLogout} userLoginData={currentUser.email} />
        <Switch>
          <ProtectedRoute
            component={Main}
            exact
            path="/"
            cards={cards}
            loggedIn={loggedIn}
            onCardLike={handleCardLike}
            onCardDelete={handleTrashClick}
            onEditAvatarPopupOpen={handleEditAvatarClick}
            onEditProfilePopupOpen={handleEditProfileClick}
            onAddPlacePopupOpen={handleAddPlaceClick}
            onCardClick={handleCardClick}
          ></ProtectedRoute>

          <Route path="/signin">
            <Login handleLogin={handleLogin} onClose={closeAllPopups}/>
          </Route>

          <Route path="/signup">
            <Register handleRegister={handleRegister} onClose={closeAllPopups}/>
          </Route>

        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePoppup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <Footer />

        <RemovePlacePopup
          isOpen={isRemovePlacePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          successedReg="Вы успешно зарегистрировались!"
          failedReg="Что-то пошло не так! Попробуйте ещё раз."
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isRegSuccess={isAuth}
        />

      </div>
    </CurrentUserContext.Provider>
    </>
  );
}

export default App;
