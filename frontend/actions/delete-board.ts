import { z } from "zod";
import { boards } from "@/data/board";
import { revalidatePath } from "next/cache";

export const CreateBoard = z.object({
    title: z.string()
})

export async function deleteBoard(id:string) {
    "use server"
    const foundIndex = boards.findIndex((board) => board.id === id);
    if(foundIndex >= 0) {
        boards.splice(foundIndex, 1);
    }
    revalidatePath("/organization/1");
}