import { Box, Container, Grid, Typography } from "@mui/material";
import Months from "./Months";

function App() {
  return (
    <Box mt={5}>
      <Container>
        <Grid container alignItems="center" spacing={5}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Typography align="center" variant="h2">
              Chess.com Games
            </Typography>
          </Grid>
          <Grid item xs={3} />

          <Grid item xs={2} />
          <Grid item xs={8}>
            <Months />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
