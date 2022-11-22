import {useState} from "react";
import {createDateStampFromMoment, DateStamp, RepeatedEvent, TimeInDay} from "../../models/eventTask";
import {Button, DatePicker, Form, Input, InputNumber, Select, SelectProps} from "antd";

const {RangePicker} = DatePicker

const daysInWeekOptions: SelectProps['options'] = [
    {label: 'Monday', value: '1'},
    {label: 'Tuesday', value: '2'},
    {label: 'Wednesday', value: '3'},
    {label: 'Thursday', value: '4'},
    {label: 'Friday', value: '5'},
    {label: 'Saturday', value: '6'},
    {label: 'Sunday', value: '7'}
]

const RepetitiveRoutineTab = () => {
    const [label, setLabel] = useState("")

    const [startDate, setStartDate] = useState<DateStamp>({
        year: 2022,
        month: 11,
        day: 25
    })
    const [endDate, setEndDate] = useState<DateStamp>({
        year: 2022,
        month: 12,
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

    const [daysInWeek, setDaysInWeek] = useState<string[]>([])

    const onAdd = () => {
        const event: RepeatedEvent = {
            title: label,
            start: start,
            end: end,
            startDate: startDate,
            endDate: endDate,
            daysOfWeek: daysInWeek
        }
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
                <Input value={label} onChange={e => setLabel(e.target.value)} style={{width: 400}}/>
            </Form.Item>

            <Form.Item
                label="days in week"
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{width: '100%'}}
                    options={daysInWeekOptions}
                    onChange={e => setDaysInWeek(e)}
                />
            </Form.Item>

            <Form.Item
                label="start date"
            >
                <DatePicker style={{width: 400}} onChange={e => {
                    if (e !== null) {
                        setStartDate(createDateStampFromMoment(e))
                    }
                }}/>
            </Form.Item>

            <Form.Item
                label="end date"
            >
                <DatePicker style={{width: 400}} onChange={e => {
                    if (e !== null) {
                        setEndDate(createDateStampFromMoment(e))
                    }
                }}/>
            </Form.Item>

            <Form.Item
                label="Start"
            >
                <InputNumber addonBefore="hour" defaultValue={start.hour} value={start.hour}
                             onChange={e => setStart({hour: e ?? start.hour, minute: start.minute})} min={0}
                             max={23}/>
                <InputNumber addonBefore={"min"} defaultValue={start.minute}
                             onChange={e => setStart({hour: start.hour, minute: e ?? start.minute})}
                             min={0} max={59} style={{marginLeft: 10}}/>
            </Form.Item>

            <Form.Item
                label="End"
            >
                <InputNumber addonBefore="hour" defaultValue={end.hour} value={end.hour}
                             onChange={e => setEnd({hour: e ?? end.hour, minute: end.minute})} min={0}
                             max={23}/>
                <InputNumber addonBefore={"min"} defaultValue={end.minute} min={0}
                             onChange={e => setEnd({hour: end.hour, minute: e ?? end.minute})}
                             max={59} style={{marginLeft: 10}}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" onClick={onAdd}>
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RepetitiveRoutineTab