import * as React from 'react';
import {useEffect} from 'react';

import './EventList.css';
import {CLIENTS, CONFIG_API_ENDPOINT} from "../constants/Constants";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Item from "../common/Item";
import JsonEditor from "../components/JsonEditor";

function EventList() {
    const [eventListData, setEventListData] = React.useState({});
    const [selectedClient, setSelectedClient] = React.useState('');

    const [editorData, setEditorData] = React.useState({jsObject: null});

    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
    };

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
            fetchCustomConfigData()
                .then(response => {
                    setEventListData(response);
                    setEditorData({jsObject: response});
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [selectedClient]);

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
                </Grid>
                <Grid item xs={6}>
                    <JsonEditor
                        editorData={editorData}
                        setEditorData={setEditorData}
                        viewOnly={true}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default EventList;