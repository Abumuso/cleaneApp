import { PartialType } from '@nestjs/swagger';
import { CreateWorkTimeDto } from './create-work_time.dto';

export class UpdateWorkTimeDto extends PartialType(CreateWorkTimeDto) {}
