import './App.css';
import * as React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import EventForm from "./pages/EventForm";
import EventList from "./pages/EventList";
import Login from "./pages/Login";
import MiniDrawer, {DrawerHeader} from "./components/NavBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {DRAWER_WIDTH} from "./constants/Constants";
import EventFormJson from "./pages/EventFormJson";
import {grey} from "@mui/material/colors";
import ReactForm from "./pages/ReactForm";


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: `${DRAWER_WIDTH}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

function App() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', fontWeight: 'bold'}}>
                            J.A.R.V.I.S
                        </Typography>
                    </Toolbar>
                </AppBar>

                <MiniDrawer open={open} handleDrawerClose={handleDrawerClose}/>
                <Main open={open} sx={{ backgroundColor: grey[50] }}>
                    <DrawerHeader />
                    <Switch>
                        <Route path="/react_form">
                            <ReactForm />
                        </Route>
                        <Route path="/event_form_json">
                            <EventFormJson />
                        </Route>
                        <Route path="/event_form">
                            <EventForm />
                        </Route>
                        <Route path="/event_list">
                            <EventList />
                        </Route>
                        <Route path="/">
                            <Login />
                        </Route>
                    </Switch>
                </Main>
            </Box>
        </Router>
    );
}

export default App;
