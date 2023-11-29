import * as fs from 'fs';
import * as path from 'path';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class MateriaisService {}
