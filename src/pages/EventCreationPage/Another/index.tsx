import styles from './styles.module.css'
import {Button, DatePicker, Form, Input, List, Typography} from "antd";
import {createDateStampFromMoment, DateStamp} from "../../../models/eventTask";
import moment from "moment";
import {useState} from "react";

type TimeLineItemProps = {
    label: string,
    date: string,
    color: string,
    width: number,
    left: number
}

type SubEvent = {
    label: string,
    date: DateStamp
}

const TimeLineItem = (props: TimeLineItemProps) => {
    const {label, width, color, left, date} = props
    return (
        <div className={styles.item} style={{width: width, left: left, color: color}}>
            {label}
            <div className={styles.itemDate}>{date}</div>
        </div>
    )
}

const items: TimeLineItemProps[] = [
    {
        label: "jav",
        date: "12.2",
        color: "orange",
        width: 50,
        left: 20
    },
    {
        label: "b",
        date: "12.5",
        color: "red",
        width: 150,
        left: 70
    },
    {
        label: "c",
        date: "12.7",
        color: "green",
        width: 120,
        left: 220
    },
    {
        label: "d",
        date: "12.10",
        color: "blue",
        width: 80,
        left: 340
    }
]

const colors = ["orange", "red", "green", "blue", "pink"]

const parseSubEvents = (subEvents: SubEvent[], endDate: DateStamp): TimeLineItemProps[] => {
    let results: TimeLineItemProps[] = []
    const beginTime = new Date("2022-12-1").getTime()
    const endTime = new Date(`${endDate.year}-${endDate.month}-${endDate.day}`).getTime()
    console.log(beginTime)
    console.log(endTime)
    const fullLength = 600
    const offset = 20
    let lastTime = beginTime
    const sorted = subEvents.sort((a, b) =>
        new Date(`${a.date.year}-${a.date.month}-${a.date.day}`).getTime() - new Date(`${b.date.year}-${b.date.month}-${b.date.day}`).getTime());

    for (let i = 0; i < sorted.length; i++) {
        const {date, label} = sorted[i]
        const time = new Date(`${date.year}-${date.month}-${date.day}`).getTime()
        const length = (time - lastTime) / (endTime - beginTime) * fullLength
        const left = offset + (lastTime - beginTime) / (endTime - beginTime) * fullLength
        results.push({
            label: label,
            date: `${date.month}.${date.day}`,
            color: colors[i % colors.length],
            width: length,
            left: left
        })
        lastTime = time
    }
    console.log(results)
    return results
}

const TimeLine = () => {
    const [finaleEventLabel, setFinalEventLabel] = useState("jerk off")
    const [date, setDate] = useState<DateStamp>({
        year: 2022,
        month: 12,
        day: 15
    })
    const [newTaskLabel, setNewTaskLabel] = useState("")
    const [newTaskDate, setNewTaskDate] = useState<DateStamp>({
        year: 2022,
        month: 12,
        day: 15
    })
    const [subEvents, setSubEvents] = useState<SubEvent[]>([
        {
            label: "jav",
            date: {
                year: 2022,
                month: 12,
                day: 2
            }
        },
        {
            label: "b",
            date: {
                year: 2022,
                month: 12,
                day: 5
            }
        },
        {
            label: "c",
            date: {
                year: 2022,
                month: 12,
                day: 7
            },
        },
        {
            label: "d",
            date: {
                year: 2022,
                month: 12,
                day: 10
            },
        }
    ])
    return (
        <>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
                initialValues={{remember: true}}
                autoComplete="off"
            >
                <Form.Item
                    label="final event"
                >
                    <Input value={finaleEventLabel} onChange={e => setFinalEventLabel(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="final date"
                >
                    <DatePicker style={{width: 400}} onChange={e => {
                        if (e !== null) {
                            setDate(createDateStampFromMoment(e))
                        }
                    }} defaultValue={moment("2022-12-15")}/>
                </Form.Item>

                <Form.Item
                    label="sub events"
                >
                    <List
                        bordered
                        size="small"
                        dataSource={items}
                        renderItem={(item, index) => (
                            <List.Item>
                                {index + 1}. {item.label} till {item.date}
                            </List.Item>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="new sub event"
                >
                    <Input value={newTaskLabel} onChange={e => setNewTaskLabel(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="new sub event date"
                >
                    <DatePicker style={{width: 400}} onChange={e => {
                        if (e !== null) {
                            setNewTaskDate(createDateStampFromMoment(e))
                        }
                    }} defaultValue={moment("2022-12-15")}/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" onClick={() => {
                        setSubEvents([...subEvents, {
                            date: newTaskDate,
                            label: newTaskLabel
                        }])
                    }}>
                        Add sub event
                    </Button>
                </Form.Item>
            </Form>
            <div className={styles.timeLineContainer}>
                <div className={styles.axis}/>
                {
                    parseSubEvents(subEvents, date).map((item, index) => <TimeLineItem label={item.label} date={item.date} color={item.color}
                                                             width={item.width} left={item.left}
                                                             key={"item_" + index}/>)
                }
                <div className={styles.finalLabel}>{finaleEventLabel}</div>
                <div className={styles.finalDate}>{`${date.month}.${date.day}`}</div>
            </div>
        </>


    )
}


const Another = () => {


    return (
        <div>
            <TimeLine/>
        </div>
    )
}

export default Another
