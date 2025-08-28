"use server"
import {prisma} from "@/utils/prisma"

export const deleteCompletedTasks = async () =>{
    try{
        await prisma.tasks.deleteMany({where: {done: true}})
        
        const allTasks = await prisma.tasks.findMany({where: {done: false}})
        if (!allTasks) return
        return allTasks
        
    }catch(error){
        throw(error)
    }
}