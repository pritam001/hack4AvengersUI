import "./EventFormJson.css";

import * as React from "react";
import JsonEditor from "../components/JsonEditor";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {CONFIG_API_ENDPOINT} from "../constants/Constants";
import SnackBarComponent from "../components/SnackBarComponent";
import Grid from "@mui/material/Grid";

export const initJsObject = {
    "client": "hdfcassets",
    "events": [
        {
            "event": "LEAD_DETAILS_RETURN",
            "actions": [
                {
                    "action": "disable_edit_on_user_role_and_first_update_type",
                    "condition": {
                        "userRoles": ["ADMIN"],
                        "userCode" : ["SU","ALL"],
                        "firstUpdateType": [
                            "leads_new"
                        ]
                    }
                }
            ]
        },
        {
            "event": "INPUT_FIELDS_RETURN",
            "actions": [
                {
                    "action": "hide_fields_last_update_type",
                    "attributes": {
                        "fieldsToRemove": [
                            "lastname_yrtwn3kggk",
                            "companyname_zwv8nluicl",
                            "branchcity_g93ts42ftg"
                        ]
                    },
                    "condition": {
                        "userRoles": ["ADMIN"],
                        "userCode" : ["SU","ALL"],
                        "firstUpdateType": "leads_new"
                    }
                }
            ]
        },
        {
            "event": "LEAD_CREATED",
            "actions": [
                {
                    "action": "call_slack_webhook",
                    "attributes": {
                        "postUrl": "https://hooks.slack.com/services/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",
                        "postHeaders":{},
                        "body": {
                            "channel": "#avengers_demo",
                            "username": "webhookbot",
                            "icon_emoji": ":ghost:"
                        }
                    }
                }
            ]
        },
        {
            "event": "LEAD_UPDATED",
            "actions": [
                {
                    "action": "call_slack_webhook",
                    "attributes": {
                        "postUrl": "https://hooks.slack.com/services/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",
                        "postHeaders":{},
                        "body": {
                            "channel": "#avengers_demo",
                            "username": "webhookbot",
                            "icon_emoji": ":ghost:"
                        }
                    }
                }
            ]
        }
    ]
};

function EventFormJson() {
    const [editorData, setEditorData] = React.useState({jsObject: initJsObject});
    const [snackbarStatus, setSnackbarStatus] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const submitCustomEventData = (editorData) => {
        return fetch(CONFIG_API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                setSnackbarMessage(`Custom Event Submit Failed! Error: "${error.message}"`);
            });
    };

    return (
        <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column", p: 8 }} className="EventListJson">
            <SnackBarComponent
                snackbarMessage={snackbarMessage}
                isOpen={isSnackbarOpen}
                snackbarStatus={snackbarStatus}
                handleClose={() => setIsSnackbarOpen(false)}
            />
            <Grid container spacing={2} sx={{ pb: 4 }}>
                <Grid item xs={6}>
                    <JsonEditor
                        editorData={editorData}
                        setEditorData={setEditorData}
                        viewOnly={false}
                    />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="secondary"
                disabled={!!editorData.error}
                onClick={() => submitCustomEventData(editorData)}
            >
                SUBMIT
            </Button>
        </Box>
    );
}

export default EventFormJson;
