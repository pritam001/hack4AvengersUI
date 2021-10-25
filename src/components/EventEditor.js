import Item from "../common/Item";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getClientNameFromCode, getEventNameFromCode} from "../constants/Constants";
import * as React from "react";

function EventEditor({selectedClient, selectedEvent, selectedAction}) {

    return (
        <React.Fragment>
            <Item>
                <FormControl fullWidth>
                    <InputLabel id="selected-client-label">Selected Event</InputLabel>
                    <Select
                        labelId="selected-client-label"
                        id="selected-client-label"
                        value={selectedEvent}
                        label="Client"
                        readOnly={true}
                    >
                        <MenuItem key={selectedEvent} value={selectedEvent}>
                            {getEventNameFromCode(selectedEvent)}
                        </MenuItem>
                    </Select>
                </FormControl>
            </Item>

            <Button
                variant="contained"
                color="secondary"
                sx={{ width: '100%', mt: 2 }}
            >
                SAVE EVENT
            </Button>
        </React.Fragment>
    );
}

export default EventEditor;