import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
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
import Chart from './Chart';
import Info from './Info';
import Remarks from './Remarks';
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
        height: 360,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const [data, setData] = useState({});
    const [reports, setReports] = useState([]);
    const [display, setDisplay] = useState([]);
    const [comments, setComments] = useState([]);
    const [visible, setVisible] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const filter = (mode) => {
        const newDisplay = reports.filter(report => mode == 'Mixed' || report.title.split(' ')[0] == mode);
        setDisplay(newDisplay);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/api/users/info/student', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data.payload);
                setData(response.data.payload);
                axios.get('http://localhost:8080/api/reports/student/' + response.data.payload.studentId, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        setReports(response.data.payload);
                        setDisplay(response.data.payload);
                    }).catch(err => console.log(err));
                axios.get('http://localhost:8080/api/comments/' + response.data.payload.studentId, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        setComments(response.data.payload);
                    }).catch(err => console.log(err));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={visible}
                autoHideDuration={6000}
                onClose={() => setVisible(false)}
                message={"Logged In Successfully as " + localStorage.getItem('username')}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setVisible(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
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
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => filter("Mixed")}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mixed" />
                    </ListItem>
                    <ListItem button onClick={() => filter("Weekly")}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Weekly" />
                    </ListItem>
                    <ListItem button onClick={() => filter("Monthly")}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Monthly" />
                    </ListItem>
                    <ListItem button onClick={() => filter("Yearly")}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Yearly" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                {display.length != 0 && <Chart reports={display} />}
                                {!display.length && <p className="text-center"> No data for this criteria </p>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Info studentId={data.studentId} firstName={localStorage.getItem('firstName')} lastName={localStorage.getItem('lastName')} dob={data.dob} year={data.year} address={data.address} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {comments.length != 0 && display.length != 0 && <Remarks comments={comments} reports={display} />}
                                {(!display.length || !comments.length) && <p className="text-center"> No data for this criteria</p>}
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