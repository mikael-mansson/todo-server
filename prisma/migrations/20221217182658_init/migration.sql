-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT NOT NULL
);
