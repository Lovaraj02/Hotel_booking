import mongoose from "mongoose";
const Schema = mongoose.Schema;
let reservationSchema = new Schema({
    username:{
        type : String,
        required:true
    },
    name : {
        type : String,
        required:true
    },
    phone : {
        type : String,
        required:true
    },
    date : {
        type : String,
        required:true
    },
    time : {
        type : String,
        required:true
    },
    selectedTableType : {
        type : String,
        required:true
    }
});
export default mongoose.model("reservation",reservationSchema);