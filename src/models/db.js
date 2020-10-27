import { set, connect } from 'mongoose';
set('useNewUrlParser', true);
set('useFindAndModify', false);
set('useCreateIndex', true);
set('useUnifiedTopology', true);

connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to mongodb successfully....'))
.catch(err =>console.log('Failed to connect to mongodb!',err));

import './users';
import './blogs';
import './inquiry';



