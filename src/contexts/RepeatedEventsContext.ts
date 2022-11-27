import React from "react";
import {EventTask, RepeatedEvent} from "../models/eventTask";

export const RepeatedEventsContext =
    React.createContext<{
        repeatedEvents: RepeatedEvent[],
        setRepeatedEvents: (events: RepeatedEvent[]) => void
    }>({
        repeatedEvents: [],
        setRepeatedEvents: companies => {}
    })