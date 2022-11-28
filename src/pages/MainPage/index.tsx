import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


const MainCalendar = () => {

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{right: 'dayGridMonth,timeGridWeek,listWeek', left: 'prev,next today', center: 'title'}}
            events={[
                {
                    title: "The title 1",
                    start: "2022-11-01T10:00:00",
                    end: "2022-11-01T11:00:00"
                },
                {
                    title: "The title 3",
                    start: "2022-11-01T13:00:00",
                    end: "2022-11-01T14:00:00"
                },
                {
                    title: "The title 2",
                    start: "2022-11-02",
                    end: "2022-11-02"
                }
            ]}
        />
    )
}

export default MainCalendar