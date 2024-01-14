import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Grid, Alert, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Link } from '@mui/material';
import { monthToName } from './utils';

function Games({ month, year }) {
  const [games, setGames] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(null);

  useEffect(() => {
    const url = `https://cc2lc.chess.reddocmd.dev/games/${year}/${month}`;
    axios.get(url)
      .then((resp) => {
        setFetchFailed(null);
        setGames(resp.data);
      })
      .catch((err) => {
        setFetchFailed(err);
      });
  }, [month, year]);

  if (fetchFailed !== null) {
    return (
      <Alert severity="error">
        Failed to fetch month list
      </Alert>
    );
  } else {
    const playerEntry = (id, rating, url) => {
      return (
        <TableCell align="left">
          <Link href={url}>{id}</Link>
          {` (${rating})`}
        </TableCell>
      );
    };

    const parseResult = (result) => {
      if (result === "white") {
        return "1 - 0";
      } else if (result === "black") {
        return "0 - 1";
      } else {
        return "1/2 - 1/2";
      }
    };

    const parseTimeControl = (timeControl) => {
      const parts = timeControl.split('+');
      if (parts.length === 1) {
        const min = parseInt(parts[0]) / 60;
        return `${min} + 0`;
      } else {
        const min = parseInt(parts[0]) / 60;
        const incr = parseInt(parts[1]);
        return `${min} + ${incr}`;
      }
    };

    const rows = games.map((game, idx) => {
      const white = playerEntry(game.white, game.white_rating, game.white_url);
      const black = playerEntry(game.black, game.black_rating, game.black_url);
      const result = parseResult(game.result);
      const timeControl = parseTimeControl(game.time_control);

      return (
        <TableRow key={idx}>
          {white}
          {black}
          <TableCell align="left">{result}</TableCell>
          <TableCell align="left">{timeControl}</TableCell>
          <TableCell align="left">
            <Link href={game.cc_url}>Game</Link>
          </TableCell>
          <TableCell align="left">
            <Link href={game.lc_url}>Analysis</Link>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">White</TableCell>
                <TableCell align="left">Black</TableCell>
                <TableCell align="left">Result</TableCell>
                <TableCell align="left">Time Control</TableCell>
                <TableCell align="left">Chess.com</TableCell>
                <TableCell align="left">Lichess</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default function GamesPage({ month, year }) {
  return (
    <Box mt={5}>
      <Container>
        <Grid container alignItems="center" spacing={5}>
          <Grid item xs={0} md={1} />
          <Grid item xs={12} md={10}>
            <Typography align="center" variant="h2">
              {`${monthToName(month)} ${year}`}
            </Typography>
          </Grid>
          <Grid item xs={0} md={1} />

          <Grid item xs={0} md={1} />
          <Grid item xs={12} md={10}>
            <Games month={month} year={year} />
          </Grid>
          <Grid item xs={0} md={1} />
        </Grid>
      </Container>
    </Box>
  );
}