import { z } from "zod";

export interface Board {
    id:string;
    title:string;
}

export const boards:Board[] = [
    {
        id:"1",
        title: "aaaa"
    }
];

export const CreateBoardValidation = z.object({
    title: z.string().min(3, {
        message: "Board title must be at least 3 characters long"
    })
});

export interface State {
    errors?: {
        title?: string[];
    },
    message?: string | null;
}