import './EventForm.css';

import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {CLIENTS, EVENTS} from "../constants/Constants";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

function EventForm() {
    const [selectedClient, setSelectedClient] = React.useState('');
    const [selectedEvent, setSelectedEvent] = React.useState('');

    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', p: 8 }} className="EventForm">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        <FormControl fullWidth>
                            <InputLabel id="client-select-label">Client</InputLabel>
                            <Select
                                labelId="client-select-label"
                                id="client-select"
                                value={selectedClient}
                                label="Client"
                                onChange={handleClientChange}
                            >
                                {CLIENTS.map(client => (
                                    <MenuItem key={client.code} value={client.code}>{client.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Item>
                    <br />
                    <Item>
                        <FormControl fullWidth>
                            <InputLabel id="event-select-label">Event</InputLabel>
                            <Select
                                labelId="event-select-label"
                                id="event-select"
                                value={selectedEvent}
                                label="event"
                                onChange={handleEventChange}
                            >
                                {EVENTS.map(event => (
                                    <MenuItem key={event.code} value={event.code}>{event.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EventForm;