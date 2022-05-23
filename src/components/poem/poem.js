import { useSearch } from "../../hooks/use-search";
import { getHighlightedText, makeContent } from "../../utils/utils";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useFirebase } from 'react-redux-firebase'
import moment from 'moment';
import "./poem.scss"
import { useState } from "react";
import { EditPoem } from "../edit-poem/edit-poem";
import { useAuth } from "../../hooks/use-auth";

export function Poem({ poem, id }) {
  const firebase = useFirebase()
  const { title, text, date } = poem;
  const { search } = useSearch();
  const { link } = makeContent(poem);
  const { isLoggedIn } = useAuth()

  const [ isEdit, setIsEdit ] = useState(false);

  function handleDeletePoem() {
    firebase.remove(`poems/${ id }/`)
  }

  return (
    <>
      <div className="poem-item">
        <span id={ link } className="poem-item__link" />
        <div className="poem-item__title-wrapper">
          <span className="poem-item__title">
            { title ? getHighlightedText(title, search) : "* * *" }
          </span>
          { isLoggedIn && <div className="poem-item__admin-buttons">
            <IconButton onClick={ () => setIsEdit(true) }>
              <EditIcon />
            </IconButton>
            <IconButton sx={ { ml: 1 } } onClick={ handleDeletePoem }>
              <DeleteIcon />
            </IconButton>
          </div> }
        </div>


        <pre>{ getHighlightedText(text, search) }</pre>
          { date && <span className="poem-item__date">{ moment(date).format("YYYY/MM/DD") }</span> }
      </div>
      {
        isEdit && <EditPoem id={ id }
          handleClose={ () => setIsEdit(false) }
          currentPoem={ poem } />
      }
    </>

  )
}
