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
import List from "@mui/material/List";
import {ListItem, ListItemText} from "@mui/material";
import IconButton from "@mui/material/IconButton";

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
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {/*{actions.map( action =>*/}
                    {/*    <ListItem*/}
                    {/*        key={action.}*/}
                    {/*        disableGutters*/}
                    {/*        secondaryAction={*/}
                    {/*            <IconButton>*/}
                    {/*                <CommentIcon />*/}
                    {/*            </IconButton>*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        <ListItemText primary={`Line item ${value}`} />*/}
                    {/*    </ListItem>*/}
                    {/*)}*/}
                </List>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box sx={{minWidth: 275}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        <Card
                            variant="outlined"
                            sx={{
                                backgroundColor: actions.length > 0 ? green[100] : grey[100],
                                minHeight: '150px',
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
                                minHeight: '150px',
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
