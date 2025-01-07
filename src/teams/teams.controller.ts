import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  //@Post()
  @MessagePattern('create-team') //puede usarse un string o un objeto (create-team)
  create(@Payload() createTeamDto: CreateTeamDto) {
    //return createTeamDto;
    return this.teamsService.create(createTeamDto);
  }

  //@Get()
  @MessagePattern('get-all-teams')
  findAll(@Payload() paginationDto: PaginationDto) {
    //return paginationDto;
    return this.teamsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern('find-one-team')
  findOne(@Payload('id') id: string) {
    //return id;
    return this.teamsService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern('update-one-team')
  update(
    //@Param('id') id: string, 
    //@Body() updateTeamDto: UpdateTeamDto
    @Payload() updateTeamDto: UpdateTeamDto,

    
  ) {
    return this.teamsService.update(updateTeamDto.id, updateTeamDto);
  }

  //@Delete(':id')
  @MessagePattern('delete-one-team')
  remove(@Payload('id') id: string) {
    return this.teamsService.remove(id);
  }
}
