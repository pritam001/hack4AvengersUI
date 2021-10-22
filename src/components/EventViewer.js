import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {green, grey} from "@mui/material/colors";
import Item from "../common/Item";
import Grid from "@mui/material/Grid";
import CableIcon from '@mui/icons-material/Cable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddTaskIcon from '@mui/icons-material/AddTask';
import {getActionNameFromCode} from "../constants/Constants";

function EventViewer({event, data}) {
    const {actions} = data;

    const eventCard = (event, actions) => (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14, display: 'flex', flexDirection: 'row', alignItems: 'center' }} color="text.secondary" gutterBottom>
                    <CableIcon /><div style={{marginTop: 'auto', marginBottom: 'auto'}}>Event</div>
                </Typography>
                <Typography variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography sx={{ mb: 0 }} color="text.secondary">
                    Added actions: {actions.length}
                </Typography>
                <Typography variant="body2">
                    {event.description}
                </Typography>
            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button variant="contained" color="primary" size="small">Show actions</Button>*/}
            {/*</CardActions>*/}
        </React.Fragment>
    );

    const actionCard = (actions) => (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14, display: 'flex', flexDirection: 'row', alignItems: 'center' }} color="text.secondary" gutterBottom>
                    <AssignmentIcon /><div style={{marginTop: 'auto', marginBottom: 'auto'}}>Actions</div>
                </Typography>
                {actions.map( actionData =>
                    <Button variant="contained" size="medium" sx={{ width: '100%', mt: 1, fontWeight: 400 }}>
                        {`${getActionNameFromCode(actionData.action)}`}
                    </Button>
                )}
                <Button variant="contained" size="medium" color="secondary" sx={{ width: '100%', mt: 1, fontWeight: 400 }}>
                    <AddTaskIcon sx={{mr: 2}}/>Add
                </Button>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box sx={{minWidth: 300}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        <Card
                            variant="outlined"
                            sx={{
                                backgroundColor: actions.length > 0 ? green[100] : grey[100],
                                minHeight: '200px',
                            }}
                        >
                            {eventCard(event, actions)}
                        </Card>
                    </Item>
                </Grid>

                <Grid item xs={4}>
                    <Item>
                        <Card
                            variant="outlined"
                            sx={{
                                backgroundColor: actions.length > 0 ? green[100] : grey[100],
                                minHeight: '200px',
                            }}
                        >
                            {actionCard(actions)}
                        </Card>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EventViewer;
