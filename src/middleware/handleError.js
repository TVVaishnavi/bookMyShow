const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const err = require("../models/error")


const error = async(errName,errMessage)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const createNewError = new err({
        dateTime : dateTime,
        id : uuid(),
        errName : errName,
        errMessage : errMessage
    })
    const saveError = await createNewError.save()
    return saveError

}
const errEvents = async (name, message) => {
    try {
        const errEvent = await error(name, message)
    } catch (err) {
        console.log(err)
    }
}

const blocker=(err, req, res, next)=>{
    errEvents(err.name, err.message)
    console.log(`${err.name} ${err.message}`)
    next()
}

module.exports = {blocker}