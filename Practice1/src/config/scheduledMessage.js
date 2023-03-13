import { scheduleJob } from 'node-schedule';
import MessageModel from '../schemas/message.schema.js';
import ScheduledMessageModel from '../schemas/scheduledMessage.schema.js';




const scheduledMessages = async () => {
    const messages = await ScheduledMessageModel.find();

        await Promise.all (
        messages.map(async mess => { 
            if(Date.parse(mess.date) > new Date().getTime()) {

                console.log("PROGRAMANDO...",mess)
              
                scheduleJob(mess.date, async () => {
                    const messageNew = new MessageModel({
                        title: mess.title,
                        addressee: mess.addressee,
                        authorName: mess.authorName,
                        date: mess.date,
                        message: mess.message
                    })
            
                    await messageNew.save()
                    ScheduledMessageModel.deleteOne({_id: mess.id})
        
                })
        
            } else {

                if(mess.attempts !== 2) {

                    console.log("RE-PROGRAMANDO...",mess)

                    const newAttempts = mess.attempts + 1;

                    const dateInt = new Date(new Date().getTime() + (1 * 60000) );
                    const newDate = new Date(dateInt)

                    await ScheduledMessageModel.findOneAndUpdate({_id : mess.id}, {date: newDate, attempts: newAttempts})

                    scheduleJob(newDate, async () => {
                        const messageNew = new MessageModel({
                            title: mess.title,
                            addressee: mess.addressee,
                            authorName: mess.authorName,
                            date: newDate,
                            message: mess.message
                        })
                
                        await messageNew.save()
            
                        await ScheduledMessageModel.deleteOne({_id: mess.id})
            
                    })


                } else {
                    await ScheduledMessageModel.deleteOne({_id: mess.id})
                }
               
            }
        
        })
    )



}

export default scheduledMessages;


