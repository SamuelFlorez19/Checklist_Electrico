
import React from 'react';
import { ChecklistForm } from '../types';
import { CheckCircle2, XCircle, MapPin, User, Calendar } from 'lucide-react';

interface PDFViewProps {
  data: ChecklistForm;
}

const PDFView: React.FC<PDFViewProps> = ({ data }) => {
  return (
    <div id="pdf-content" className="p-8 bg-white max-w-4xl mx-auto shadow-2xl rounded-xl border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reporte de Inspección Diaria</h1>
          <p className="text-indigo-600 font-semibold mt-1">Checklist Electrico Diario</p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end text-gray-600 mb-1">
            <span className="text-sm mr-2">{data.date}</span>
            <Calendar size={16} />
          </div>
          <div className="flex items-center justify-end text-gray-600">
            <span className="text-sm mr-2">{data.location}</span>
            <MapPin size={16} />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-indigo-50 p-6 rounded-xl mb-8 border border-indigo-100">
        <h2 className="text-lg font-bold text-indigo-900 mb-2 flex items-center">
          <User className="mr-2" size={20} />
          Resumen
        </h2>
        <p className="text-gray-700 italic leading-relaxed">
          "{data.summary || 'Generando resumen'}"
        </p>
        <div className="mt-4 flex gap-4">
          <div className="px-3 py-1 bg-white rounded-full text-xs font-bold text-indigo-700 border border-indigo-200">
            Voluntario: {data.inspectorName}
          </div>
          <div className="px-3 py-1 bg-white rounded-full text-xs font-bold text-indigo-700 border border-indigo-200">
            Progreso: {data.items.filter(i => i.completed).length}/{data.items.length} completado
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.items.map((item) => (
          <div key={item.id} className="p-4 border rounded-xl flex flex-col h-full bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                {item.category}
              </span>
              {item.completed ? (
                <CheckCircle2 size={20} className="text-green-500" />
              ) : (
                <XCircle size={20} className="text-red-400" />
              )}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{item.label}</h3>
            {item.notes && <p className="text-xs text-gray-600 mb-3 flex-grow">{item.notes}</p>}
            
            {item.photo && (
              <div className="mt-auto">
                <img src={item.photo} alt="Evidencia" className="w-full h-32 object-cover rounded-lg border border-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t flex justify-between items-center text-gray-400 text-[10px] uppercase tracking-[0.2em]">
        <span>Checklist Electrico Diario Sabaq</span>
        <span>© 2026 </span>
      </div>
    </div>
  );
};

export default PDFView;
