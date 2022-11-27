import React, {useState} from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import EventCreationPage from "./pages/EventCreationPage";
import DayViewPage from "./pages/DayViewPage";
import {EventTask, FlexibleEvent, LongTermPlan, RepeatedEvent} from "./models/eventTask";
import { LongTermPlansContext } from './contexts/LongTermPlansContext';
import { RepeatedEventsContext } from './contexts/RepeatedEventsContext';
import { SingleEventsContext } from './contexts/SingleEventsContext';
import { MultipleEventsContext } from './contexts/MultipleEventsContext';

const router = createBrowserRouter([
    {
        path: "/",
        element: <DayViewPage/>
    },
    {
        path: "/event/new",
        element: <EventCreationPage/>
    }
])


const App = () => {
    const [longTermPlans, setLongTermPlans] = useState<LongTermPlan[]>([])
    const [repeatedEvents, setRepeatedEvents] = useState<RepeatedEvent[]>([])
    const [singleEvents, setSingleEvents] = useState<EventTask[]>([])
    const [multipleEvents, setMultipleEvents] = useState<FlexibleEvent[]>([])
    return (
        <LongTermPlansContext.Provider value={{longTermPlans: longTermPlans, setLongTermPlans: setLongTermPlans}}>
            <RepeatedEventsContext.Provider value={{repeatedEvents: repeatedEvents, setRepeatedEvents: setRepeatedEvents}}>
                <SingleEventsContext.Provider value={{singleEvents: singleEvents, setSingleEvents: setSingleEvents}}>
                    <MultipleEventsContext.Provider value={{multipleEvents: multipleEvents, setMultipleEvents: setMultipleEvents}}>
                        <RouterProvider router={router}/>
                    </MultipleEventsContext.Provider>
                </SingleEventsContext.Provider>
            </RepeatedEventsContext.Provider>
        </LongTermPlansContext.Provider>
    );
}

export default App;
