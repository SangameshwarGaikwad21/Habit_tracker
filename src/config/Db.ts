import mongoose from "mongoose"

export const ConnectionTODB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        const connection = mongoose.connection
        
        connection.on("connected",()=>{
            console.log(`Db is connected`)
        })

        connection.on("error",(error)=>{
            console.log(`Db is not conected`,+ error)
            process.exit(1)
        })
    } 
    catch (error:any) {
        throw new Error(`Db is not connected,${error.message}`)    
    }
} 