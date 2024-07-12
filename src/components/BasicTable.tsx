import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,  { tableCellClasses }from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

export interface Row {
  rangeHours: string;
  windDirection: string;
  windSpeed: string;
  windGust : string;
  clouds : string
  visibility : string;
}

interface Config {
  rows: Array<Row>
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#276F55",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#8DD6E1",
    color: theme.palette.common.white, 
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function BasicTable({ rows: initialRows }: Config) {
  let [rows, setRows] = useState<Array<Row>>([]);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Rango de horas</StyledTableCell>
            <StyledTableCell align="right">Direccion del viento</StyledTableCell>
            <StyledTableCell align="right">Velocidad del viento</StyledTableCell>
            <StyledTableCell align="right">Rafagas de Viento</StyledTableCell>
            <StyledTableCell align="right">Nubes</StyledTableCell>
            <StyledTableCell align="right">Visibilidad</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.rangeHours} // Assuming rangeHours is unique for each row
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rangeHours}
              </TableCell>
              <TableCell align="right">{row.windDirection}</TableCell>
              <TableCell align="right">{row.windSpeed}</TableCell>
              <TableCell align="right">{row.windGust}</TableCell>
              <TableCell align="right">{row.clouds}</TableCell>
              <TableCell align="right">{row.visibility}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
