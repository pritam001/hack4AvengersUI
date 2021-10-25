import './EventForm.css';

import * as React from 'react';
import _ from 'lodash';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {CLIENTS, CONFIG_API_ENDPOINT, EVENTS} from "../constants/Constants";
import Item from "../common/Item";
import EventViewer from "../components/EventViewer";
import {useEffect} from "react";
import SnackBarComponent from "../components/SnackBarComponent";
import EventEditor from "../components/EventEditor";

function EventForm() {
    const [selectedClient, setSelectedClient] = React.useState('hdfcassets');
    const [eventListData, setEventListData] = React.useState({});

    const [snackbarStatus, setSnackbarStatus] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const [isDataLoading, setIsDataLoading] = React.useState(false);

    const [eventAction, setEventAction] = React.useState({});

    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
    };

    const handleEventActionSelect = ({event_code, action_code, is_action_editable}) => {
        setEventAction({
            event_code: event_code,
            action_code: action_code,
            is_action_editable: is_action_editable,
        });
    }

    useEffect(() => {
        const fetchCustomConfigData = async () => {
            try {
                const response = await fetch(CONFIG_API_ENDPOINT + `?client=${selectedClient}`);
                return await response.json();
            } catch (error) {
                throw error;
            }
        }

        if (selectedClient.length > 0) {
            setIsDataLoading(true);
            fetchCustomConfigData()
                .then(response => {
                    setIsDataLoading(false);
                    setEventListData(response);
                })
                .catch(error => {
                    console.log("error", error);
                    setIsDataLoading(false);
                    setIsSnackbarOpen(true);
                    setSnackbarStatus("error");
                    setSnackbarMessage(`Failed to pull Custom Config Data! Error: "${error.message}"`);
                });
        }
    }, [selectedClient]);

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', p: 8 }} className="EventForm">
            <Grid container spacing={2}>
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
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {EVENTS.map(event => (
                            <React.Fragment>
                                <EventViewer
                                    event={event}
                                    data={_.find(_.get(eventListData, 'events', []), {event: event.code}) || {actions: []}}
                                    handleEventActionSelect={handleEventActionSelect}
                                />
                                <br/>
                            </React.Fragment>
                        ))}
                    </Grid>

                    <Grid item xs={4}>
                        <EventEditor
                            selectedClient={selectedClient}
                            selectedEvent={eventAction.event_code}
                            selectedAction={eventAction.action_code}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <SnackBarComponent
                snackbarMessage={snackbarMessage}
                isOpen={isSnackbarOpen}
                snackbarStatus={snackbarStatus}
                handleClose={() => setIsSnackbarOpen(false)}
            />
        </Box>
    );
}

export default EventForm;