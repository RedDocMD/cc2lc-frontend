import { Link, Box, Alert, Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { monthToName } from "./utils";

export default function Months({ months, monthsFetchFailed }) {
  if (monthsFetchFailed !== null) {
    return (
      <Alert severity="error">
        Failed to fetch month list
      </Alert>
    );
  } else {
    const rows = months.map(({ month, year }, idx) => {
      const monthName = monthToName(month);
      return (
        <TableRow key={idx}>
          <TableCell align="left">{monthName}</TableCell>
          <TableCell align="left">{year}</TableCell>
          <TableCell align="left">
            <Link component={RouterLink} to={`/${month}-${year}`}>Games</Link>
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