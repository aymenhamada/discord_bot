import {mongoose} from '../service/database.js';

const User = mongoose.model('User',
    {
        id: String,
        username: String,
        questionPoints: Number,
        money: { type: Number, default: 0},
        slotReset: Date,
    });

export default User;
