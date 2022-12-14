import {Col, Row, Select} from 'antd'
import TaskList from "../../components/TaskList";
import {DateStamp, dateStampEquals, EventTask, getTasksFromRepeatedEvent} from "../../models/eventTask";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {MultipleEventsContext} from "../../contexts/MultipleEventsContext";
import {RepeatedEventsContext} from "../../contexts/RepeatedEventsContext";
import {SingleEventsContext} from "../../contexts/SingleEventsContext";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import {parseRepeatedEvent, parseSingleEvent} from "../../models/eventParse"; // a plugin!
import styles from './index.module.css'


const DayViewPage = () => {
    const {year, month, day} = useParams<{ year: string, month: string, day: string }>()
    const {multipleEvents} = useContext(MultipleEventsContext)
    const {repeatedEvents} = useContext(RepeatedEventsContext)
    const {singleEvents} = useContext(SingleEventsContext)
    const targetDate: DateStamp = {
        year: parseInt(year!),
        month: parseInt(month!),
        day: parseInt(day!)
    }
    const events: EventTask[] = [
        ...singleEvents,
        ...repeatedEvents.map(r => getTasksFromRepeatedEvent(r)).flatMap(e => e),
        ...multipleEvents.map(m => m.getTasks()).flatMap(e => e)
    ].filter(e => dateStampEquals(e.date!, targetDate))
    return (
        <Row>
            <Col span={12} style={{margin: 10}}>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridDay"
                    events={[...singleEvents.map(e => parseSingleEvent(e)),
                        ...repeatedEvents.map(e => parseRepeatedEvent(e))]}
                    initialDate={new Date(`${year}-${month}-${day}`)}
                    dayCellClassNames={styles.view}
                />
            </Col>
            <Col span={10}>
                <TaskList events={events}/>
            </Col>
        </Row>
    )
}


export default DayViewPage