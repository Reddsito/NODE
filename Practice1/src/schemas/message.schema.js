import mongoose from "mongoose";

const {Schema, model} = mongoose;

const messageSchema = new Schema ({

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
    }

});

const MessageModel = model("Message", messageSchema);

export default MessageModel;
