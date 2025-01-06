import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateTeamsMembers {

    @IsString()
    @IsOptional()
    public teamId?: string;
    
    @IsString()
    public userId: string; 

    @IsString()
    public role: string; // 'ADMIN' | 'MEMBER' | 'GUEST' | 'SUBADMIN';
    
    @IsBoolean()
    @IsOptional()
    public isDeleted?: boolean;
}
