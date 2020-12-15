import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import {useStore} from '../App';

export default function Info(props) {
  const {firstName, lastName} = useStore(state => state.user);
  return (
    <React.Fragment>
      <Title justify="center">{firstName + " " + lastName}</Title>
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
