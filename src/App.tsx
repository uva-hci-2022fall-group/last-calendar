import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import EventCreationPage from "./pages/EventCreationPage";
import MainCalendar from "./pages/MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainCalendar/>
    },
    {
        path: "/event/new",
        element: <EventCreationPage/>
    }
])


const App = () => {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
