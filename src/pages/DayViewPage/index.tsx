import {Col, Row, Select} from 'antd'
import TaskList from "../../components/TaskList";
import {DateStamp, dateStampEquals, EventTask, getTasksFromRepeatedEvent} from "../../models/eventTask";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {MultipleEventsContext} from "../../contexts/MultipleEventsContext";
import {RepeatedEventsContext} from "../../contexts/RepeatedEventsContext";
import {SingleEventsContext} from "../../contexts/SingleEventsContext";

const demoEvents: EventTask[] = [
    {
        title: "Jerk off",
        priority: 1,
        start: {
            hour: 10,
            minute: 0
        },
        end: {
            hour: 11,
            minute: 0
        }
    },
    {
        title: "Watch porn",
        priority: 2,
        start: {
            hour: 12,
            minute: 0
        },
        end: {
            hour: 13,
            minute: 0
        }
    }
]


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
            <Col span={12}>
                <div>left</div>
            </Col>
            <Col span={10}>
                <TaskList events={events}/>
            </Col>
        </Row>
    )
}


export default DayViewPage