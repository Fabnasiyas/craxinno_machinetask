import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
    number: {
        type: Number, 
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    savings: {
        type: Number, 
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
