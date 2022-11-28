import React, {useContext} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {RepeatedEvent} from "../../models/eventTask";
import {parseRepeatedEvent, parseSingleEvent} from "../../models/eventParse";
import {SingleEventsContext} from "../../contexts/SingleEventsContext";
import {RepeatedEventsContext} from "../../contexts/RepeatedEventsContext";
import {MultipleEventsContext} from "../../contexts/MultipleEventsContext";

const rEvent: RepeatedEvent = {
    start: {
        hour: 10,
        minute: 0
    },
    end: {
        hour: 11,
        minute: 0
    },
    startDate: {
        year: 2022,
        month: 11,
        day: 1
    },
    endDate: {
        year: 2022,
        month: 11,
        day: 28
    },
    daysOfWeek: ['1', '3', '5'],
    title: "Dick"
}

const MainCalendar = () => {
    const {singleEvents} = useContext(SingleEventsContext)
    const {repeatedEvents} = useContext(RepeatedEventsContext)
    const {multipleEvents} = useContext(MultipleEventsContext)
    const events = [
        ...singleEvents.map(e => parseSingleEvent(e)),
        ...repeatedEvents.map(e => parseRepeatedEvent(e))
    ]
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
                },
                parseRepeatedEvent(rEvent),
                ...events
            ]}
        />
    )
}

export default MainCalendar