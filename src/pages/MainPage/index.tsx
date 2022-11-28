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
import {useNavigate, useNavigation} from "react-router-dom";


const MainCalendar = () => {
    const {singleEvents} = useContext(SingleEventsContext)
    const {repeatedEvents} = useContext(RepeatedEventsContext)
    const {multipleEvents} = useContext(MultipleEventsContext)
    const events = [
        ...singleEvents.map(e => parseSingleEvent(e)),
        ...repeatedEvents.map(e => parseRepeatedEvent(e))
    ]
    const navigate = useNavigate()
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{right: 'dayGridMonth,timeGridWeek,listWeek', left: 'prev,next today', center: 'title'}}
            events={events}
            eventClick={info => {
                const date = info.event.start!
                const year = date.getUTCFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                navigate(`/day/${year}/${month}/${day}`)
            }}
        />
    )
}

export default MainCalendar