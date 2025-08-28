import { SquarePen } from "lucide-react"
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {Tasks} from "@/generated/prisma"
import { useState } from "react"
import { toast } from "sonner"
import {editTask} from "@/actions/edit-tasks"

type TaskProps = {
    task: Tasks
    handleGetTasks: () => void
}

export const EditTask = ({task, handleGetTasks}: TaskProps) => {
    const [editedTask, setEditedTask] = useState(task.task)

    const handleEditTask = async (id: string, tarefa: string) =>{
        if(editedTask !== task.task){
            toast.success("Informações válidas!")
        }else{
            toast.error("As informações não foram alteradas!")
            return
        }
        await editTask({idTask: id, newTask: tarefa})

        handleGetTasks()
    }
    return (
    <Dialog>
        <DialogTrigger asChild>
            <SquarePen size ={16} className ="cursor-pointer"/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar tarefa</DialogTitle>
                </DialogHeader>

                <div className ="flex gap-2">
                    <Input
                    placeholder ="Editar tarefa"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}/>
                    <DialogClose asChild>
                    <Button className ="cursos-pointer" onClick ={() => handleEditTask(task.id, editedTask)}>Editar</Button>
                    </DialogClose>
                </div>
                </DialogContent>
                </Dialog>
    )
              
                   
}