import React, { useEffect } from 'react';
import './App.css';

import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Login from './components/Login';
import { logoutUser, onAuthStatusChanged } from "./firebaseHelpers/authHelper"
import Navigation from './components/Navigation';
import Expenses from './pages/Expenses';
import Dashboard from './pages/Dashboard';
import Budgeting from './pages/Budgeting';
import NetWorth from './pages/NetWorth';
import FloatingActionButton from './components/FloatingActionButton';

import { getExpenses } from "./firebaseHelpers/firestoreHelper";

function App() {
  const [user, setUser] = React.useState(null)
  const [page, setPage] = React.useState("Dashboard")
  const [expenses, setExpenses] = React.useState([]);

  const refreshExpenses = () => {
    getExpenses().then(
      (value) => {
        console.log("Getting expenses from firebase: ", value);
        setExpenses(value);
      },
      (error) => {
        console.log("failed: ", error);
      }
    );
  };

  useEffect(() => {
    onAuthStatusChanged((authUser) => {
      setUser(authUser)
    })
  })

  const getDisplay = () => {
    if (page == "Expenses") {
      return <Expenses expenses={expenses} refreshExpenses={refreshExpenses}/>
    } else if (page == "Dashboard") {
      return <Dashboard expenses={expenses} refreshExpenses={refreshExpenses}/> 
    } else if (page == "Budgeting") {
      return <Budgeting />
    } else if (page == "Net Worth") {
      return <NetWorth />
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <Box>
            <FloatingActionButton refreshExpenses={refreshExpenses} />
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  Trakked
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container direction="row" >
              <Grid container item style={{width:240}}>
                <Navigation onChangeDisplay={setPage} />
              </Grid>
              <Grid item xs mx={5} my={5} style={{ flexGrow: 1 }}>
                <Toolbar />
                {
                  getDisplay()
                }
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Login />
        )}
      </header>
    </div>
  );
}

export default App;
