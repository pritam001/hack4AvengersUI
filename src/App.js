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
import MiniDrawer from "./components/NavBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import {DRAWER_WIDTH} from "./constants/Constants";
import EventFormJson from "./pages/EventFormJson";


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
                            <div>MI</div>
                            <AddIcon style={{marginTop: 'auto', marginBottom: 'auto', paddingLeft: '2px', paddingBottom: '2px'}} fontSize='small'/>
                            <AddIcon style={{marginTop: 'auto', marginBottom: 'auto', paddingBottom: '2px', paddingRight: '2px'}} fontSize='small'/>
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <MiniDrawer open={open} handleDrawerClose={handleDrawerClose}/>

                    <Switch>
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
                </Box>
            </Box>
        </Router>
    );
}

export default App;
