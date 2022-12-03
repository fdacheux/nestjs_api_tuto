import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: 1, description: 'User id' })
  id: number;

  @ApiProperty({
    description: 'User date of creation',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    description: 'User date of update',
    format: 'date-time',
  })
  updatedAt: string;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ nullable: true, example: 'Avery' })
  firstName: string;

  @ApiProperty({ nullable: true, example: 'Bullock' })
  lastName: string;
}
