import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    @IsNumber()
    @IsPositive()
    id: string;
}
