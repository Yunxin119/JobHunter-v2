import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }]
});

// MARK: Method to set hashed password
UserSchema.methods.setPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(password, salt);
};

// MARK: Method to check password validity
UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.passwordHash);
};

UserSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        username: this.username,
        email: this.email,
        role: "User",
    };
};

export default mongoose.model("User", UserSchema);
