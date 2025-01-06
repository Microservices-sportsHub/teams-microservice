/*
  Warnings:

  - You are about to drop the column `teamId` on the `teams_members` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `teams_members` table. All the data in the column will be lost.
  - Added the required column `team_id` to the `teams_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `teams_members` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "teams_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_teams_members" ("created_at", "id", "is_deleted", "role", "updated_at") SELECT "created_at", "id", "is_deleted", "role", "updated_at" FROM "teams_members";
DROP TABLE "teams_members";
ALTER TABLE "new_teams_members" RENAME TO "teams_members";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
