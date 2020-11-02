import {mongoose} from '../service/database.js';

const User = mongoose.model('User',
    {
        id: String,
        username: String,
        questionPoints: Number
    });

export default User;
