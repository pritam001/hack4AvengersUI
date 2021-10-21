import './EventFormJson.css';

import * as React from 'react';
import JsonEditor from "../components/JsonEditor";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {POST_CONFIG_API_ENDPOINT} from "../constants/Constants";

function EventFormJson() {
    const [editorData, setEditorData] = React.useState(null);

    const submitCustomEventData = (editorData) => {
        return fetch(POST_CONFIG_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editorData.jsObject),
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 8 }} className="EventListJson">
            <JsonEditor setEditorData={setEditorData}/>
            <Button variant="contained" onClick={() => submitCustomEventData(editorData)}>SUBMIT</Button>
        </Box>
    );
}

export default EventFormJson;
