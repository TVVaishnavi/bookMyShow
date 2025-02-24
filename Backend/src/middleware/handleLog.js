const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const log = require("../models/log")


const logEvent = async(method, origin, path)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const createNewLog = new log({
        dateTime : dateTime,
        id : uuid(),
        method : method,
        origin : origin,
        path : path
    })
    const saveLog = await createNewLog.save()
    return saveLog

}
const logEvents = async (method, origin, path) => {
    try {
        const logEven = await logEvent(method, origin, path)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, next)=>{
    logEvents(req.method, req.headers.origin, req.path)
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {logger}