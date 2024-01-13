import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTaskDto } from './create-task.dto'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ description: 'Task completed', default: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean
}

