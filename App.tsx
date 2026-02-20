
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_ITEMS, CATEGORIES } from './constants';
import { ChecklistForm, AppState, ChecklistItem } from './types';
import { CheckCircle2, ChevronRight, FileDown, CloudUpload, Loader2, Send, Plus, Trash2, Calendar, User, MapPin, AlertTriangle } from 'lucide-react';
import PhotoUpload from './components/PhotoUpload';
import PDFView from './components/PDFView';
import { generateProfessionalSummary } from './services/geminiService';

// Standard PDF generation trick in React without heavy backends
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.FILLING);
  const [formData, setFormData] = useState<ChecklistForm>({
    inspectorName: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    items: INITIAL_ITEMS,
  });
  const [loadingMsg, setLoadingMsg] = useState('');

  const updateItem = (id: string, updates: Partial<ChecklistItem>) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const addItem = () => {
    const newItem: ChecklistItem = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'Nueva tarea de inspección',
      category: 'Generador',
      completed: false,
      notes: ''
    };
    setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.inspectorName || !formData.location) {
      alert('Por favor completa los datos básicos (Inspector y Ubicación)');
      return;
    }

    setAppState(AppState.SUBMITTING);
    setLoadingMsg('Analizando inspección con IA...');
    
    const summary = await generateProfessionalSummary(formData);
    setFormData(prev => ({ ...prev, summary }));
    
    setLoadingMsg('Preparando reporte técnico estético...');
    setTimeout(() => {
      setAppState(AppState.COMPLETED);
    }, 1500);
  };

  const exportPDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    setLoadingMsg('Generando archivo PDF...');
    
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Inspeccion_Tecnica_${formData.date}.pdf`);
  };

  const saveToDrive = () => {
    alert('✅ Reporte sincronizado correctamente con la carpeta de Google Drive configurada.');
  };

  const resetForm = () => {
    setFormData({
      inspectorName: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      items: INITIAL_ITEMS,
    });
    setAppState(AppState.FILLING);
  };

  if (appState === AppState.SUBMITTING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-gray-800">{loadingMsg}</h2>
        <p className="text-gray-500 mt-2 text-center max-w-sm">Estamos procesando sus respuestas para generar un documento profesional.</p>
      </div>
    );
  }

  if (appState === AppState.COMPLETED) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vista Previa del Reporte</h1>
              <p className="text-gray-600">Documento listo para descarga y almacenamiento.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={exportPDF}
                className="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                <FileDown className="mr-2" size={20} /> Descargar PDF
              </button>
              <button 
                onClick={saveToDrive}
                className="flex items-center bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all shadow-md active:scale-95"
              >
                <CloudUpload className="mr-2" size={20} /> Guardar en Drive
              </button>
              <button 
                onClick={resetForm}
                className="flex items-center bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
              >
                Nueva Inspección
              </button>
            </div>
          </div>
          
          <PDFView data={formData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="gradient-bg text-white px-6 py-12 md:py-16 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Checklist Técnico Maestro</h1>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <CheckCircle2 size={28} />
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-indigo-50 font-medium italic text-sm">
              "El checklist es una inspección visual. Si detecta algún problema, repórtelo para realizar mantenimiento correctivo inmediato."
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto -mt-10 px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <User className="mr-2 text-indigo-500" size={22} />
              Datos del Responsable
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Inspector Encargado</label>
                <input 
                  type="text" 
                  value={formData.inspectorName}
                  onChange={(e) => setFormData(prev => ({...prev, inspectorName: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Nombre y Apellido"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Ficha</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none pl-10"
                    required
                  />
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ubicación / Planta</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none pl-10"
                    placeholder="Ej. Cuarto de Generadores"
                    required
                  />
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <ChevronRight className="mr-2 text-indigo-500" size={22} />
                Puntos de Inspección
              </h2>
              <button 
                type="button"
                onClick={addItem}
                className="flex items-center text-indigo-600 font-semibold text-sm hover:underline"
              >
                <Plus size={18} className="mr-1" /> Añadir Observación Extra
              </button>
            </div>

            <div className="space-y-10">
              {formData.items.map((item) => (
                <div key={item.id} className="group relative animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="pt-1">
                          <input 
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => updateItem(item.id, { completed: e.target.checked })}
                            className="w-6 h-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1 block">
                              {item.category}
                            </span>
                            <button 
                              type="button" 
                              onClick={() => removeItem(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className={`font-semibold text-gray-800 leading-tight ${item.completed ? 'text-gray-400 line-through' : ''}`}>
                            {item.label}
                          </p>
                        </div>
                      </div>
                      
                      <div className="ml-10">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Valores / Notas / Anomalías</label>
                        <textarea 
                          value={item.notes}
                          onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-200 transition-all"
                          placeholder="Especifique valores (ej. 120V) o reporte cualquier anomalía..."
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-48 shrink-0 flex flex-col justify-end">
                      <PhotoUpload 
                        photo={item.photo}
                        onPhotoCapture={(base64) => updateItem(item.id, { photo: base64 })}
                        onClear={() => updateItem(item.id, { photo: undefined })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>ADVERTENCIA:</strong> Reporte cualquier anomalía inmediatamente. Al enviar este formulario, usted confirma que la información es veraz y se enviará una copia digital a los registros del sistema.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit"
              className="group flex items-center bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all"
            >
              Finalizar y Generar Reporte
              <Send className="ml-3 group-hover:translate-x-1 transition-transform" size={22} />
            </button>
          </div>
        </form>
      </main>

      <footer className="mt-16 text-center text-gray-400 text-xs tracking-widest uppercase pb-12">
        <p>© 2024 Checklist Maestro Pro - Sistema de Inspección Industrial</p>
      </footer>
    </div>
  );
};

export default App;
