import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class TeamsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('TeamsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Conexión con la base de datos establecida');
  }

  async create(createTeamDto: CreateTeamDto) {
    try {
      const newTeam = await this.team.create({
        data: {
          ...createTeamDto,
          members: {
            create: createTeamDto.members,
          },
        },
      });
      return newTeam;
    } catch (error) {
      this.logger.error('Error al crear el equipo', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new BadRequestException(
              'Ya existe un equipo con este nombre.',
            );
          case 'P2025':
            throw new NotFoundException(
              'No se pudo encontrar el recurso relacionado.',
            );
          default:
            // Otros errores conocidos
            throw new InternalServerErrorException(
              'Error al procesar la solicitud.',
            );
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(
          'Los datos proporcionados no son válidos.',
        );
      } else {
        throw new InternalServerErrorException('Ocurrió un error inesperado.');
      }
    }
  }

  async findAll(paginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.team.count();
    const lastPage = Math.ceil(totalPages / limit);
    const data = await this.team.findMany({
      where: {
        isDeleted: false,
      },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        members: true,
      },
    });

    return {
      data,
      meta: {
        totalRecords: totalPages,
        totalPages: lastPage,
        currentPage: page,
        perPage: limit,
        prev: page > 1 ? `/teams?page=${page - 1}&limit=${limit}` : null,
        next: page < lastPage ? `/teams?page=${page + 1}&limit=${limit}` : null,
      },
    };
  }

  async findOne(id: string) {
    const team = await this.team.findUnique({
      where: { id, isDeleted: false },
      include: {
        members: true,
      },
    });
    if (!team) {
      throw new NotFoundException(`Team with ID:${id} not found`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    
    const {id:__, ...data}=updateTeamDto; //destructuración de id y el resto de los datos esto es para que no entre en conflicto con el id que llega adicional
    console.log(data);

    const teamsExist = await this.team.findFirst({
      where: { id, isDeleted: false },
    });

    if (!teamsExist) {
      throw new NotFoundException(`Team with ID:${id} not found`);
    }

    const team = this.team.update({
      where: {id},
      data: {
        ...data,
        members: {
          deleteMany: {},
          create: data.members,
        },
      },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID:${id} not found`);
    }

    return team;
  }

  remove(id: string) {
    const team = this.team.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    return team;
  }
}
