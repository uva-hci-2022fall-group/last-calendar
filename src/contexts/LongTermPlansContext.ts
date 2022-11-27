import React from "react";
import {LongTermPlan} from "../models/eventTask";

export const LongTermPlansContext =
    React.createContext<{
        longTermPlans: LongTermPlan[],
        setLongTermPlans: (events: LongTermPlan[]) => void
    }>({
        longTermPlans: [],
        setLongTermPlans: companies => {}
    })
