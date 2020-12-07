import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default (props) => {
  const classes = useStyles();
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
          })}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
}
