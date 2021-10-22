import React from 'react';
import { useForm } from 'react-hook-form';
import {initJsObject} from "./EventFormJson";
import {CONFIG_API_ENDPOINT} from "../constants/Constants";
import SnackBarComponent from "../components/SnackBarComponent";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextareaAutosize} from "@mui/material";

function EventForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [snackbarStatus, setSnackbarStatus] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    const onSubmit = data => {
        console.log(data);
        return fetch(CONFIG_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(initJsObject),
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
    console.log(errors);

    return (
        <React.Fragment>
            <div style={{padding: '16px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl sx={{ m: 1, minWidth: 250 }}>
                        <InputLabel id="demo-simple-select-helper-label">Client</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Client"
                            value="HDFCASSETS"
                        >
                            <MenuItem value={"HDFCASSETS"}>HDFC ASSETS</MenuItem>
                            <MenuItem value={"ABSLI"}>ABSLI</MenuItem>
                            <MenuItem value={"TATAAIA"}>TATA AIA</MenuItem>
                        </Select>
                    </FormControl>

                    <br/>
                    <FormControl sx={{ m: 1, minWidth: 250 }}>
                        <InputLabel id="demo-simple-select-helper-label">Event</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Event"
                        >
                            <MenuItem value={"INPUT_FIELDS_RETURN"}>INPUT_FIELDS_RETURN</MenuItem>
                            <MenuItem value={"LEAD_DETAILS_RETURN"}>LEAD_DETAILS_RETURN</MenuItem>
                            <MenuItem value={"LEAD_CREATED"}>LEAD_CREATED</MenuItem>
                            <MenuItem value={"LEAD_UPDATED"}>LEAD_UPDATED</MenuItem>
                        </Select>
                    </FormControl>

                    <br/>
                    <fieldset {...register("actions", {})}>
                        <legend>Actions</legend>
                        {["disable_edit_on_user_role_and_first_update_type", "hide_fields_last_update_type", "call_slack_webhook"].map((action) => (
                            <React.Fragment>
                                <div>
                                    <input type="checkbox" id={action} name={action} value={action} />
                                    <label htmlFor={action}>{action}</label>
                                </div>
                                <br/>
                                <TextareaAutosize
                                    aria-label="Condition"
                                    minRows={5}
                                    placeholder="Condition"
                                    style={{ width: '47%' }}
                                    {...register("conditions", {})}
                                />
                                <TextareaAutosize
                                    aria-label="attributes"
                                    minRows={5}
                                    placeholder="Attributes"
                                    style={{ width: '47%', float: 'right' }}
                                    {...register("conditions", {})}
                                />
                                <hr/>
                            </React.Fragment>
                        ))}
                    </fieldset>

                    <br/><br/>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onSubmit()}
                        sx={{width: '100%'}}
                    >
                        SUBMIT
                    </Button>
                </form>
            </div>

            <SnackBarComponent
                snackbarMessage={snackbarMessage}
                isOpen={isSnackbarOpen}
                snackbarStatus={snackbarStatus}
                handleClose={() => setIsSnackbarOpen(false)}
            />
        </React.Fragment>
    );
}

export default EventForm;