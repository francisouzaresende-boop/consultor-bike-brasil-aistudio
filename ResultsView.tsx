
import React from 'react';
import { RecommendationResponse, RecommendationOption } from '../types';
import { Bike, Wrench, ArrowUpCircle, Package, Star, Info, CheckCircle2, ChevronLeft, Zap, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultsViewProps {
  data: RecommendationResponse;
  onReset: () => void;
}

const OptionCard: React.FC<{ option: RecommendationOption; delay: number }> = ({ option, delay }) => {
  const isRecommended = option.category === 'CustoBeneficio' || option.category === 'Ideal';
  const highlights = option.highlights || [];
  
  const getCategoryColor = () => {
    switch (option.category) {
      case 'Economica': case 'Entrada': return 'from-emerald-500 to-teal-700';
      case 'CustoBeneficio': case 'Ideal': return 'from-yellow-400 to-orange-600';
      case 'Avancada': case 'Pro': return 'from-purple-500 to-pink-700';
      default: return 'from-slate-500 to-slate-700';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`group relative flex flex-col h-full glass rounded-[2rem] overflow-hidden transition-all duration-500 ${isRecommended ? 'ring-2 ring-yellow-400/50 hover:scale-[1.02] shadow-2xl shadow-yellow-400/10' : 'hover:border-white/20'}`}
    >
      <div className={`h-2 shadow-sm bg-gradient-to-r ${getCategoryColor()}`} />
      
      <div className="p-6 md:p-8 flex flex-col flex-grow space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{option.brand}</span>
            <h3 className="text-2xl font-display font-black text-white leading-none group-hover:text-yellow-400 transition-colors">{option.model}</h3>
          </div>
          <div className={`p-2 rounded-xl bg-gradient-to-br ${getCategoryColor()} text-black ring-4 ring-black/20`}>
            {option.category === 'Economica' || option.category === 'Entrada' ? <Zap size={18} /> : ''}
            {option.category === 'CustoBeneficio' || option.category === 'Ideal' ? <Star size={18} /> : ''}
            {option.category === 'Avancada' || option.category === 'Pro' ? <Activity size={18} /> : ''}
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center gap-2">
             <span className="text-2xl font-display font-black text-white">{option.priceRange}</span>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">(estimado)</span>
           </div>
           <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-medium italic">
             "{option.description}"
           </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-white/5">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Destaques Técnicos</span>
          <div className="grid grid-cols-1 gap-2">
            {highlights.slice(0, 4).map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] text-slate-200 font-bold">
                <CheckCircle2 size={12} className="text-yellow-400" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {isRecommended && (
        <div className="absolute top-4 right-4 rotate-12 -z-10 opacity-10">
          <Star size={120} className="fill-yellow-400" />
        </div>
      )}
    </motion.div>
  );
};

export const ResultsView: React.FC<ResultsViewProps> = ({ data, onReset }) => {
  return (
    <div className="space-y-12 pb-24">
      {/* Header Summary */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">
              DIAGNÓSTICO<br/>FINAL <span className="text-yellow-400">LAB</span>
            </h2>
            <p className="text-lg text-slate-100 font-bold tracking-tight">
              {data.summary}
            </p>
            <p className="text-slate-400 text-xs italic leading-relaxed font-medium">
              Analista AI: "{data.profileAnalysis}"
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset} 
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-yellow-400/50 hover:bg-yellow-400/5 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <ChevronLeft size={14} />
            Refazer Análise
          </motion.button>
        </div>
      </motion.div>

      {/* Technical Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 glass rounded-[2rem] p-6 md:p-8 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-400"><Bike size={20} /></div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Setup Ideal</h4>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tamanho Recomendado</span>
                <p className="text-5xl font-display font-black text-yellow-400 leading-none">{data.idealSpecs?.frameSize || 'M'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Transmissão</span>
                  <p className="text-[11px] font-black text-white">{data.idealSpecs?.transmission || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Freios</span>
                  <p className="text-[11px] font-black text-white">{data.idealSpecs?.brakes || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "Upgrades", items: data.upgrades, icon: ArrowUpCircle, color: "text-blue-400" },
            { title: "Kit Essencial", items: data.accessories, icon: Package, color: "text-green-400" },
            { title: "Manutenção", items: data.maintenanceTips, icon: Wrench, color: "text-yellow-400" }
          ].map((sec, idx) => (
            <div key={idx} className="glass rounded-[1.5rem] p-6 space-y-4">
              <div className="flex items-center gap-2">
                <sec.icon className={sec.color} size={16} />
                <h4 className="text-[9px] font-black uppercase tracking-widest">{sec.title}</h4>
              </div>
              <ul className="space-y-2">
                {sec.items?.slice(0, 5).map((item, i) => (
                  <li key={i} className="text-[10px] text-slate-400 font-medium flex items-start gap-2 leading-snug">
                    <div className={`mt-1 w-1 h-1 rounded-full shrink-0 ${sec.color.replace('text', 'bg')}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400 flex items-center gap-3">
             <div className="w-12 h-[1px] bg-yellow-400" />
             RECOMENDAÇÕES DE MERCADO
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.options?.map((opt, idx) => (
            <OptionCard key={idx} option={opt} delay={0.4 + (idx * 0.1)} />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-col items-center gap-4 pt-8"
      >
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">
           <Info size={12} />
           Preços baseados na média do mercado online do Brasil.
        </div>
      </motion.div>
    </div>
  );
};
