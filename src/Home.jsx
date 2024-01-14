import { Box, Container, Grid, Typography } from "@mui/material";
import Months from "./Months";

export default function Home({ months, monthsFetchFailed }) {
  return (
    <Box mt={5}>
      <Container>
        <Grid container alignItems="center" spacing={5}>
          <Grid item xs={1} md={3} />
          <Grid item xs={10} md={6} >
            <Typography align="center" variant="h2">
              Chess.com Games
            </Typography>
          </Grid>
          <Grid item xs={1} md={3} />

          <Grid item xs={0} md={2} />
          <Grid item xs={12} md={8}>
            <Months months={months} monthsFetchFailed={monthsFetchFailed} />
          </Grid>
          <Grid item xs={0} md={2} />
        </Grid>
      </Container>
    </Box>
  );
}