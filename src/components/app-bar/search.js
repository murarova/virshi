import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import "./search.scss"
import { useSearch } from '../../hooks/use-search';
import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export function Search() {
  const { search, updateSearch } = useSearch();
  const [ isSearchOpen, setIsSearchOpen ] = useState(false)

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  function handleCloseSearch() {
    updateSearch("")
    setIsSearchOpen(false)
  }

  return (
    <div className="search">
      { isSearchOpen
        ? (
          <ClickAwayListener onClickAway={ handleCloseSearch }>
            <div>
              <div className="search__icon-wrapper">
                <SearchIcon />
              </div>
              <input
                className="search__input"
                placeholder="Search…"
                value={ search }
                onChange={ handleChange } variant="outlined" />
            </div>
          </ClickAwayListener>
        )
        : (
          <IconButton onClick={ () => setIsSearchOpen(true) } size="large">
            <SearchIcon />
          </IconButton>
        ) }
    </div >
  )
}
