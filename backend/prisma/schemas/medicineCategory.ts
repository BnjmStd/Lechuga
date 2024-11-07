import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function MedicineCategory() {

    const categorias = await prisma.category.createMany({
        data: [
            {
                name: "Antibióticos",
                description: "Medicamentos usados para tratar infecciones bacterianas.",
                categoryType: "Farmacológico",
                code: "AB001",
            },
            {
                name: "Analgésicos",
                description: "Medicamentos utilizados para aliviar el dolor.",
                categoryType: "Farmacológico",
                code: "AN002",
            },
            {
                name: "Antiinflamatorios",
                description: "Medicamentos que reducen la inflamación.",
                categoryType: "Farmacológico",
                code: "AI003",
            },
            {
                name: "Antidepresivos",
                description: "Medicamentos utilizados para tratar la depresión.",
                categoryType: "Psiquiátrico",
                code: "AD004",
            },
        ],
    });

    // medicamentos
    const medicamentos = await prisma.medicine.createMany({
        data: [
            {
                name: "Amoxicilina",
                dosage: "500 mg cada 8 horas",
                type: "Antibiótico",
                description: "Utilizado para tratar diversas infecciones bacterianas.",
                sideEffects: "Náuseas, erupciones cutáneas.",
                contraindications: "Alergia a la penicilina.",
            },
            {
                name: "Ibuprofeno",
                dosage: "400 mg cada 6 horas",
                type: "Analgésico",
                description: "Usado para aliviar el dolor y reducir la inflamación.",
                sideEffects: "Malestar estomacal, mareos.",
                contraindications: "Úlceras gástricas.",
            },
            {
                name: "Paracetamol",
                dosage: "500 mg cada 8 horas",
                type: "Analgésico",
                description: "Medicamento común para el alivio del dolor.",
                sideEffects: "Pocas reacciones adversas, generalmente seguro.",
                contraindications: "Enfermedades hepáticas severas.",
            },
            {
                name: "Sertralina",
                dosage: "50 mg una vez al día",
                type: "Antidepresivo",
                description: "Usado para tratar trastornos depresivos y de ansiedad.",
                sideEffects: "Náuseas, insomnio.",
                contraindications: "Alergias a inhibidores selectivos de la recaptación de serotonina.",
            },
        ],
    });

    console.log("Medicamentos creados:", medicamentos);
    console.log("Categorías creadas:", categorias);
}