import './EventFormJson.css';

import * as React from 'react';
import JsonEditor from "../components/JsonEditor";
import Box from "@mui/material/Box";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {CLIENTS, EVENTS, POST_CONFIG_API_ENDPOINT} from "../constants/Constants";
import SnackBarComponent from "../components/SnackBarComponent";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const initJsObject = {
    "client" : "absli",
    "events" : [
        {
            "event": "LEAD_DETAILS_RETURN",
            "actions":[
                {
                    "action" : "Disable Edit For Role",
                    "attributes" : {
                        "state": "xyz"
                    },
                    "condition" : {
                        "userRoles": "SU, ADMIN"
                    }
                }
            ]
        }
    ]
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function EventFormJson() {
    const [editorData, setEditorData] = React.useState({jsObject: initJsObject});
    const [snackbarStatus, setSnackbarStatus] = React.useState('success');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const [selectedClient, setSelectedClient] = React.useState('');
    const [selectedEvent, setSelectedEvent] = React.useState('');

    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
        let updatedEditorData = editorData;
        updatedEditorData.jsObject.client = event.target.value;
        setEditorData(updatedEditorData);
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    const submitCustomEventData = (editorData) => {
        return fetch(POST_CONFIG_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editorData?.jsObject),
            })
            .then(response => {
                setIsSnackbarOpen(true);
                setSnackbarStatus("success");
                setSnackbarMessage("Custom Event Submitted!");
            })
            .catch(error => {
                setIsSnackbarOpen(true);
                setSnackbarStatus("error");
                setSnackbarMessage(`Custom Event Submit Failed! Error: '${error.message}'`);
            });
    };

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', p: 8 }} className="EventListJson">
            <SnackBarComponent
                snackbarMessage={snackbarMessage}
                isOpen={isSnackbarOpen}
                snackbarStatus={snackbarStatus}
                handleClose={() => setIsSnackbarOpen(false)}
            />
            <Grid container spacing={2} sx={{ pb: 4 }}>
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
                <Grid item xs={4}>
                    <JsonEditor editorData={editorData} setEditorData={setEditorData} />
                </Grid>
            </Grid>
            <Button variant="contained" onClick={() => submitCustomEventData(editorData)}>SUBMIT</Button>
        </Box>
    );
}

export default EventFormJson;
