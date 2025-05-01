import Student from "../models/student.js";

export function getSudents(req,res){
    Student.find().then(
        (data)=>{
            res.json(data)
        }
    )
}


export function saveStudent (req,res){

        console.log(req.body)

      const student=new Student(
            {
                name:req.body.name,
                age:req.body.age,
                stream:req.body.stream,
                Email:req.body.Email
            }

        )

        student.save().then(()=>{
            res.json({
                message:"student added successfully"

            })
        }).catch(()=>{
            res.json({
                message:"student failed to add"
             })     
        })
        

    }






