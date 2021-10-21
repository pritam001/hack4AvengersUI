import './EventFormJson.css';

import * as React from 'react';
import JsonEditor from "../components/JsonEditor";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {POST_CONFIG_API_ENDPOINT} from "../constants/Constants";
import SnackBarComponent from "../components/SnackBarComponent";

const initJsObject = {
    client : "absli",
    event : "LEAD_DETAILS_RETURN",
    action: "Disable Edit For Role",
    attributes : {
        state: ""
    },
    condition : {
        userRoles: "SU, ADMIN"
    }
};

function EventFormJson() {
    const [editorData, setEditorData] = React.useState({
        jsObject: initJsObject,
    });
    const [snackbarStatus, setSnackbarStatus] = React.useState('')
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const submitCustomEventData = (editorData) => {
        return fetch(POST_CONFIG_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editorData.jsObject),
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
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 8 }} className="EventListJson">
            <SnackBarComponent
                snackbarMessage={snackbarMessage}
                isOpen={isSnackbarOpen}
                snackbarStatus={snackbarStatus}
                handleClose={() => setIsSnackbarOpen(false)}
            />
            <JsonEditor editorData={editorData} setEditorData={setEditorData} />
            <Button variant="contained" onClick={() => submitCustomEventData(editorData)}>SUBMIT</Button>
        </Box>
    );
}

export default EventFormJson;
