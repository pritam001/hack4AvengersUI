import * as React from 'react';
import {useEffect} from 'react';

import './EventList.css';
import {CLIENTS, CONFIG_API_ENDPOINT} from "../constants/Constants";
import LoadingButton from '@mui/lab/LoadingButton';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import {FormControl, InputLabel, MenuItem, Modal, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Item from "../common/Item";
import JsonEditor from "../components/JsonEditor";
import SnackBarComponent from "../components/SnackBarComponent";

function EventList() {
    const [eventListData, setEventListData] = React.useState({});
    const [selectedClient, setSelectedClient] = React.useState('');

    const [snackbarStatus, setSnackbarStatus] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const [editorData, setEditorData] = React.useState({jsObject: null});

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [isDataLoading, setIsDataLoading] = React.useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

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
            setIsDataLoading(true);
            fetchCustomConfigData()
                .then(response => {
                    setIsDataLoading(false);
                    setEventListData(response);
                    setEditorData({jsObject: response});
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
                <Grid item xs={12} sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row'}} spacing={4}>
                    <Grid item xs={6} sx={{ pr: 8 }}>
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

                    <Grid item xs={6} sx={{ pl: 8 }}>
                        <LoadingButton
                            variant="contained"
                            color="secondary"
                            onClick={() => handleModalOpen()}
                            disabled={!(typeof eventListData === "object" && Object.keys(eventListData).length > 0)}
                            size="large"
                            loading={isDataLoading}
                            loadingPosition="start"
                            startIcon={<ViewInArIcon />}
                            style={{width: '100%', height: '100%'}}
                        >
                            Show JSON
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>

            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80vw',
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    border: 0,
                }}>
                    <JsonEditor
                        editorData={editorData}
                        setEditorData={setEditorData}
                        viewOnly={true}
                    />
                </Box>
            </Modal>

            <SnackBarComponent
                snackbarMessage={snackbarMessage}
                isOpen={isSnackbarOpen}
                snackbarStatus={snackbarStatus}
                handleClose={() => setIsSnackbarOpen(false)}
            />
        </Box>
    );
}

export default EventList;