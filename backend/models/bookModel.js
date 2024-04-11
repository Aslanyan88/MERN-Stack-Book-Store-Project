import mongoose from 'mongoose';
const {Schema} = mongoose;


const bookStore = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true,
    }
);

export const BookStore = mongoose.model('Cat', bookStore);