import React from 'react'
import {  Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

export function PublicRoute({ children }) {
  const auth = useSelector((state) => state.firebase.auth)
  const isLoggedIn = isLoaded(auth) && !isEmpty(auth)
  return isLoggedIn ? <Navigate to="/admin" /> : children;
}

