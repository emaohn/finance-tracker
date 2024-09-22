import React from 'react'
import ExpenseList from '../components/ExpenseList'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Expenses ({ expenses, refreshExpenses }) {

    return (
        <Grid container direction="column" spacing={5}>
            <Grid item>
                <Typography variant="h3">Expenses</Typography>
            </Grid>
            <Grid item>
                <ExpenseList expenses={expenses} refreshExpenses={refreshExpenses}/>
            </Grid>
        </Grid>
    )
}