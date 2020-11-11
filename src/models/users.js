import { Schema, model } from 'mongoose';

const usersCollectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default : new Date()
    }
})
const Users = model('users', usersCollectionSchema);
export default Users;

