import { Team } from "./team.entity";

export class TeamsMembers {
    public id: string;
    public teamId: string;
    public userId: string;
    public role: string; // 'admin' | 'member' | 'guest' | 'owner' | 'subAdmin';
    public isDeleted: boolean;
    public createdAt: Date;
    public updatedAt: Date;
}
