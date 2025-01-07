import { Controller } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern('create-team')
  create(@Payload() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @MessagePattern('get-all-teams')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.teamsService.findAll(paginationDto);
  }

  @MessagePattern('find-one-team')
  findOne(@Payload('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @MessagePattern('update-one-team')
  update(@Payload() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(updateTeamDto.id, updateTeamDto);
  }

  @MessagePattern('delete-one-team')
  remove(@Payload('id') id: string) {
    return this.teamsService.remove(id);
  }
}
