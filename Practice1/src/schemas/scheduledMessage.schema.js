import mongoose from "mongoose";

const {Schema, model} = mongoose;

const scheduledMessageSchema = new Schema ({

    title: {
        type: String,
        require: true
    },

    addressee: {
        type: String,
        require: true
    },

    authorName: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        require: true,
    },

    message: {
        type: String,
        require: true,
    },
    attempts: {
        type: Number,
        require: true
    }

});

const ScheduledMessageModel = model("ScheduledMessage", scheduledMessageSchema);

export default ScheduledMessageModel;
