
import React, { useState } from 'react';
import FormSelect from './FormSelect';
import ResultsView from './ResultsView';
import { ... } from './geminiService';
import { UserProfile, RecommendationResponse } from './types';
import { Bike, Loader2, Mountain, Compass, ChevronRight, Activity, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'results'>('form');
  const [profile, setProfile] = useState<UserProfile>({
    height: 175,
    weight: 80,
    level: 'iniciante',
    terrain: 'lazer_urbano',
    frequency: 'fds',
    budget: '3000_5000',
  });
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === 'height' || name === 'weight' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setError(null);
    try {
      const data = await getBikeRecommendation(profile);
      setRecommendation(data);
      setStep('results');
    } catch (err: any) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Erro ao consultar especialista. Tente novamente.");
      setStep('form');
    }
  };

  const reset = () => {
    setStep('form');
    setRecommendation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <header className="relative z-50 py-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={reset}
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg shadow-yellow-400/20 group-hover:rotate-12 transition-transform duration-300">
               <Bike className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-display font-black tracking-tighter uppercase leading-none">
              BIKE<span className="text-yellow-400">LAB</span><br/>
              <span className="text-[9px] tracking-[0.3em] text-slate-400 font-bold">BRASIL AI</span>
            </h1>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase font-bold tracking-widest text-slate-400">
             <a href="#" className="hover:text-yellow-400 transition-colors">Especialistas</a>
             <a href="#" className="hover:text-yellow-400 transition-colors">Geometria</a>
             <a href="#" className="hover:text-yellow-400 transition-colors">Marcas</a>
             <button onClick={reset} className="px-5 py-2.5 rounded-full border border-white/10 hover:border-yellow-400 text-white transition-all">Começar</button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-400"
                >
                  <Activity size={12} className="animate-pulse" />
                  Performance Inteligente
                </motion.div>
                
                <motion.h2 
                  className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  ENCONTRE A SUA <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500">
                    MÁQUINA IDEAL.
                  </span>
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-slate-400 leading-relaxed max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Algoritmo especialista focado no mercado nacional. Analisamos altura, 
                  disciplina e orçamento para recomendar o melhor custo-benefício.
                </motion.p>
                
                <motion.div 
                  className="grid grid-cols-2 gap-6 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-yellow-400"><Zap size={20}/></div>
                    <h3 className="text-xs font-bold uppercase tracking-widest">Geometria</h3>
                    <p className="text-[10px] text-slate-500">Cálculo de fit baseado no cockpit e alcance.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-green-400"><Compass size={20}/></div>
                    <h3 className="text-xs font-bold uppercase tracking-widest">Mercado</h3>
                    <p className="text-[10px] text-slate-500">Modelos atualizados das principais marcas BR.</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="glass rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-yellow-400/10 blur-[40px] rounded-full" />
                
                <h3 className="text-xl font-display font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Shield className="text-yellow-400" size={24} />
                  Perfil do Ciclista
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Altura (cm)</label>
                      <input 
                        type="number" 
                        name="height" 
                        value={profile.height} 
                        onChange={handleInputChange} 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Peso (kg)</label>
                      <input 
                        type="number" 
                        name="weight" 
                        value={profile.weight || ''} 
                        onChange={handleInputChange} 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold focus:ring-2 focus:ring-yellow-400 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect label="Nível" name="level" value={profile.level} onChange={handleInputChange} options={[{ value: 'iniciante', label: 'Iniciante' }, { value: 'intermediario', label: 'Interm.' }, { value: 'avancado', label: 'Pro' }]} />
                    <FormSelect label="Frequência" name="frequency" value={profile.frequency} onChange={handleInputChange} options={[{ value: 'fds', label: 'Fim de Semana' }, { value: '3x_semana', label: '2-3x Semana' }, { value: 'diario', label: 'Diário' }]} />
                  </div>

                  <FormSelect label="Terreno Principal" name="terrain" value={profile.terrain} onChange={handleInputChange} options={[{ value: 'lazer_urbano', label: 'Lazer Urbano' }, { value: 'mobilidade', label: 'Trabalho/Mobilidade' }, { value: 'mtb_recreativo', label: 'MTB Trilhas Leves' }, { value: 'mtb_intermediario', label: 'MTB Médio' }, { value: 'mtb_pesado', label: 'MTB Pesado' }, { value: 'estrada', label: 'Estrada (Speed)' }, { value: 'gravel', label: 'Gravel (Misto)' }]} />
                  <FormSelect label="Investimento Máximo" name="budget" value={profile.budget} onChange={handleInputChange} options={[{ value: 'ate_1500', label: 'Até R$ 1.500' }, { value: 'ate_3000', label: 'R$ 1.500 - 3.000' }, { value: '3000_5000', label: 'R$ 3.000 - 5.000' }, { value: '5000_10000', label: 'R$ 5.000 - 10.000' }, { value: 'acima_10000', label: 'Elite (+10k)' }]} />

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full py-5 rounded-2xl font-display font-black uppercase tracking-[0.2em] text-black bg-yellow-400 shadow-[0_10px_40px_-10px_rgba(250,204,21,0.3)] hover:bg-yellow-300 transition-all flex items-center justify-center gap-3"
                  >
                    Gerar Diagnóstico
                    <ChevronRight size={18} />
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-4 border-yellow-400/20 border-t-yellow-400"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bike className="text-yellow-400 w-8 h-8" />
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 space-y-3"
              >
                <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic">Processando Telemetria</h3>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest max-w-xs mx-auto">
                  Cruzando dados de geometria, mercado e disponibilidade em tempo real...
                </p>
              </motion.div>
            </motion.div>
          )}

          {step === 'results' && recommendation && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ResultsView data={recommendation} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-red-950 border border-red-500/30 text-red-200 p-4 rounded-2xl shadow-2xl z-[100] flex items-start gap-4">
          <div className="flex-grow space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-red-400">Erro de Processamento</p>
            <p className="text-xs font-bold leading-relaxed">{error}</p>
          </div>
          <button 
            onClick={() => setError(null)} 
            className="text-red-400 hover:text-white text-[10px] font-black uppercase px-2 py-1 rounded bg-red-950 border border-red-500/20 active:scale-95 transition-all"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

