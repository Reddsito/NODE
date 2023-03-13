import UserModel from '../schemas/user.schema.js'
import { scheduleJob } from 'node-schedule';
import MessageModel from '../schemas/message.schema.js';
import ScheduledMessageModel from '../schemas/scheduledMessage.schema.js';
import mongoose from "mongoose";

const {Types} = mongoose;
const userScheduledMessage = async (req,res) => {
    const { id } = req;

    const { addressee, title, message, date } = req.body;

    const existingUserById = await UserModel.findById(id).exec();

    if(!existingUserById) return res.status(401).send({errors: 'unauthorized user'})


    const existingAddressee = await UserModel.findOne({email: addressee}).exec()

    if(!existingAddressee) return res.status(404).json({message: 'There is no user linked to that email.'})



    if(Date.parse(date) > new Date().getTime()) {
        
        const idSMessage = new Types.ObjectId();

        const scheduledMessageNew = new ScheduledMessageModel({
            _id: idSMessage,
            title,
            addressee,
            authorName: id,
            date,
            message,
            attempts: 0
        })

        await scheduledMessageNew.save()

        scheduleJob(date, async () => {
            const messageNew = new MessageModel({
                title,
                addressee,
                authorName: id,
                date,
                message
            })
    
            await messageNew.save()

            ScheduledMessageModel.deleteOne({_id: idSMessage})

        })






    } else {
       return res.status(401).json({message: 'Dates in the past are not validated.'})
    }

    return res.status(200).json({message: 'Message timed successfully'})


}

export default userScheduledMessage;