/*
  Warnings:

  - You are about to drop the column `categoria` on the `Investimento` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Investimento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Investimento" DROP COLUMN "categoria",
DROP COLUMN "nome",
ADD COLUMN     "categoriaId" INTEGER;

-- CreateTable
CREATE TABLE "public"."LogPontos" (
    "id" SERIAL NOT NULL,
    "operacao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "extratoId" INTEGER,

    CONSTRAINT "LogPontos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TotalPontos" (
    "id" SERIAL NOT NULL,
    "ponto" INTEGER NOT NULL,
    "logPontoId" INTEGER NOT NULL,

    CONSTRAINT "TotalPontos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CategoriaInvest" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "CategoriaInvest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patrocinadora" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nomeFant" TEXT NOT NULL,

    CONSTRAINT "Patrocinadora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cupom" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "observacao" TEXT,
    "valorDesc" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "patrocinadoraId" INTEGER NOT NULL,

    CONSTRAINT "Cupom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LogPontos_extratoId_key" ON "public"."LogPontos"("extratoId");

-- AddForeignKey
ALTER TABLE "public"."LogPontos" ADD CONSTRAINT "LogPontos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LogPontos" ADD CONSTRAINT "LogPontos_extratoId_fkey" FOREIGN KEY ("extratoId") REFERENCES "public"."Extrato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TotalPontos" ADD CONSTRAINT "TotalPontos_logPontoId_fkey" FOREIGN KEY ("logPontoId") REFERENCES "public"."LogPontos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Investimento" ADD CONSTRAINT "Investimento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."CategoriaInvest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cupom" ADD CONSTRAINT "Cupom_patrocinadoraId_fkey" FOREIGN KEY ("patrocinadoraId") REFERENCES "public"."Patrocinadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
