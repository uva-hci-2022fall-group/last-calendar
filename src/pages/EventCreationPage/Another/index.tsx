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

const colors = ["orange", "red", "green", "blue", "pink"]

const parseSubEvents = (subEvents: SubEvent[], startDate: DateStamp, endDate: DateStamp): TimeLineItemProps[] => {
    let results: TimeLineItemProps[] = []
    const beginTime = new Date(`${startDate.year}-${startDate.month}-${startDate.day}`).getTime()
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
    const [endDate, setEndDate] = useState<DateStamp>({
        year: 2022,
        month: 12,
        day: 15
    })
    const [startDate, setStartDate] = useState<DateStamp>({
        year: 2022,
        month: 12,
        day: 1
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

    const deleteEvent = (index: number) => {
        setSubEvents([...subEvents.slice(0, index), ...subEvents.slice(index + 1)])
    }

    const items = parseSubEvents(subEvents, startDate, endDate)
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
                    label="event"
                >
                    <Input value={finaleEventLabel} onChange={e => setFinalEventLabel(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="start date"
                >
                    <DatePicker style={{width: 400}} onChange={e => {
                        if (e !== null) {
                            setStartDate(createDateStampFromMoment(e))
                        }
                    }} defaultValue={moment("2022-12-1")}/>
                </Form.Item>
                
                <Form.Item
                    label="final date"
                >
                    <DatePicker style={{width: 400}} onChange={e => {
                        if (e !== null) {
                            setEndDate(createDateStampFromMoment(e))
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
                                <div className={styles.itemContainer}>
                                    <div>{index + 1}. {item.label} till {item.date}</div>
                                    <div/>
                                    <Button onClick={() => deleteEvent(index)}>delete</Button>

                                </div>

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
                    items.map((item, index) => <TimeLineItem label={item.label} date={item.date} color={item.color}
                                                             width={item.width} left={item.left}
                                                             key={"item_" + index}/>)
                }
                <div className={styles.finalLabel}>{finaleEventLabel}</div>
                <div className={styles.finalDate}>{`${endDate.month}.${endDate.day}`}</div>
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
