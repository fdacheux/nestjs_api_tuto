import { ApiProperty } from '@nestjs/swagger';

export class BookmarkEntity {
  @ApiProperty({ example: 1, description: 'Bookmark id' })
  id: number;

  @ApiProperty({
    description: 'Bookmark date of creation',
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Bookmark date of update',
    format: 'date-time',
  })
  updatedAt: string;

  @ApiProperty({
    example: 'A super website',
  })
  title: string;

  @ApiProperty({
    nullable: true,
    example: 'A website very useful and awesome',
  })
  description: string;

  @ApiProperty({ example: 'https://wwww.an-url.com' })
  link: string;

  @ApiProperty({ example: 1 })
  userId: number;
}
