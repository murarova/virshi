import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isLoaded, isEmpty } from 'react-redux-firebase'

export function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.firebase.auth)
  return isLoaded(auth) && !isEmpty(auth) ? children : <Navigate to="/login" />;
}

