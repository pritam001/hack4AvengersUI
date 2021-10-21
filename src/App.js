import './App.css';
import {CLIENTS, EVENTS} from "./Constants";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function App() {

    return (
        <div className="App">
            <Box
                className="mui-box"
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    p: 4,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Box>

            <Button variant="contained">SUBMIT</Button>
        </div>
    );
}

export default App;
