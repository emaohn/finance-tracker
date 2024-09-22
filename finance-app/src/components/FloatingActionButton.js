import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/Book';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import ExpenseDetailsPopup from './ExpenseDetailsPopup'

const actions = [
  { icon: <AttachMoneyIcon />, name: 'Expense' },
  { icon: <EqualizerIcon />, name: 'Budget' },
  { icon: <BookIcon />, name: 'Notebook' },
  { icon: <AccountBalanceIcon />, name: 'Net Worth' },
];

const speedDialStyle = {
  position: 'fixed',
  bottom: '50px', // Adjust as needed
  left: '50px', // Adjust as needed
  zIndex: 9999, // Ensure it stays on top of everything
};


export default function FloatingActionButton({ refreshExpenses }) {
  const [selected, setSelected] = React.useState('');

  const handleClose = () => setSelected('');

  return (
    <div>
      <ExpenseDetailsPopup open={selected == "Expense"} handleClose={handleClose} refreshExpenses={refreshExpenses}/>
      <SpeedDial
        style={speedDialStyle}
        ariaLabel="SpeedDial basic example"
        // sx={{ position: 'absolute', top: 100, right: 50 }}
        icon={<SpeedDialIcon />}
        direction="right"
        >
        {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setSelected(action.name)}
            />
        ))}
      </SpeedDial>
    </div>
  );
}