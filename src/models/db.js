import { set, connect } from 'mongoose';
import dotenv from 'dotenv';

set('useNewUrlParser', true);
set('useFindAndModify', false);
set('useCreateIndex', true);
set('useUnifiedTopology', true);
dotenv.config();

connect(`${process.env.CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to mongodb successfully....'))
.catch(err =>console.log('Failed to connect to mongodb!',err));

import './users';
import './blogs';
import './inquiry';
