import { ApiResponseProperty } from "@nestjs/swagger"
import { randomUUID } from "crypto";


export class TaskAnswers {
    
    @ApiResponseProperty({ example: randomUUID() })
    id: string

    @ApiResponseProperty({ example: 'Estudar programação' })
    title: string;

    @ApiResponseProperty({ example: 'Estudar typescript por 20 minutos' })
    description: string;

    @ApiResponseProperty({ example: false })
    completed: boolean;
    
    @ApiResponseProperty()
    createdAt: Date
    @ApiResponseProperty()
    updatedAt: Date

    @ApiResponseProperty({ example: randomUUID() })
    authorId: string;

}