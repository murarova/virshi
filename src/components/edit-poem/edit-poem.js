import TextareaAutosize from 'react-textarea-autosize';
import { useState } from "react";
import { useFirebase } from 'react-redux-firebase'
import Modal from '@mui/material/Modal';
import moment from 'moment';
import "./edit-poem.scss"
import CustomButton from '../button/button';

export function EditPoem({ id, handleClose, currentPoem }) {
  const { title, text, date } = currentPoem;

  const [ newTitle, setNewTitle ] = useState(title);
  const [ newText, setNewText ] = useState(text);
  const [ error, setError ] = useState(null);

  const firebase = useFirebase()

  function resetValue() {
    setNewTitle("")
    setNewText("")
    handleClose()
  }

  function handleSubmit() {
    if (!text) {
      setError("Text field can't be empty")
      return
    }
    const updatedPoem = {
      title: newTitle,
      text: newText,
    }
    firebase.update(`poems/${ id }`, updatedPoem, () => resetValue())
  }

  return (
    <div>
      <Modal
        open
        onClose={ handleClose }
      >
        <div className="edit-poem-wrapper">
          <input type="text" placeholder='title' value={ newTitle } onChange={ e => setNewTitle(e.target.value) } />
          <TextareaAutosize
            placeholder='text'
            minRows="5"
            maxRows="15"
            cacheMeasurements
            value={ newText }
            onChange={ e => setNewText(e.target.value) }
          />
          <p style={ { alignSelf: "flex-start" } }>{ moment(date).format("YYYY/MM/DD") }</p>
          <CustomButton onClick={ handleSubmit }>Edit poem</CustomButton>
          { error && <p className="edit-poem__error">{ error }</p> }
        </div>
      </Modal>

    </div>
  );
}

