import React, {useState} from 'react'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import EventCreationPage from "./pages/EventCreationPage";
import DayViewPage from "./pages/DayViewPage";
import {EventTask, FlexibleEvent, LongTermPlan, RepeatedEvent} from "./models/eventTask";
import {LongTermPlansContext} from './contexts/LongTermPlansContext';
import {RepeatedEventsContext} from './contexts/RepeatedEventsContext';
import {SingleEventsContext} from './contexts/SingleEventsContext';
import {MultipleEventsContext} from './contexts/MultipleEventsContext';
import {Layout, Menu, MenuProps} from "antd";
import MainPage from "./pages/MainPage";

const {Header, Content, Footer} = Layout

const Router = () => {
    const items: MenuProps['items'] = [
        {
            key: "a",
            label: <Link to={"/"}>Home</Link>
        },
        {
            key: "b",
            label: <Link to={"/new"}>Create New Event</Link>
        }
    ]
    return (
        <BrowserRouter>
            <Layout>
                <Header>
                    <Menu items={items} mode="horizontal" theme="dark"/>
                </Header>
                <Content>
                    <Routes>
                        <Route path={"/"} element={<MainPage/>}/>
                        <Route path={"/new"} element={<EventCreationPage/>}/>
                    </Routes>
                </Content>
            </Layout>
        </BrowserRouter>

    )
}


const App = () => {
    const [longTermPlans, setLongTermPlans] = useState<LongTermPlan[]>([])
    const [repeatedEvents, setRepeatedEvents] = useState<RepeatedEvent[]>([])
    const [singleEvents, setSingleEvents] = useState<EventTask[]>([])
    const [multipleEvents, setMultipleEvents] = useState<FlexibleEvent[]>([])
    return (
        <LongTermPlansContext.Provider value={{longTermPlans: longTermPlans, setLongTermPlans: setLongTermPlans}}>
            <RepeatedEventsContext.Provider
                value={{repeatedEvents: repeatedEvents, setRepeatedEvents: setRepeatedEvents}}>
                <SingleEventsContext.Provider value={{singleEvents: singleEvents, setSingleEvents: setSingleEvents}}>
                    <MultipleEventsContext.Provider
                        value={{multipleEvents: multipleEvents, setMultipleEvents: setMultipleEvents}}>
                        <Router/>
                    </MultipleEventsContext.Provider>
                </SingleEventsContext.Provider>
            </RepeatedEventsContext.Provider>
        </LongTermPlansContext.Provider>
    );
}

export default App;
