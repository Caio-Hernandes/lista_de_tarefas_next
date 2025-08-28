"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash, ListCheck, Sigma, LoaderCircle} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {getTasks} from "@/actions/get-tasks-from-db"
import { useEffect, useState } from "react"
import { Tasks } from "@/generated/prisma"
import {NewTask} from "@/actions/add-task"
import {deleteTask} from "@/actions/delete-task"
import { toast } from "sonner"
import { EditTask} from "@/components/edit-task"
import {updateTaskStatus} from "@/actions/toggle-done"
import Filter from "@/components/filter"
import {FilterType} from "@/components/filter"
import { deleteCompletedTasks } from "@/actions/clear-completed-tasks"

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([])
  const [task, setTask] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<FilterType> ('all')
  const[filteredTasks, setFilteredTasks] = useState<Tasks[]>([])
  const num = 10

  const handleGetTasks = async () =>{
    try{
      const tasks = await getTasks()
      if (!tasks) return
      setTaskList(tasks)
    }catch(error){
      throw(error)
    }
  }

  const handleAddTask = async () => {
  setLoading(true)
  try {
    if (!task || task.length === 0) {
      toast.error("Insira uma tarefa!")
      return
    }

    const myNewTask = await NewTask(task) 
    if (!myNewTask) return

    await handleGetTasks()
    setTask('')
    toast.success("Tarefa adicionada com sucesso!")
  } catch (error) {
    console.error(error)
    toast.error("Erro ao adicionar tarefa")
  } finally {
    setLoading(false) // garante que sempre desliga o loading
  }
}
  

  const handleDeleteTask = async (id: string) => {
    try{
      if(!id) return
      const deletedTask = await deleteTask(id)
      if (!deletedTask) return
      await handleGetTasks()
      toast.success("Tarefa deletada com sucesso!")
    }catch(error){
      throw(error)
    }
  }

  const handleToggleTask = async (taskId: string) =>{
    let newDone = false
    setTaskList((prev) =>
    prev.map((task) => {
      if (task.id === taskId) {
        newDone = !task.done
        return { ...task, done: newDone }
      }
      return task
    })
  )

    try {
    await updateTaskStatus(taskId, newDone)
  } catch (error) {
    console.error(error)
    toast.error("Erro ao atualizar tarefa")
  }
}

const clearCompletedTasks = async () =>{
  const deletedTasks = await deleteCompletedTasks()

  if (!deletedTasks) return

  setTaskList(deletedTasks)
      

    }

  useEffect(() => {
    handleGetTasks()
  }, [])

  useEffect(() =>{
    switch(currentFilter){
      case 'all': setFilteredTasks(taskList); break;
      case 'pending': setFilteredTasks(taskList.filter((task) => !task.done)); break;
      case 'completed': setFilteredTasks(taskList.filter((task) => task.done)); break;
    }
  }, [currentFilter, taskList])

  return(
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-2">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" onChange={(e) => setTask(e.target.value)} value={task}/>
          <Button className="cursor-pointer" onClick={handleAddTask}>
            {loading ? <LoaderCircle className="animate-spin"/> : <Plus />}
            Cadastrar
          </Button>
        </CardHeader>
        
        <CardContent>
          <Separator className="mb-4"/>


        <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}/>

          <div className="mt-4 border-b-1">
            {taskList.length === 0 && <p className="text-sm text-gray-400">Nenhuma tarefa cadastrada</p>}
            {filteredTasks.map(({ id, task, done }) => (
              <div
                className="h-14 flex justify-between items-center border-b border-t"
                key={id}
              >
                <div className={`${done ? "w-1 h-full bg-green-400" : "w-1 h-full bg-red-400"}`}></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer"
                  onClick={() => handleToggleTask(id)}
                >
                  {task}
                </p>
                <div className="flex gap-2 items-center">
                  <EditTask task ={{id, task, done}} handleGetTasks={handleGetTasks}/>
                  <Trash size={18} className="cursor-pointer" onClick={() => handleDeleteTask(id)}/>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18}/>
              <p className="text-xs">
                Tarefas Concluídas({taskList.filter((task) => task.done).length}/{taskList.length})
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7 cursor-pointer" variant="outline">
                  <Trash/>Limpar tarefas concluídas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir {taskList.filter((task) => task.done).length} 
                    {taskList.filter((task) => task.done).length === 1 ? ' item' : ' itens'}?
                  </AlertDialogTitle>

                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                  <AlertDialogAction className="cursor-pointer" onClick ={clearCompletedTasks}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-4 w-full bg-gray-100 mt-4 rounded-md">
            
            <div className="h-full rounded-md" style={{backgroundColor: "var(--primary)", width: `${(taskList.filter((task) => task.done).length / taskList.length) * 100}%`}}></div>
          </div>
        </CardContent>

        <div className="flex justify-end items-center mt-2 gap-2">
          <Sigma size={18}/>
          <p className="text-xs">{taskList.length} tarefas no total</p>
        </div>
      </Card>
    </main>
  )
}

export default Home
