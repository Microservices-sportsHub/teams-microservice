import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    
    //return createTeamDto;
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    //return paginationDto;
    return this.teamsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return id;
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
