import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector, useDispatch } from "react-redux";
import { Poem } from '../poem/poem';
import { sortByOrderNumber } from '../../utils/utils';
import "./poems-list.scss"
import { useFirebaseConnect } from 'react-redux-firebase'
import { useSearch } from '../../hooks/use-search';
import { useEffect } from 'react';
import { setOrderNumber } from "../../redux/orderNumberReducer";


export function PoemsList() {
  useFirebaseConnect([ { path: 'poems' } ])
  const dispatch = useDispatch();

  const poems = useSelector((state) => state.firebase.ordered.poems)
  const { search } = useSearch();

  useEffect(() => {
    dispatch(setOrderNumber(poems?.length))
  }, [ poems, dispatch ])



  const sortedPoems = poems
    ? [ ...poems ].sort(sortByOrderNumber)
    : [];

  const filteredPoems = sortedPoems?.filter(({ value }) =>
    value.text.toLowerCase().includes(search.toLowerCase()) || value.title.toLowerCase().includes(search.toLowerCase()))

  function renderPoems() {
    if (!isLoaded(poems)) {
      return <p style={ { marginTop: "3rem" } }>Loading...</p>
    }
    return isEmpty(poems)
      ? (
        <p style={ { marginTop: "3rem" } }>Nothing found</p>
      )
      : (
        filteredPoems?.map(({ value, key }) => <Poem key={ key } id={ key } poem={ value } />)
      )
  }
  return (
    <div id="text" className="poems-list">
      { renderPoems() }
    </div>
  )
}
