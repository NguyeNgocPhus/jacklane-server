import { HttpException, NotFoundException } from '@nestjs/common';


export class EmailNotExistException extends NotFoundException {
  constructor(message: any) {
    super();
  }
}