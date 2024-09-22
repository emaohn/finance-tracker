import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import BarGraph from "../components/widgets/BarGraph";
import BudgetTracking from "../components/widgets/BudgetTracking";
import SpendingBreakdownWidget from "../components/widgets/SpendingBreakdownWidget";

export default function Dashboard({expenses, refreshExpenses}) {

  React.useEffect(() => {
    refreshExpenses();
  }, []);

  return (
    <Grid container direction="column" spacing={4}>
      <Grid
        container
        item
        direction="row"
        spacing={4}
        justifyContent="space-between"
        xs
      >
        <Grid item xs={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Grid
                container
                direction="row"
                xs
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <Grid
                  container
                  direction="column"
                  item
                  xs={5}
                  justifyContent="flex-end"
                >
                  <Typography variant="h3">$2,300</Typography>
                  <Typography variant="overline">Total Spendings</Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs
                  justifyContent="flex-end"
                  direction="column"
                >
                  <BarGraph />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{ height: "100%" }}
              >
                <Grid item>
                  <Typography variant="h3">$12,000</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="overline">Total Earnings</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container item direction="column" xs spacing={4}>
          <Grid item xs>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h6">$21,000</Typography>
                <Typography variant="overline">Total Liquid Cash</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h6">$250,000</Typography>
                <Typography variant="overline">Total Net Worth</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item direction="row" xs spacing={4}>
        <Grid item xs>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Grid item>
                <SpendingBreakdownWidget expenses={expenses}/>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Grid item>
                <BudgetTracking />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
