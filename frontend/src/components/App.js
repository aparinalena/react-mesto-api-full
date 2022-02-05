import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { register, authorize, getContent } from "../utils/Auth";
import { api } from "../utils/Api";
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

  const [cardId, setCardId] = useState("");
  // const [userLoginData, setUserLoginData] = useState("");
  const history = useHistory();

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

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
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

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRemovePlacePopupOpen(false);
    setSelectedCard(null);
  }

  function openRegisterPopup() {
    setIsTooltipOpen(!isTooltipOpen);
  }

  function closeRegisterPopup() {
    setIsTooltipOpen(false);
    if (isAuth) {
      history.push("/signin");
    }
  }

  function handleUpdateUser(user) {
    api
      .saveUserChanges(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(user) {
    api
      .changeAvatar(user.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .postCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleRegister = (email, password) => {
    return register(email, password)
      .then(() => {
          setIsAuth(true);
          openRegisterPopup();
          history.push("/signin");
      })
      .catch((err) => {
        setIsAuth(false);
        openRegisterPopup();
        console.log(`Произошла ошибка: ${err}`);
        history.push("/signup");
      });
  };

  const handleLogin = (email, password) => {
    // const { email, password } = data;
    // setUserLoginData(email);
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          setIsAuth(true);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsAuth(false);
        setIsTooltipOpen(true);
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {

      getContent(localStorage.token)
        .then(() => {
            setLoggedIn(true);
            history.push("/");
            // setUserLoginData(currentUser.email);
        })
        .catch((err) => {
          setIsTooltipOpen(true);
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [history]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/");
  //   }
  // }, [history, loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/signin");
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((item) => (item._id === cardId ? null : item)));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleTrashClick = (card) => {
    setIsRemovePlacePopupOpen(true);
    setCardId(card._id);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header
        headerText={"Выйти"}
        loggedIn={loggedIn}
        link="/signin"
        logout={handleLogout} 
        userLoginData={currentUser.email} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            cards={cards}
            loggedIn={loggedIn}
            // logout={handleLogout}
            // userLoginData={currentUser.email}
            component={Main}
            onCardLike={handleCardLike}
            onCardDelete={handleTrashClick}
            onEditAvatarPopupOpen={handleEditAvatarClick}
            onEditProfilePopupOpen={handleEditProfileClick}
            onAddPlacePopupOpen={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
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

        <InfoTooltip
          successedReg="Вы успешно зарегистрировались!"
          failedReg="Что-то пошло не так! Попробуйте ещё раз."
          isOpen={isTooltipOpen}
          onClose={closeRegisterPopup}
          isRegSuccess={isAuth}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
