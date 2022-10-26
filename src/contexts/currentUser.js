import React, { useState, useCallback, useEffect } from 'react'

import { getCurrentUser } from '../api/apiCaller'

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const token = localStorage.getItem('token')

  useEffect(() => {
    getCurrentUser(token).then(user => {
      setCurrentUser(user.data.user)
    })
  }, [])

  const createCurrentUser = useCallback((user) => {
    setCurrentUser(user)
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, createCurrentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
