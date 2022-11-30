import React from "react";
import {EventTask} from "../models/eventTask";

export const SingleEventsContext =
    React.createContext<{
        singleEvents: EventTask[],
        setSingleEvents: (events: EventTask[]) => void
    }>({
        singleEvents: [],
        setSingleEvents: companies => {}
    })