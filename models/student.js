import mongoose from "mongoose";

  const studentSchema=mongoose.Schema(
                {
                    name:String,
                    age:Number,
                    stream:String,
                    Email:String
                }

            )

  const Student=mongoose.model("students",studentSchema)


  export default Student;