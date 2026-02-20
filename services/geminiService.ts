
import { GoogleGenAI, Type } from "@google/genai";
import { ChecklistForm } from "../types";

export const generateProfessionalSummary = async (formData: ChecklistForm): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const completedCount = formData.items.filter(i => i.completed).length;
  const totalCount = formData.items.length;
  
  const prompt = `
    Como un experto supervisor industrial, genera un resumen profesional para un reporte diario.
    Inspector: ${formData.inspectorName}
    Fecha: ${formData.date}
    Ubicación: ${formData.location}
    Progreso: ${completedCount}/${totalCount} tareas completadas.
    
    Tareas y Notas:
    ${formData.items.map(i => `- ${i.label}: ${i.completed ? 'Completado' : 'Pendiente'}. Notas: ${i.notes}`).join('\n')}
    
    Genera un párrafo corto (máximo 4 líneas) que sea motivador, profesional y analítico sobre el estado de la operación.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text || "Reporte generado satisfactoriamente.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Reporte completado sin incidencias mayores registradas.";
  }
};
