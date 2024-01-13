import { ApiResponseProperty } from "@nestjs/swagger"
import { randomUUID } from "crypto"
import { sign } from "jsonwebtoken"

const uuid = randomUUID()

export class LoginAnswers {

    @ApiResponseProperty({example: uuid})
    id: string

    @ApiResponseProperty({example: 'Cassio da Silva'})
    name: string

    @ApiResponseProperty({example: 'cassio@gmail.com'})
    email: string

    @ApiResponseProperty({example: sign({ uuid }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    })})
    jwtToken: string
}