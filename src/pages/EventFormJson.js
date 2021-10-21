import './EventFormJson.css';

import * as React from 'react';
import JsonEditor from "../components/JsonEditor";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";

function EventFormJson() {
    const [editorData, setEditorData] = React.useState(null);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 8 }} className="EventListJson">
            <JsonEditor setEditorData={setEditorData}/>
            <Button variant="contained">SUBMIT</Button>
        </Box>
    );
}

export default EventFormJson;
