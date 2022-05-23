import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar as MuiAppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useFirebase } from 'react-redux-firebase'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { makeContents, sortByDateTime } from '../../utils/utils';
import { Search } from './search';
import { HashLink as Link } from 'react-router-hash-link';
import { AddPoem } from '../add-poem/add-poem';
import AddIcon from '@mui/icons-material/Add';
import "./app-bar.scss"
import CustomButton from '../button/button';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/use-auth';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));

export function AppBar() {
  const firebase = useFirebase()
  const [ isOpen, setIsOpen ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const poems = useSelector((state) => state.ordered.poems)
  const sortedPoems = poems ? [...poems ].sort(sortByDateTime) : [];
  const listOfContents = makeContents(sortedPoems)
  const { isLoggedIn } = useAuth()

  const navigate = useNavigate();

  function handleLogout() {
    setIsOpen(false)
    firebase.logout()
    navigate('/', { replace: true });
  }

  const list = () => (
    <Box
      sx={ { width: 250 } }
      role="presentation"
      onClick={ () => setIsOpen(false) }
      onKeyDown={ () => setIsOpen(false) }
    >
      <List>
        { listOfContents.map(({ title, link }) => (
          <ListItem button key={ title }>
            <Link smooth to={ {
              pathname: "/",
              hash: `#${ link }`,
            } }>{ title }</Link>
          </ListItem>
        )) }
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={ { flexGrow: 1, alignItems: "center", } }>
        <MuiAppBar position="fixed" sx={ {
          boxShadow: 0,
          backgroundColor: "#ffffff",
          color: "#000000",

        } }>
          <StyledToolbar>
            <Search />
            { isLoggedIn && <IconButton size="large" sx={ { ml: 2 } } onClick={ handleOpen }>
              <AddIcon />
            </IconButton> }
            <IconButton
              size="large"
              onClick={ () => setIsOpen(true) }
              sx={ { ml: 2 } }
            >
              <MenuIcon />
            </IconButton>
          </StyledToolbar>
        </MuiAppBar>
      </Box>
      <Drawer
        anchor="right"
        open={ isOpen }
        onClose={ () => setIsOpen(false) }
      >
        { list() }
        { isLoggedIn && <CustomButton sx={ {
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
        } }
          color="inherit"
          onClick={ handleLogout }>
          Logout
        </CustomButton> }
      </Drawer>
      { openModal && <AddPoem handleClose={ handleClose } /> }
    </>
  );
}

