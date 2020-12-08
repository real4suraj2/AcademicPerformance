import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SettingsPower from '@material-ui/icons/SettingsPower';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
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
    fixedHeight1: {
        height: 250,
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(12),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const history = useHistory();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);

    const [name, setName] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [kind, setKind] = useState('teacher');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [year, setYear] = useState('');
    const [open, setOpen] = useState(true);
    const [drawer, setDrawer] = useState(true);
    const [message, setMessage] = useState('Logged In Successfully as admin');
    const [selected, setSelected] = useState(0);
    const [tab, setTab] = useState('create');
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [assigned, setAssigned] = useState([]);

    const handleDrawerOpen = () => {
        setDrawer(true);
    };
    const handleDrawerClose = () => {
        setDrawer(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/api/users/info/teachers', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            setTeachers(response.data.payload);
        })
            .catch(err => console.log(err));

        axios.get('http://localhost:8080/api/subjects/info', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            setSubjects(response.data.payload);
        })
            .catch(err => console.log(err));
    }, []);
    const handleSubjectCreate = event => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8080/api/subjects/add', JSON.stringify({
            name: name.toString()
        }), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            setMessage('Subject Generated Successfully');
            setOpen(true);
        })
            .catch(err => {
                console.log(err);
                setMessage('Please check form details');
                setOpen(true);
            })

    }
    const handleSubjectAssign = event => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8080/api/subjects/assign', JSON.stringify({
            subjectId: subjectId.toString(),
            teacherId: teacherId.toString()
        }), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            setMessage('Subject Assigned Successfully');
            setOpen(true);
        })
            .catch(err => {
                console.log(err);
                setMessage('Please check form details');
                setOpen(true);
            })
    }

    const handleShowAssigned = teacherId => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8080/api/users/info/teacher-subject', JSON.stringify({
            teacherId: teacherId.toString()
        }), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                setAssigned(response.data.payload)
                setMessage('Assigned Subjects List Fetched!');
                if(response.data.payload.length == 0) {
                    setMessage('No subjects assigned to the requested teacher');
                }
                setOpen(true);
            })
            .catch(function (error) {
                console.log(error);
                setMessage('Error Occurred');
                setOpen(true);
            })
    }
    const handleUserCreate = event => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        let data = {
            firstName, lastName, kind, username, password: 'test123'
        }
        if (kind == 'student') {
            data = { ...data, address, dob, year };
        }
        axios.post('http://localhost:8080/api/users/create', JSON.stringify(
            data
        ), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            setMessage('User Generated Successfully');
            setOpen(true);
        })
            .catch(err => {
                console.log(err);
                setMessage('Please check form details');
                setOpen(true);
            })
    }
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
            <AppBar position="absolute" className={clsx(classes.appBar, drawer && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, drawer && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Student Dashboard
          </Typography>
                    <IconButton color="inherit" onClick={() => history.push('/')} >
                        <SettingsPower />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !drawer && classes.drawerPaperClose),
                }}
                open={drawer}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => { setSelected(0); setTab('create'); }} selected={selected == 0}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Creation Panel" />
                    </ListItem>
                    <ListItem button onClick={() => { setSelected(1); setTab('teachers'); }} selected={selected == 1}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Available Teachers" />
                    </ListItem>
                    <ListItem button onClick={() => { setSelected(2); setTab('subjects'); }} selected={selected == 2}>
                        <ListItemIcon>
                            <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText primary="Available Subjects" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {tab == 'create' && <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper className={fixedHeightPaper1}>
                                <form className={classes.form} noValidate onSubmit={event => handleSubjectCreate(event)}>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="name"
                                                fullWidth
                                                label="Subject Name"
                                                name="name"
                                                autoComplete="name"
                                                autoFocus
                                                value={name}
                                                onChange={event => setName(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Create Subject
                                    </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={fixedHeightPaper1}>
                                <form className={classes.form} noValidate onSubmit={event => handleSubjectAssign(event)}>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="subjectId"
                                                fullWidth
                                                label="Subject Id"
                                                name="subjectId"
                                                autoComplete="subjectId"
                                                autoFocus
                                                value={subjectId}
                                                onChange={event => setSubjectId(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="teacherId"
                                                fullWidth
                                                label="Teacher Id"
                                                name="teacherId"
                                                autoComplete="teacherId"
                                                autoFocus
                                                value={teacherId}
                                                onChange={event => setTeacherId(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Assign Subject
                                    </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>}
                    {tab == 'create' && <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <form className={classes.form} noValidate onSubmit={event => handleUserCreate(event)}>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="firstName"
                                                fullWidth
                                                label="First Name"
                                                name="firstName"
                                                autoComplete="firstName"
                                                autoFocus
                                                value={firstName}
                                                onChange={event => setFirstName(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="lastName"
                                                fullWidth
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="lastName"
                                                autoFocus
                                                value={lastName}
                                                onChange={event => setLastName(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl variant="filled" className={classes.formControl}>
                                                <InputLabel htmlFor="kind">User Type</InputLabel>
                                                <Select
                                                    native
                                                    fullWidth
                                                    value={kind}
                                                    onChange={event => setKind(event.target.value)}
                                                    inputProps={{
                                                        name: 'kind',
                                                        id: 'kind',
                                                    }}
                                                >
                                                    <option value="teacher">Teacher</option>
                                                    <option value="student">Student</option>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="username"
                                                fullWidth
                                                label="Username"
                                                name="username"
                                                autoComplete="username"
                                                autoFocus
                                                value={username}
                                                onChange={event => setUsername(event.target.value)}
                                            />
                                        </Grid>
                                        {
                                            kind == 'student' &&
                                            <Grid item xs={4}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    id="address"
                                                    fullWidth
                                                    label="Address"
                                                    name="address"
                                                    autoComplete="address"
                                                    autoFocus
                                                    value={address}
                                                    onChange={event => setAddress(event.target.value)}
                                                />
                                            </Grid>
                                        }
                                        {
                                            kind == 'student' &&
                                            <Grid item xs={4}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    id="dob"
                                                    fullWidth
                                                    label="Dob"
                                                    name="dob"
                                                    autoComplete="dob"
                                                    autoFocus
                                                    value={dob}
                                                    onChange={event => setDob(event.target.value)}
                                                />
                                            </Grid>
                                        }
                                        {
                                            kind == 'student' &&
                                            <Grid item xs={4}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    id="year"
                                                    fullWidth
                                                    label="Year"
                                                    name="year"
                                                    autoComplete="year"
                                                    autoFocus
                                                    value={year}
                                                    onChange={event => setYear(event.target.value)}
                                                />
                                            </Grid>
                                        }
                                        <Grid item xs={6}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Create User
                                    </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>}
                    {tab == 'teachers' && <Grid container spacing={3} justify="center" alignItems="center">
                        <Grid item xs={8}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Teachers</Title>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>User Id</TableCell>
                                            <TableCell>Teacher Id</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Assigned Subjects</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teachers.map((teacher, idx) => {
                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell>{teacher.userId}</TableCell>
                                                    <TableCell>{teacher.teacherId}</TableCell>
                                                    <TableCell>{teacher.name}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            color="primary"
                                                            onClick={() => handleShowAssigned(teacher.teacherId)}
                                                        >
                                                            View
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        {
                            assigned.length != 0 && <Grid item xs={3}>
                                <Paper>
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item>
                                            <Title>Assigned Subjects</Title>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Subject Id</TableCell>
                                                        <TableCell>Name</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {assigned.map((subjectId, idx) => {
                                                        return (
                                                            <TableRow key={idx}>
                                                                <TableCell>{subjectId}</TableCell>
                                                                <TableCell>{subjects.find(subject => subject.subjectId == subjectId).name}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        }
                    </Grid>
                    }
                    {tab == 'subjects' && <Grid container spacing={3} justify="center">
                        <Grid item xs={6}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Subjects</Title>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Subject Id</TableCell>
                                            <TableCell>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {subjects.map((subject, idx) => {
                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell>{subject.subjectId}</TableCell>
                                                    <TableCell>{subject.name}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                    }
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}


