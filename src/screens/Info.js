import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Grid from '@material-ui/core/Grid';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  infoContext: {
    flex: 1,
  },
});

export default (props) => {
  const classes = useStyles();
  console.log(props);
  return (
    <React.Fragment>
      <Title justify="center">{props.firstName + " " + props.lastName}</Title>
      {
        props.studentId &&
        <>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item xs={12}>
              <Typography color="textSecondary" className="text-center">
                Student Id
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" variant="h4" className="text-center">
                {props.studentId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" className="text-center">
                {"DOB: " + new Date(props.dob).toString().substr(0, 15)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" className="text-center">
                {" Year: " + props.year}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" className="text-center">
                {props.address}
              </Typography>
            </Grid>

          </Grid>
        </>
      }
      {
        props.teacherId &&
        <>
          <div className="logo-teacher"></div>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <Typography color="textSecondary" className="text-center">
                Teacher Id
          </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" variant="h4" className="text-center">
                {props.teacherId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" className="text-center">
                {" User ID: " + props.userId}
              </Typography>
            </Grid>
          </Grid>
        </>
      }
    </React.Fragment>
  );
}
