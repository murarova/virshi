import TextareaAutosize from 'react-textarea-autosize';
import { useState } from "react";
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import "./add-poem.scss"
import CustomButton from '../button/button';

export function AddPoem({ handleClose }) {

  const lastOrderNumber = useSelector((state) => state.orderNumberReducer.lastOrderNumber)


  const [ title, setTitle ] = useState("");
  const [ text, setText ] = useState("");
  const [ date, setDate ] = useState("");
  const [ error, setError ] = useState(null);

  const firebase = useFirebase()

  function resetValue() {
    setTitle("")
    setText("")
    setDate("")
    handleClose()
  }

  function handleSubmit() {
    if (!text) {
      setError("Text field can't be empty")
      return
    }
    const newPoem = {
      title,
      text,
      date,
      orderNumber: lastOrderNumber + 1
    }
    firebase.pushWithMeta('poems', newPoem, () => resetValue())
  }

  return (
    <div>
      <Modal
        open
        onClose={ handleClose }
      >
        <div className="add-poem-wrapper">
          <input type="text" placeholder='title' value={ title } onChange={ e => setTitle(e.target.value) } />
          <TextareaAutosize
            placeholder='text'
            minRows="5"
            maxRows="15"
            cacheMeasurements
            value={ text }
            onChange={ e => setText(e.target.value) }
          />
          <input type="text" placeholder='date' value={ date } onChange={ e => setDate(e.target.value) } />
          <CustomButton variant="outlined" onClick={ handleSubmit }>Add poem</CustomButton>
          { error && <p className="add-poem__error">{ error }</p> }
        </div>
      </Modal>

    </div>
  );
}

