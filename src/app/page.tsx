import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Check, List, CircleEllipsis, SquarePen, Trash, ListCheck, Sigma} from 'lucide-react';
import { Badge  } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Home = () => {
  return(
    <main className = "w-full h-screen bg-gray-100 flex justify-center items-center">
      
      
      <Card className ="w-lg p-2">
        <CardHeader className = "flex gap-2">
        <Input placeholder = "Digite algo sua bicha"></Input>
        <Button><Plus />Cadastrar</Button>
        </CardHeader>
        <CardContent>
        <Separator className = "mb-4"/>
        <div className = "flex gap-2">
          <Badge className ="cursor-pointer" variant="outline"><List/>Todas</Badge>
          <Badge className ="cursor-pointer" variant="outline"><CircleEllipsis/>Não finalizados</Badge>
          <Badge className ="cursor-pointer" variant="outline"><Check/>Concluídas</Badge>
        </div>

       <div className="mt-4 border-b-1">

    <div className="h-14 flex justify-between items-center border-b border-t">
      <div className="w-1 h-full bg-green-300"></div>
      <p className="flex-1 px-2 text-sm">Estudar React</p>
      <div className="flex gap-2 items-center">
        <Dialog>
  <DialogTrigger asChild>
    <SquarePen size={18} className="cursor-pointer"/>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar tarefa</DialogTitle> 
    </DialogHeader>
    <div className="flex gap-2">
      <input placeholder="Editar tarefa" className="flex-1 pl-2"/>
      <Button className="cursor-pointer">Editar</Button>
    </div>
  </DialogContent>
</Dialog>
        <Trash size={18} className="cursor-pointer"/>
      </div>
    </div>

    
    
    

    
        </div>



        <div className="flex justify-between mt-4">
          <div className="flex gap-2 items-center">
            <ListCheck size={18}/>
          <p className="text-xs">Tarefas Concluídas(3/3)</p>
        </div>
        <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button className="text-xs h-7 cursor-pointer" variant="outline"><Trash/>
    Limpar tarefas concluídas</Button>
    </AlertDialogTrigger>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza que deseja excluir x itens?</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Sim</AlertDialogCancel>
      <AlertDialogAction>Cancelar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </div>

        <div className ="h-8 w-full bg-gray-100 mt-4 rounded-md">
          <div className="h-full bg-pink-500 rounded-md" style={{width: "50%"}}></div>
        </div>

        <div>

        </div>


        </CardContent>

        <div className="flex justify-end itemns-center mt-2 gap2">
          <Sigma size={18}/>
          <p className="text-xs">3 tarefas no total</p>
        </div>

      </Card>
       
    </main>
  )
}

export default Home