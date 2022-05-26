import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded } from 'react-redux-firebase'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import "./login-page.scss"
import CustomButton from '../../components/button/button';
import { styled } from '@mui/material/styles';

const Input = styled(TextField)(({ theme }) => ({
  fontFamily: '"PT Mono", monospace'
}));

export function LoginPage() {
  const firebase = useFirebase()
  const auth = useSelector((state) => state.firebase.auth)
  const authError = useSelector((state) => state.firebase.authError)

  const [ credentials, setCredentials ] = useState({
    email: '',
    password: '',
  })

  const [ error, setError ] = useState(authError?.message)

  useEffect(() => {
    setError(authError?.message)
  }, [ authError ])

  const handleChange = (event) => {
    event.persist()
    setCredentials(prev => ({ ...prev, [ event.target.id ]: event.target.value }))
  }

  function loginWithEmail() {
    firebase.login(credentials)
  }

  function renderLoginPage() {
    return (
      <div className='login'>
        <Input
          sx={ { mb: 3 } }
          required
          id="email"
          value={ credentials.email }
          onChange={ handleChange }
          label="Login"
          autoComplete="e-mail"
        />
        <Input
          sx={ { mb: 3 } }
          required
          value={ credentials.password }
          type="password"
          id="password"
          label="Password"
          autoComplete="current-password"
          onChange={ handleChange }
        />
        <CustomButton sx={ { width: "fit-content" } } onClick={ loginWithEmail }>
          login
        </CustomButton>
        { error && <p>{ error }</p> }
      </div>
    )
  }

  return <Container maxWidth="md">
    { !isLoaded(auth) ? <p>Loading...</p> : renderLoginPage() }
  </Container>
}

