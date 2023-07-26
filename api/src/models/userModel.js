
import { connect, Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { genSalt, hash } from 'bcrypt';


main()
.then(() => console.log('database connected...'))
.catch(err => console.log(err));

let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

async function main() {
    connect("mongodb://xpayback:xpayback@192.168.0.110:27017/xpayback");
}


const userSchema = new Schema({
    name: String,
    nickname: Object,
    age: Number,
    email: { type : String , unique : true, required : true, dropDups: true },
    password: String,
    confirmPassword: String
});

userSchema.plugin(uniqueValidator);
userSchema.pre('save', function() {
    let isValidEmail = regex.test(this.email);
    if (isValidEmail) {
        console.log('Email address is valid...');
    } else {
        throw Error("Invalid Email...");
    };
});

userSchema.pre('save', async function() {
    let salt = await genSalt();
    let hashedString = await hash(this.password, salt);
    this.password = hashedString;
})

const userModel = new model('user', userSchema);


export default userModel;





