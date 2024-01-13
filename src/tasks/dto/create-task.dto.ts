import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateTaskDto {
  @ApiProperty({ description: 'Task title', example: 'Estudar programação' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ description: 'Task description', example: 'Estudar typescript por 20 minutos' })
  @IsString()
  @IsNotEmpty()
  description: string
}
