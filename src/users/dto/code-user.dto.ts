import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CodeUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(6)
    @MinLength(6)
    code: string
}