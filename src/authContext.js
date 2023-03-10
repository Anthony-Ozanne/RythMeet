import React, { createContext, useState, useEffect } from 'react';
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export function Provider({ children }) {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['rythmeet_user'])
  const login = (user, tokenExpires) => {
    setCookie('rythmeet_user', user, {'expires': new Date(tokenExpires * 1000), 'path': '/'});
  };

  const updateUser = (updatedUser) => {
    setCookie('rythmeet_user', updatedUser, {path:'/'})
  }

  const logout = () => {
    removeCookie('rythmeet_user', {path:"/"})
    console.log()
  };

 

  return (
    <AuthContext.Provider value={{
    //  getUser,
      currentUser: cookies.rythmeet_user,
      login,
      logout,
      updateUser
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
