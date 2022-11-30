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

interface EventTask extends Prioritized {
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

interface Prioritized {
    priority: number
}

interface RepeatedEvent extends Prioritized{
    title: string
    daysOfWeek: string[]
    start: TimeInDay
    end: TimeInDay
    startDate: DateStamp
    endDate: DateStamp
}


const compareTimeInDay = (a: TimeInDay, b: TimeInDay) => {
    const minuteA = a.hour * 60 + a.minute
    const minuteB = b.hour * 60 + b.minute
    return minuteB - minuteA
}

class FlexibleEvent implements Prioritized{
    title: string
    timeSlots: TimeSlot[]
    taskParts: TaskPart[]
    slotUnavailable: boolean[]
    priority: number

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
                priority: this.priority,
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


    constructor(title: string, priority: number, timeSlots: TimeSlot[], taskParts: TaskPart[]) {
        this.priority = priority
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

const startOfWeek = (date: Date): Date => {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));

}

const millSecondsInADay = 24 * 60 * 60 * 1000
const millSecondsInAWeek = millSecondsInADay * 7

const getTasksFromRepeatedEvent = (event: RepeatedEvent): EventTask[] => {
    const {startDate, endDate} = event
    const startTime = startOfWeek(new Date(`${startDate.year}-${startDate.month}-${startDate.day}`)).getTime() + millSecondsInADay / 2
    const endTime = new Date(`${endDate.year}-${endDate.month}-${endDate.day}`).getTime()
    let results: EventTask[] = []
    const millSecondsInWeek = event.daysOfWeek.map(s => (parseInt(s) - 1) * millSecondsInADay)
    let cur = startTime
    const n = millSecondsInWeek.length
    console.log(new Date(startTime))
    console.log(new Date(endTime))
    console.log(`${startTime} ${endTime} ${n}`)
    console.log(millSecondsInWeek)


    while (cur < endTime) {
        for (let i = 0; i < n; i++) {
            const time = cur + millSecondsInWeek[i]
            const date = new Date(time)
            if (time > startTime && time < endTime) {
                const dateStamp: DateStamp = {
                    year: date.getUTCFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
                results.push({
                    start: event.start,
                    end: event.end,
                    date: dateStamp,
                    title: event.title,
                    priority: event.priority
                })
            }
        }
        cur += millSecondsInAWeek
        console.log(cur)
    }
    console.log(results)
    return results
}

const dateStampEquals = (a: DateStamp, b: DateStamp): boolean => {
    return a.year === b.year && a.month === b.month && a.day === b.day
}

type LongTermPlan = {

}


export type {DateStamp, TimeInDay, EventTask, TaskPart, RepeatedEvent, LongTermPlan}
export {compareTimeInDay, createDateStampFromMoment, TimeSlot, FlexibleEvent, getTasksFromRepeatedEvent, dateStampEquals}