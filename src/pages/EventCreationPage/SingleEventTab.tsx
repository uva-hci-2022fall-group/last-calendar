import {useContext, useState} from "react";
import {createDateStampFromMoment, DateStamp, EventTask, TimeInDay} from "../../models/eventTask";
import {Button, DatePicker, Form, Input, InputNumber} from "antd";
import moment from "moment";
import {SingleEventsContext} from "../../contexts/SingleEventsContext";


const SingleEventTab = () => {
    const {singleEvents, setSingleEvents} = useContext(SingleEventsContext)
    const [label, setLabel] = useState("")
    const [date, setDate] = useState<DateStamp>({
        year: 2022,
        month: 11,
        day: 25
    })
    const [start, setStart] = useState<TimeInDay>({
        hour: 10,
        minute: 0
    })
    const [end, setEnd] = useState<TimeInDay>({
        hour: 11,
        minute: 0
    })
    const [priority, setPriority] = useState(1)

    const onAdd = () => {
        const event: EventTask = {
            priority: priority,
            date: date,
            start: start,
            end: end,
            title: label
        }
        setSingleEvents([...singleEvents, event])
    }

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 8}}
            initialValues={{remember: true}}
            autoComplete="off"
        >
            <Form.Item
                label="label"
            >
                <Input  value={label} onChange={e => setLabel(e.target.value)} style={{width: 400}}/>
            </Form.Item>
            <Form.Item
                label="date"
            >
                <DatePicker style={{width: 400}} onChange={e => {
                    if (e !== null) {
                        setDate(createDateStampFromMoment(e))
                    }
                }} defaultValue={moment("2022-11-25")}/>
            </Form.Item>

            <Form.Item
                label="Start"
            >
                <InputNumber addonBefore="hour" defaultValue={start.hour} value={start.hour}
                             onChange={e => setStart({hour: e ?? start.hour, minute: start.minute})} min={0}
                             max={23}/>
                <InputNumber addonBefore={"min"} defaultValue={0} min={0} max={59} style={{marginLeft: 10}}/>
            </Form.Item>

            <Form.Item
                label="End"
            >
                <InputNumber addonBefore="hour" defaultValue={end.hour} value={end.hour}
                             onChange={e => setEnd({hour: e ?? end.hour, minute: end.minute})} min={0}
                             max={23}/>
                <InputNumber addonBefore={"min"} defaultValue={0} min={0} max={59} style={{marginLeft: 10}}/>
            </Form.Item>

            <Form.Item
                label="Priority"
            >
                <InputNumber addonBefore="low(1)" addonAfter={"high(5)"} value={priority}
                             onChange={e => setPriority(e ?? 1)} min={1} max={5}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" onClick={onAdd}>
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SingleEventTab