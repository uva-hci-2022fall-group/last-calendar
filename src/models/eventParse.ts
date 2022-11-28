import {DateStamp, EventTask, RepeatedEvent, TimeInDay} from "./eventTask";
import {EventInput, EventSourceInput} from "@fullcalendar/react";

const dateToString = (date: DateStamp): string => {
    return `${date.year}-${date.month}-${date.day}`
}

const timeToString = (time: TimeInDay): string => {
    return `${time.hour}:${time.minute}:00`
}

const dateTimeToString = (date: DateStamp, time: TimeInDay): string => {
    return `${dateToString(date)}T${timeToString(time)}`
}

const parseSingleEvent = (event: EventTask): EventInput => {
    const result: EventInput = {
        start: dateTimeToString(event.date!, event.start),
        end: dateTimeToString(event.date!, event.end),
        title: event.title
    }
    return result
}

const parseRepeatedEvent = (event: RepeatedEvent): EventInput => {
    const result: EventInput = {
        title: event.title,
        startRecur: dateToString(event.startDate),
        endRecur: dateToString(event.endDate),
        startTime: timeToString(event.start),
        endTime: timeToString(event.end),
        daysOfWeek: event.daysOfWeek
    }
    return result
}

export {parseRepeatedEvent, parseSingleEvent}