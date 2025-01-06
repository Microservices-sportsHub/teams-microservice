import { Transform, Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { CreateTeamsMembers } from "./create-team-members.dto";

export class CreateTeamDto {

    @IsString()
    @Transform((_name) => _name.value.toUpperCase())
    public name: string;
    
    @IsString()
    public description: string;

    @IsArray()
    @Type(() => CreateTeamsMembers) //Transforma e indica que es un arreglo de objetos de tipo CreateSubAdministratorDto
    @ValidateNested({ each: true }) //valida cada objeto dentro del arreglo
    public members: CreateTeamsMembers[];
}
