import * as React from 'react';

import './EventList.css';
import {API_ENDPOINT} from "../constants/Constants";

function EventList() {
    const url = API_ENDPOINT;

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className="EventList">
            EventList
        </div>
    );
}

export default EventList;