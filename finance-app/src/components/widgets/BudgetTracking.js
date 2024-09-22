import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

const budgets = [
  { budgetName: "grocery", spent: 5, budgetAmount: 10, budgetType: "monthly" },
  {
    budgetName: "shopping",
    spent: 12,
    budgetAmount: 10,
    budgetType: "monthly",
  },
  {
    budgetName: "transportation",
    spent: 7,
    budgetAmount: 10,
    budgetType: "monthly",
  },
  { budgetName: "dining", spent: 15, budgetAmount: 10, budgetType: "monthly" },
  {
    budgetName: "entertainment",
    spent: 2,
    budgetAmount: 10,
    budgetType: "monthly",
  },
  { budgetName: "travel", spent: 9, budgetAmount: 10, budgetType: "yearly" },
  { budgetName: "dashi", spent: 1, budgetAmount: 10, budgetType: "yearly" },
  {
    budgetName: "special occasion",
    spent: 3,
    budgetAmount: 10,
    budgetType: "yearly",
  },
];

export default function BudgetTracking() {
  return (
    <Box>
      <Typography variant="overline">Budget Tracking</Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Budget</TableCell>
              <TableCell align="right">% Reached</TableCell>
              <TableCell align="right">Budget Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((row) => (
              <TableRow
                key={row.budgetName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.budgetName}
                </TableCell>
                <TableCell align="right">
                  <LinearProgress
                    variant="determinate"
                    value={(row.spent / row.budgetAmount) * 100}
                  />
                  {(row.spent / row.budgetAmount) * 100}%
                </TableCell>
                <TableCell align="right">{row.budgetType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
