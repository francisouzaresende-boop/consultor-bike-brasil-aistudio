
import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, options }) => {
  return (
    <div className="space-y-2">
      <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full appearance-none rounded-2xl border-white/10 bg-white/5 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 py-4 px-5 pr-12 border transition-all font-bold text-sm cursor-pointer hover:bg-white/10 outline-none"
          required
        >
          <option value="" disabled className="bg-slate-900">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white font-bold">{opt.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 group-focus-within:text-yellow-400 transition-colors">
          <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
