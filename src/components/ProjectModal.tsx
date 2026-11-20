import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { ClientProject } from '../data/portfolioData';

interface ProjectModalProps {
  project: ClientProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d0d]/88 backdrop-blur-md p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#141414] border border-[#b7ab98]/15 text-[#b7ab98] overflow-hidden max-h-[90vh] flex flex-col will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#b7ab98]/12">
              <div className="flex items-center gap-3 text-xs text-[#b7ab98]/65">
                <span className="font-mono-tabular">{project.year}</span>
                <span aria-hidden="true">·</span>
                <span>{project.role}</span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span className="hidden sm:inline">{project.scope}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex items-center justify-center w-10 h-10 text-[#b7ab98] hover:text-[#0d0d0d] hover:bg-[#eb5939] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-8">
              <div className="aspect-[16/9] w-full bg-[#0d0d0d] border border-[#b7ab98]/10 overflow-hidden relative">
                {!imgError ? (
                  <motion.img
                    initial={{ scale: 1.04, opacity: 0.85 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    src={project.image}
                    alt={`${project.name} design case preview`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#191716] to-[#0d0d0d] p-8 text-center">
                    <span className="font-display text-3xl font-bold text-[#eb5939] mb-2">
                      {project.name}
                    </span>
                    <span className="text-xs text-[#b7ab98]/60">{project.scope}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 space-y-3">
                  <h2
                    id="project-modal-title"
                    className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#b7ab98]"
                  >
                    {project.name}
                  </h2>
                  <p className="text-sm text-[#eb5939] leading-relaxed">{project.honestLine}</p>
                </div>

                <div className="md:col-span-7 space-y-6">
                  <p className="text-base text-[#b7ab98]/85 leading-relaxed">
                    {project.caseOverview}
                  </p>

                  <div className="border-t border-[#b7ab98]/12 pt-5 space-y-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b7ab98]/55">
                      Key Contributions
                    </h3>
                    <ul className="space-y-2">
                      {project.outcomes.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-[#b7ab98]/80 flex items-start gap-3 leading-relaxed"
                        >
                          <span className="font-mono-tabular text-xs text-[#eb5939] pt-0.5">
                            0{idx + 1}.
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="px-6 py-4 border-t border-[#b7ab98]/12 flex items-center justify-between bg-[#0d0d0d]">
              <span className="text-xs text-[#b7ab98]/55">Selected Client Archive</span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-semibold uppercase tracking-[0.12em] bg-[#eb5939] text-[#0d0d0d] hover:bg-[#f06b4d] transition-colors duration-200"
              >
                <span>Back to Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
