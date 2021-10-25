import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {Link} from "react-router-dom";
import {DRAWER_WIDTH} from "../constants/Constants";

const openedMixin = (theme) => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function MiniDrawer(props) {
    const theme = useTheme();

    return (
        <Drawer variant="permanent" open={props.open}>
            <DrawerHeader>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <Link to="/react_form">
                    <ListItem button key="React Form">
                        <ListItemIcon>
                            <PostAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="React Form" />
                    </ListItem>
                </Link>
                <Link to="/event_form_json">
                    <ListItem button key="Custom Code JSON Form">
                        <ListItemIcon>
                            <BuildCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Custom Code JSON Form" />
                    </ListItem>
                </Link>
                <Link to="/event_form">
                    <ListItem button key="Custom Code Form">
                        <ListItemIcon>
                            <DynamicFormIcon />
                        </ListItemIcon>
                        <ListItemText primary="Custom Code Form" />
                    </ListItem>
                </Link>
                <Link to="/event_list">
                    <ListItem button key="Custom Code List">
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Custom Code List" />
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
}

export default MiniDrawer;