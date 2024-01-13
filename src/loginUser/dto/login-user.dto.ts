import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {
    @ApiProperty({ description: 'User email', example: 'cassio@gmail.com' })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ description: 'User password', example: 'cassio123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    password: string
}