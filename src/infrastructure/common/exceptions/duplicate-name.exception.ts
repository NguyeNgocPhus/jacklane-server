import { BadRequestException } from '@nestjs/common';

export class DuplicateNameException extends BadRequestException {
  constructor(message) {
    super({message:message});
  }
}