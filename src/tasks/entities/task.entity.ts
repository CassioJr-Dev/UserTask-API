import { Task } from "@prisma/client";
import { randomUUID as  uuidv4 } from "crypto";

export class TaskEntity implements Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;

    constructor() {
        if(!this.id){
            this.id = uuidv4()
        }
    }
}
