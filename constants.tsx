
import { ChecklistItem } from './types';

export const INITIAL_ITEMS: ChecklistItem[] = [
  // SECCIÓN: EN EL GENERADOR
  { id: 'gen_1', label: '¿El generador está encendido?', category: 'Generador', completed: false, notes: '' },
  { id: 'gen_2', label: '¿Está en modo manual o automático?', category: 'Generador', completed: false, notes: '' },
  { id: 'gen_3', label: '¿Cuál es el nivel de combustible?', category: 'Generador', completed: false, notes: '' },
  { id: 'gen_4', label: '¿Observa alguna fuga o mancha (aceite, líquido)?', category: 'Generador', completed: false, notes: '' },
  { id: 'gen_5', label: '¿Detecta algún olor inusual?', category: 'Generador', completed: false, notes: '' },
  
  // SECCIÓN: EN EL TABLERO DE TRANSFERENCIA
  { id: 'tab_1', label: '¿Transferencia en modo manual o automático?', category: 'Tablero de Transferencia', completed: false, notes: '' },
  { id: 'tab_2', label: '¿Cuál es el promedio de voltaje?', category: 'Tablero de Transferencia', completed: false, notes: '' },
  { id: 'tab_3', label: '¿Hay alertas en la pantalla del tablero?', category: 'Tablero de Transferencia', completed: false, notes: '' },
  { id: 'tab_4', label: '¿Las luces piloto funcionan correctamente?', category: 'Tablero de Transferencia', completed: false, notes: '' },
  
  // SECCIÓN: CUARTO DE COMBUSTIBLE
  { id: 'fuel_1', label: '¿Hay suficiente combustible de reserva?', category: 'Cuarto de Combustible', completed: false, notes: '' },
];

export const CATEGORIES = [
  'Generador', 
  'Tablero de Transferencia', 
  'Cuarto de Combustible', 
  'Mantenimiento'
];
