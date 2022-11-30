import React from "react";
import {FlexibleEvent} from "../models/eventTask";

export const MultipleEventsContext =
    React.createContext<{
        multipleEvents: FlexibleEvent[],
        setMultipleEvents: (events: FlexibleEvent[]) => void
    }>({
        multipleEvents: [],
        setMultipleEvents: companies => {}
    })
