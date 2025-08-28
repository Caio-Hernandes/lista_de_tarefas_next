"use server"
import { prisma } from "@/utils/prisma"

export const updateTaskStatus = async (taskId: string, newDone: boolean) => {
  const updatedTask = await prisma.tasks.update({
    where: { id: taskId },
    data: { done: newDone }
  })

  return updatedTask
}
