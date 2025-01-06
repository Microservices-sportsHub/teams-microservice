-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "teams_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_teams_members" ("created_at", "id", "is_deleted", "role", "teamId", "updated_at", "userId") SELECT "created_at", "id", "is_deleted", "role", "teamId", "updated_at", "userId" FROM "teams_members";
DROP TABLE "teams_members";
ALTER TABLE "new_teams_members" RENAME TO "teams_members";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
