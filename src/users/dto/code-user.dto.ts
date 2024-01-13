import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CodeUserDto {
    @ApiProperty({ description: `Verification code sent to the user's email` })
    @IsString()
    @IsNotEmpty()
    @MaxLength(6)
    @MinLength(6)
    code: string
}