import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function Remarks(props) {
  const reports = {};
  props.reports.forEach(({reportId, title}) => {
    reports[reportId] = title;
  });
  return (
    <React.Fragment>
      <Title>Remarks</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Report Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.comments.map((comment, idx) => {
            if(reports[comment.reportId])
            return (
              <TableRow key={idx}>
                <TableCell>{comment.reportId}</TableCell>
                <TableCell>{reports[comment.reportId]}</TableCell>
                <TableCell>{comment.description}</TableCell>
              </TableRow>
            );
            return null;
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
