import * as React from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TagsEditor from './TagsEditor';

import {
  addExpense
} from "../firebaseHelpers/firestoreHelper"

  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const createNewStr = "Create new tag '"

export default function ExpenseDetailsPopup({handleClose, open, refreshExpenses}) {
  const [name, setName] = React.useState('')
  const [amount, setAmount] = React.useState(0)
  const [split, setSplit] = React.useState(1)
  const [timestamp, setTimestamp] = React.useState(dayjs())
  const [tags, setTags] = React.useState([])
  const [primaryTag, setPrimaryTag] = React.useState("")
  const [recurring, setRecurring] = React.useState(false)

  const getNumField = (event) => {
    const val = parseFloat(event.target.value)
    if (!isNaN(val)) {
      return val
    }
  }

  const resetState = () => {
    console.log("resetting state")
    setName('')
    setAmount(0)
    setSplit(1)
    setTimestamp(dayjs())
    setTags([])
    setPrimaryTag("")
  }

  const onDone = () => {
    console.log("onDone")
    addExpense({
      name: name == '' ? "Untitled Expense" : name,
      amount: amount,
      split: split,
      date: timestamp.toDate(),
      tags: tags.filter(tag => tag !== primaryTag),
      primaryTag: primaryTag
    })
    handleClose()
    resetState()
    refreshExpenses()
  }

  const onClose = () => {
    console.log("closing popup")
    resetState()
    handleClose()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction="column" spacing={2} alignItems="stretch">
            <Grid item >
              <TextField sx={{ width: '100%' }} label="Expense Name" variant="standard" value={name} onChange={(event) => setName(event.target.value)}/>
            </Grid>
            <Grid container item direction="row" justifyContent="space-between" spacing={2}>
              <Grid item xs={7}>
                <TextField label="Amount" variant="standard" type="number" value={amount} onChange={(event) => setAmount(getNumField(event))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField label="Split By" variant="standard" type="number" value={split} onChange={(event) => setSplit(getNumField(event))}/>
              </Grid>
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                  <DatePicker
                    label="Controlled picker"
                    value={timestamp}
                    onChange={(newValue) => setTimestamp(newValue)}
                    sx={{ width: '100%' }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <TagsEditor tags={tags} onTagsUpdated={setTags} primaryTag={primaryTag} setPrimaryTag={setPrimaryTag}/>
            </Grid>
            <Grid container item direction="column" alignItems="flex-end">
              <Grid item>
                <Button variant="text" onClick={onDone}>Create</Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}