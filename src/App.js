import './App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {CLIENTS, EVENTS} from "./Constants";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function App() {

    const [selectedClient, setSelectedClient] = React.useState('');
    const [selectedEvent, setSelectedEvent] = React.useState('');

    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    return (
        <div className="App">
            <Box
                className="mui-box"
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    p: 4,
                }}
            >
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
                                        <MenuItem value={client.code}>{client.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
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
                                    {EVENTS.map(client => (
                                        <MenuItem value={client.code}>{client.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Box>

            <Button variant="contained">SUBMIT</Button>
        </div>
    );
}

export default App;
