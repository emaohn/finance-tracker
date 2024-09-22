import * as React from 'react';
import Button from '@mui/material/Button';

import ExpenseDetailsPopup from './ExpenseDetailsPopup'

export default function CreateExpenseButton({ refreshExpenses }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
      <div>
        <Button variant="text" onClick={handleOpen}>New Expense</Button>
        <ExpenseDetailsPopup open={open} handleClose={handleClose} refreshExpenses={refreshExpenses}/>
      </div>
  );
}