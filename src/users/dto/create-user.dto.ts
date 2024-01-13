import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @ApiProperty({ description: 'Username', example: 'Cassio da Silva' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ description: 'User email', example: 'cassio@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ description: 'User password', example: 'cassio123' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(12)
    @MinLength(8)
    password: string
}
