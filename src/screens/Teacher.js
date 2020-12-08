import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SettingsPower from '@material-ui/icons/SettingsPower';
import Info from './Info';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Title from './Title';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Performance Monitor
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 36,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 550,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const history = useHistory();
    const [studentId, setStudentId] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [reportId, setReportId] = useState('');
    const [comment, setComment] = useState('');
    const [year, setYear] = useState('');
    const [title1, setTitle1] = useState('');
    const [title2, setTitle2] = useState('');
    const [data, setData] = useState({});
    const [subjects, setSubjects] = useState({});
    const [obtainedMarks, setObtainedMarks] = useState('');
    const [maximumMarks, setMaximumMarks] = useState('');
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState('Logged In Successfully as ' + localStorage.getItem('username'));
    const [showForm, setShowForm] = useState(true);
    const handleCreateReport = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8080/api/reports/create', JSON.stringify({
            studentId: studentId.toString(),
            subjectId: subjectId.toString(),
            year: year.toString(),
            title: title1 + " " + title2,
            obtainedMarks: obtainedMarks.toString(),
            maximumMarks: maximumMarks.toString()
        }), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            if (response.data.payload != null && response.data.payload != undefined) {
                setReportId(response.data.payload);
                if (comment.length == 0) return;
                axios.post('http://localhost:8080/api/comments/create', JSON.stringify({
                    reportId: response.data.payload.toString(),
                    description: comment.toString()
                }), {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    console.log(response);
                    setMessage('Report Generated Successfully');
                    setOpen(true);
                })
                    .catch(err => {
                        setMessage('Please Check Form Details');
                        setOpen(true);
                    })
            }
            else {
                setMessage('Please Check Form Details');
                setOpen(true);
            }
        })
            .catch(err => {
                setMessage('Please Check Form Details');
                setOpen(true);
            });
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/api/users/info/teacher', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setData(response.data.payload)
            })
            .catch(function (error) {
                console.log(error);
                setMessage('Error Occurred');
                setOpen(true);
            })
            .then(() => {
                axios.get('http://localhost:8080/api/users/info/teacher-subject', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        setSubjects(response.data.payload)
                        if (response.data.payload.length > 0)
                            setSubjectId(response.data.payload[0])
                        else {
                            setMessage('No Subject Assigned');
                            setOpen(true);
                            setShowForm(false);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        setMessage('Error Occurred');
                        setOpen(true);
                    })
            })
    }, []);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <AppBar position="absolute" className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Teacher Dashboard
          </Typography>
                    <IconButton color="inherit" onClick={() => history.push('/')} >
                        <SettingsPower />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                { showForm && <form className={classes.form} noValidate onSubmit={event => handleCreateReport(event)}>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item xs={4}>
                                            <FormControl variant="filled" className={classes.formControl}>
                                                <InputLabel htmlFor="subjectId">Subject Id</InputLabel>
                                                <Select
                                                    native
                                                    fullWidth
                                                    value={subjectId}
                                                    onChange={event => setSubjectId(event.target.value)}
                                                    inputProps={{
                                                        name: 'subjectId',
                                                        id: 'subjectId',
                                                    }}
                                                >
                                                    {
                                                        subjects.length && subjects.map(subjectId => <option value={subjectId}>{subjectId}</option>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="studentId"
                                                fullWidth
                                                label="Student Id"
                                                name="studentId"
                                                autoComplete="studentId"
                                                autoFocus
                                                value={studentId}
                                                onChange={event => setStudentId(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                name="year"
                                                label="Year"
                                                type="year"
                                                id="year"
                                                fullWidth
                                                autoComplete="year"
                                                value={year}
                                                onChange={event => setYear(event.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} alignItems="center" justify="center">
                                        <Grid item xs={3}>
                                            <FormControl variant="filled" className={classes.formControl}>
                                                <InputLabel htmlFor="title1">Type</InputLabel>
                                                <Select
                                                    native
                                                    value={title1}
                                                    onChange={event => setTitle1(event.target.value)}
                                                    inputProps={{
                                                        name: 'title1',
                                                        id: 'title1',
                                                    }}
                                                >
                                                    <option value="Weekly">Weekly</option>
                                                    <option value="Montly">Monthly</option>
                                                    <option value="Yearly">Yearly</option>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                required
                                                name="title2"
                                                label="Report Title"
                                                id="title2"
                                                autoComplete="title2"
                                                value={title2}
                                                onChange={event => setTitle2(event.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="obtainedMarks"
                                                label="Obtained Marks"
                                                name="obtainedMarks"
                                                autoComplete="obtainedMarks"
                                                autoFocus
                                                value={obtainedMarks}
                                                onChange={event => setObtainedMarks(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="maximumMarks"
                                                label="Maximum Marks"
                                                id="maximumMarks"
                                                autoComplete="maximumMarks"
                                                value={maximumMarks}
                                                onChange={event => setMaximumMarks(event.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                name="comment"
                                                multiline
                                                rows={4}
                                                fullWidth
                                                label="Remarks (Optional)"
                                                id="comment"
                                                autoComplete="comment"
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Generate Report
                                    </Button>
                                </form>}
                                {!showForm && 
                                <Title>No subjects are assigned to you yet!</Title>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Info teacherId={data.teacherId} firstName={localStorage.getItem('firstName')} lastName={localStorage.getItem('lastName')} userId={data.userId} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
