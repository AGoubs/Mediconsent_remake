import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
            <TableCell key="typeExamens">TYPE D'EXAMENS</TableCell>
            <TableCell key="patientExamens">PATIENT</TableCell>
            <TableCell key="dateExamens">DATE</TableCell>
            <TableCell key="avisExamens">AVIS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((examens, index) => (
          <TableRow key={examens.id_examen}>
            <TableCell className="pl-3 fw-normal">{examens.type_examen.formulaire.libelle_formulaire}</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>{new Date(examens.date_examen).getDate()}/{new Date(examens.date_examen).getMonth()}/{new Date(examens.date_examen).getFullYear()}</TableCell>
            <TableCell>{examens.avis.notes} / 5</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
