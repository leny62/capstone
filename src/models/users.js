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
        type: String,
        required: true
    },
     date: {
         type: String,
         required: true
     }
})
 const users = model('users', usersCollectionSchema);
 const _users = users;
 export { _users as users };
