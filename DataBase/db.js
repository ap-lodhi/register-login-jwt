const  mongoose = require("mongoose")



async function connectDb(){
   

        try{
            
          await  mongoose.connect("mongodb://127.0.0.1:27017/oyesters")
          console.log("Successfully connected to DB")
        } catch(error){
            console.error('Error connecting to MongoDB:', error);
        }

      
        
}

module.exports=connectDb