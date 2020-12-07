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
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    const [message, setMessage] = useState('Logged In Successfully as admin');
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
            <AppBar position="absolute" className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Admin Dashboard
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
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
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
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}



// import React, { Component } from 'react';

// import { Navbar, NavbarBrand, Button } from 'reactstrap';
// import './screen.css';
// import AddT from './Admin_components/AssignSubject';
// import AddS from './Admin_components/AddUser';
// import AddSub from './Admin_components/AddSubject';

// class Admin extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {

//         }
//     }
//     render() {
//         return (
//             <div>
//                 <div className="App">
//                     <Navbar dark color="primary">
//                         <div className="container">
//                             <NavbarBrand>
//                                 <h1>Admin Dashboard</h1>
//                             </NavbarBrand>
//                         </div>
//                     </Navbar>
//                 </div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col sm-12">
//                             <div className="row">
//                                 <div className="col sm-12 md-12 ls-12"> <AddT /> </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col sm-12 md-12 ls-12"> <AddSub /> </div>
//                             </div>
//                         </div>
//                         <div className="col sm-12"> <AddS /> </div>
//                     </div>
//                     <hr></hr><br></br>
//                 </div>
//             </div>
//         )
//     }
// }


// export default Admin;




























// class Login extends Component  {

//     constructor(props){
//       super(props);
//       this.state = {

//       }
//     }

//     NavigatetoStudent(){
//       browserHistory.push("/")
//     }
//     render() {
//       return (
//         <div className="App">
//           <Navbar dark color="primary">
//             <div className="container">
//               <NavbarBrand href="/">
//                 <h1>Signup options</h1>
//                 </NavbarBrand>
//             </div>
//           </Navbar>
//           <div className="container2">
//           <Button color="danger" size="lg" >Student Login</Button><br/><br/>
//           <Button color="danger" size="lg">Teacher Login</Button><br/><br/>
//           <Button color="danger" size="lg">Admin only</Button><br/><br/>
//           </div>
//         </div>
//       );

//     }
//   }

//   export default Login;

