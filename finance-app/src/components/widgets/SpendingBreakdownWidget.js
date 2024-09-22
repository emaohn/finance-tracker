import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DonutGraph from "./DonutGraph";

export default function SpendingBreakdownWidget({ expenses }) {
  const aggTags = () => {
    const tagTotals = {};

    // Calculate totals for each tag
    expenses.forEach((expense) => {
      const { amount, primaryTag } = expense;
      if (tagTotals[primaryTag]) {
        tagTotals[primaryTag] += amount;
      } else {
        tagTotals[primaryTag] = amount;
      }
    });

    // Convert tagTotals to an array of objects
    const result = Object.keys(tagTotals).map((tag) => ({
      label: tag,
      value: tagTotals[tag],
    }));

    return result;
  };

  return (
    <Box>
      <Typography variant="overline" gutterBottom color="text.secondary">
        Spending Breakdown
      </Typography>
      <Grid container direction="row" mb={5}>
        <Grid item xs></Grid>
        <Grid item>
          <DonutGraph data={aggTags()}/>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>
  );
}
