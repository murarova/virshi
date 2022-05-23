import { createContext, useContext } from 'react';

const SearchContext = createContext({
  search: "", 
  updateSearch(){}
});

export const SearchContextProvider = (props) => <SearchContext.Provider { ...props } />;

export const useSearch = () => {
  const context = useContext(SearchContext);

  return context;
};

SearchContextProvider.displayName = 'SearchProvider';
