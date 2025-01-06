-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "teams_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_teams_members" ("created_at", "id", "is_deleted", "role", "team_id", "updated_at", "user_id") SELECT "created_at", "id", "is_deleted", "role", "team_id", "updated_at", "user_id" FROM "teams_members";
DROP TABLE "teams_members";
ALTER TABLE "new_teams_members" RENAME TO "teams_members";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
