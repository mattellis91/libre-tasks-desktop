"use server"

import { createId } from "@paralleldrive/cuid2";
import { boards, CreateBoardValidation, State } from "@/data/board";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBoard(previousState:State, formData:FormData): Promise<State> {
    const validatedFields = CreateBoardValidation.safeParse({
        title: formData.get("title")
    });
    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields"
        };
    }
    try {
        boards.push({
            id:createId(),
            title:validatedFields.data.title
        });
        console.log(boards);
    } catch(e) {
        return {
            message: "Error adding new board"
        }
    }
    revalidatePath("/organization/1");
    redirect("/organization/1");

}