import {mongoose} from '../service/database.js';

const User = mongoose.model('User',
    {
        id: String,
        username: String,
        questionPoints: { type: Number, default: 0},
        money: { type: Number, default: 0},
        slotReset: Date,
    });

export default User;
