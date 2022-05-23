import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from "react-redux";
import { Poem } from '../poem/poem';
import { sortByDateTime } from '../../utils/utils';
import "./poems-list.scss"
import { useFirebaseConnect } from 'react-redux-firebase'
import { useSearch } from '../../hooks/use-search';


export function PoemsList() {
  useFirebaseConnect([ { path: 'poems' } ])

  const poems = useSelector((state) => state.ordered.poems)
  const { search } = useSearch();

  const sortedPoems = poems ? [...poems ].sort(sortByDateTime) : [];

  const filteredPoems = sortedPoems?.filter(({ value }) =>
    value.text.toLowerCase().includes(search.toLowerCase()) || value.title.toLowerCase().includes(search.toLowerCase()))

  function renderPoems() {
    if (!isLoaded(sortedPoems)) {
      return <p style={ { marginTop: "3rem" } }>Loading...</p>
    }
    return isEmpty(sortedPoems)
      ? (
        <p>Nothing found</p>
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
