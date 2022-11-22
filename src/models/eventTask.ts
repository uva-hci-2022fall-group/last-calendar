import moment from "moment";

type DateStamp = {
    year: number
    month: number
    day: number
}

type TimeInDay = {
    hour: number,
    minute: number
}

class TimeSlot {
    constructor(date: DateStamp, start: TimeInDay, end: TimeInDay) {
        this.date = date
        this.start = start;
        this.end = end;
    }
    date: DateStamp
    start: TimeInDay
    end: TimeInDay

    period() {
        return (this.end.hour - this.start.hour) * 60 + (this.end.minute - this.start.minute)
    }

    format() {
        const {year, month, day} = this.date
        return `${year}.${month}.${day} (${this.start.hour}:${this.start.minute} - ${this.end.hour}:${this.end.minute})`
    }
}

type EventTask = {
    title: string
    priority: number
    date?: DateStamp
    start: TimeInDay
    end: TimeInDay
}

type TaskPart = {
    name: string
    period: number
}


const compareTimeInDay = (a: TimeInDay, b: TimeInDay) => {
    const minuteA = a.hour * 60 + a.minute
    const minuteB = b.hour * 60 + b.minute
    return minuteB - minuteA
}

class FlexibleEvent {
    title: string
    timeSlots: TimeSlot[]
    taskParts: TaskPart[]
    slotUnavailable: boolean[]

    postpone(index: number) {
        this.slotUnavailable[index] = true
    }

    getTasks() {
        let tasks: EventTask[] = []
        const m = this.timeSlots.length, n = this.taskParts.length
        let curSlotIndex = 0, curUsedMinute = 0
        for (let i = 0; i < n; i++) {
            const part = this.taskParts[i]
            if (!this.slotUnavailable[curSlotIndex] || this.timeSlots[curSlotIndex].period() - curUsedMinute < part.period) {
                while (curSlotIndex < m && !this.slotUnavailable[curSlotIndex] && this.timeSlots[curSlotIndex].period() < part.period) {
                    ++curSlotIndex
                }
                if (curSlotIndex === m) {
                    break
                }
                curUsedMinute = 0
            }
            const slot = this.timeSlots[curSlotIndex]
            const startMinute = slot.start.hour * 60 + slot.start.minute + curUsedMinute
            tasks.push({
                date: slot.date,
                title: part.name,
                priority: 0,
                start: {
                    hour: startMinute / 60,
                    minute: startMinute % 60
                },
                end: {
                    hour: (startMinute + part.period) / 60,
                    minute: (startMinute + part.period) % 60
                }
            })
            curUsedMinute += part.period
        }

        return tasks
    }


    constructor(title: string, timeSlots: TimeSlot[], taskParts: TaskPart[]) {
        this.title = title
        this.timeSlots = timeSlots;
        this.taskParts = taskParts;
        this.slotUnavailable = []
    }
}

const createDateStampFromMoment = (m: moment.Moment): DateStamp => {
    return {
        year: m.year(),
        month: m.month() + 1,
        day: m.date()
    }
}


export type {DateStamp, TimeInDay, EventTask, TaskPart}
export {compareTimeInDay, createDateStampFromMoment, TimeSlot}