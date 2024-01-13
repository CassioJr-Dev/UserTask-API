import { ApiResponseProperty } from "@nestjs/swagger"
import { randomUUID } from "crypto"

export class UserAnswers {

    @ApiResponseProperty({example: randomUUID()})
    id: string

    @ApiResponseProperty({example: 'Cassio da Silva'})
    name: string

    @ApiResponseProperty({example: 'cassio@gmail.com'})
    email: string

    @ApiResponseProperty()
    createdAt: Date
    @ApiResponseProperty()
    updatedAt: Date
}