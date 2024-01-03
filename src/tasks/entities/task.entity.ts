import { Task } from "@prisma/client";

export class TaskEntity implements Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;

}
