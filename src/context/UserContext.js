import React from "react";
import axios from "axios";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, nom_utilisateur: action.nom_utilisateur, prenom_utilisateur: action.prenom_utilisateur, id_utilisateur: action.id_utilisateur };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    nom_utilisateur: localStorage.getItem("nom_utilisateur"),
    prenom_utilisateur: localStorage.getItem("prenom_utilisateur"),
    id_utilisateur: localStorage.getItem("id_utilisateur"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  axios
    .get(
      process.env.REACT_APP_API_CHECKLOGIN + login + '/' + password,
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      },
    )
    .then(response => {
      if (response.data.id_utilisateur) {
        setTimeout(() => {
          localStorage.setItem('id_token', 1)
          localStorage.setItem('nom_utilisateur', response.data.nom_utilisateur)
          localStorage.setItem('prenom_utilisateur', response.data.prenom_utilisateur)
          localStorage.setItem('id_utilisateur', response.data.id_utilisateur)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS', nom_utilisateur: response.data.nom_utilisateur, prenom_utilisateur: response.data.prenom_utilisateur, id_utilisateur: response.data.id_utilisateur })

          history.push('/app/dashboard')
        }, 2000);
      } else {
        dispatch({ type: "LOGIN_FAILURE", nom_utilisateur: "" });
        setError(true);
        setIsLoading(false);
      }

    })
    .catch(error => {
      console.log("login error", error);
    });


}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
