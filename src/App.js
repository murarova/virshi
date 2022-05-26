import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import { AdminPage } from "./pages/admin-page/admin-page";
import { LoginPage } from "./pages/login-page/login-page";
import { PrivateRoute } from "./components/private-route/private-route";
import { PublicRoute } from "./components/public-route/public-route";
import CssBaseline from '@mui/material/CssBaseline';
import { MainPage } from "./pages/main-page/main-page";
import { useState } from "react";
import { SearchContextProvider } from "./hooks/use-search";
import { AuthContextProvider } from "./hooks/use-auth";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";

function App() {
  const [ search, updateSearch ] = useState('');

  const auth = useSelector((state) => state.firebase.auth)
  const isLoggedIn = isLoaded(auth) && !isEmpty(auth)

  return (
    <>
      <Routes>
        <Route path="/" element={
          <AuthContextProvider value={ { isLoggedIn } }>
            <SearchContextProvider value={ { search, updateSearch } }>
              <MainPage />
            </SearchContextProvider>
          </AuthContextProvider>
        } />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AuthContextProvider value={ { isLoggedIn } }>
                <SearchContextProvider value={ { search, updateSearch } }>
                  <AdminPage />
                </SearchContextProvider>
              </AuthContextProvider>
            </PrivateRoute>
          }
        />
      </Routes>
      <CssBaseline />
    </>

  );
}

export default App;
