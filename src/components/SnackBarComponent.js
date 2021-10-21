import {Alert, Snackbar} from "@mui/material";

const SnackBarComponent = props => {
    return (<Snackbar
        open={props.isOpen}
        autoHideDuration={6000}
        onClose={props.handleClose}
    >
        <Alert onClose={props.handleClose} severity={props.snackbarStatus} sx={{ width: '100%' }}>
            {props.snackbarMessage}
        </Alert>
    </Snackbar>);
};

export default SnackBarComponent;