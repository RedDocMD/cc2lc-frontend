import { Box, Alert, Link, Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Months() {
  const [months, setMonths] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(null);

  useEffect(() => {
    const url = 'https://cc2lc.chess.reddocmd.dev/months';
    axios.get(url)
      .then((resp) => {
        setFetchFailed(null);
        setMonths(resp.data);
      })
      .catch((err) => {
        setFetchFailed(err);
      });
  }, []);

  if (fetchFailed !== null) {
    return (
      <Alert severity="error">
        Failed to fetch month list
      </Alert>
    );
  } else {
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const rows = months.map(({ month, year }, idx) => {
      const monthName = monthNames[month - 1];
      return (
        <TableRow key={idx}>
          <TableCell align="left">{monthName}</TableCell>
          <TableCell align="left">{year}</TableCell>
          <TableCell align="left">
            <Link href="#">Games</Link>
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
                <TableCell align="left">Month</TableCell>
                <TableCell align="left">Year</TableCell>
                <TableCell align="left">Link</TableCell>
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