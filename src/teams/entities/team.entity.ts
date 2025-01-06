import { TeamsMembers } from "./team-members.entity";

export class Team {
    public id: string;
    public name: string;
    public description: string;
    public isDeleted: boolean;
    public createdAt: Date;
    public updatedAt: Date;
}
