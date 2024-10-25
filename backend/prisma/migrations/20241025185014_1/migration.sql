-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('PACIENTE', 'MEDICO', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "FormatExam" AS ENUM ('IMAGEN', 'PDF');

-- CreateEnum
CREATE TYPE "TipoEntidad" AS ENUM ('PUBLICO', 'PRIVADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "avatarImg" TEXT,
    "tipoUsuario" "TipoUsuario" NOT NULL,
    "contactId" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "rut" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "telephone" TEXT,
    "address" TEXT,
    "age" INTEGER,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pacienteId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dosis" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT,
    "efectosSecundarios" TEXT,
    "contraindicaciones" TEXT,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipoCategoria" TEXT NOT NULL,
    "codigo" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indication" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Indication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero_orden" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "format" "FormatExam" NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analito" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "unidades" TEXT NOT NULL,
    "rangoNormal" TEXT,

    CONSTRAINT "Analito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultadoExamen" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "examenId" INTEGER NOT NULL,
    "analitoId" INTEGER NOT NULL,

    CONSTRAINT "ResultadoExamen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" SERIAL NOT NULL,
    "especialidad" VARCHAR(100) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "cobertura" DOUBLE PRECISION,
    "costo" DOUBLE PRECISION,
    "updated" TIMESTAMP(3) NOT NULL,
    "tipoPrestacionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prestacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoPrestacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoPrestacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "tipoEntidad" "TipoEntidad" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrestacionEntidad" (
    "entidadId" INTEGER NOT NULL,
    "prestacionId" INTEGER NOT NULL,
    "medicoId" INTEGER,
    "examId" INTEGER,
    "pacienteId" INTEGER,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrestacionEntidad_pkey" PRIMARY KEY ("entidadId","prestacionId")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "departamento" VARCHAR(100) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MedicalHistoryMedicamentos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MedicamentoCategoria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MedicalHistoryIndications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_contactId_key" ON "Usuario"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_rut_key" ON "Contact"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_usuarioId_key" ON "Paciente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_usuarioId_key" ON "Medico"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_usuarioId_key" ON "Administrador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicalHistoryMedicamentos_AB_unique" ON "_MedicalHistoryMedicamentos"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicalHistoryMedicamentos_B_index" ON "_MedicalHistoryMedicamentos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicamentoCategoria_AB_unique" ON "_MedicamentoCategoria"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicamentoCategoria_B_index" ON "_MedicamentoCategoria"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MedicalHistoryIndications_AB_unique" ON "_MedicalHistoryIndications"("A", "B");

-- CreateIndex
CREATE INDEX "_MedicalHistoryIndications_B_index" ON "_MedicalHistoryIndications"("B");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoExamen" ADD CONSTRAINT "ResultadoExamen_examenId_fkey" FOREIGN KEY ("examenId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoExamen" ADD CONSTRAINT "ResultadoExamen_analitoId_fkey" FOREIGN KEY ("analitoId") REFERENCES "Analito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestacion" ADD CONSTRAINT "Prestacion_tipoPrestacionId_fkey" FOREIGN KEY ("tipoPrestacionId") REFERENCES "TipoPrestacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_prestacionId_fkey" FOREIGN KEY ("prestacionId") REFERENCES "Prestacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestacionEntidad" ADD CONSTRAINT "PrestacionEntidad_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalHistoryMedicamentos" ADD CONSTRAINT "_MedicalHistoryMedicamentos_A_fkey" FOREIGN KEY ("A") REFERENCES "MedicalHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalHistoryMedicamentos" ADD CONSTRAINT "_MedicalHistoryMedicamentos_B_fkey" FOREIGN KEY ("B") REFERENCES "Medicamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicamentoCategoria" ADD CONSTRAINT "_MedicamentoCategoria_A_fkey" FOREIGN KEY ("A") REFERENCES "Categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicamentoCategoria" ADD CONSTRAINT "_MedicamentoCategoria_B_fkey" FOREIGN KEY ("B") REFERENCES "Medicamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalHistoryIndications" ADD CONSTRAINT "_MedicalHistoryIndications_A_fkey" FOREIGN KEY ("A") REFERENCES "Indication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MedicalHistoryIndications" ADD CONSTRAINT "_MedicalHistoryIndications_B_fkey" FOREIGN KEY ("B") REFERENCES "MedicalHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
