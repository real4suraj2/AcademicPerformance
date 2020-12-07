import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                Performance Monitor
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default () => {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/users/login', {
            username, password
        }).then(response => {
            const { kind, token, username, firstName, lastName } = response.data;
            if (token == null || token == undefined) {
                console.log("Login Failed")
                setOpen(true);
            }
            localStorage.setItem("token", token);
            localStorage.setItem("kind", kind);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("username", username);
            if (kind == 'student')
                history.push("/dashboard");
            if (kind == 'teacher')
                history.push("/teacher");
            if (kind == 'admin')
                history.push("/admin");
        }).catch(err => {
            console.log("Login Failed")
            setOpen(true);
            // this.setState({
            //     visible: true,
            //     message: 'Check your credentials!'
            // })
        })
    }
    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="Please Check Your Login Credentials"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={()=> setOpen(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate onSubmit={event => handleLogin(event)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}