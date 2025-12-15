// components/ui/Pagination.tsx
"use client";

import { motion } from "framer-motion";
import { useProjectStore } from "@/store/useProjectStore";

export function Pagination() {
  const currentPage = useProjectStore((state) => state.currentPage);
  const setCurrentPage = useProjectStore((state) => state.setCurrentPage);
  const totalPages = useProjectStore((state) => state.totalPages());

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to projects section
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous Button */}
      <motion.button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        className={`group relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
          currentPage === 1
            ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
            : "bg-gradient-to-r from-slate-800/90 to-slate-900/90 text-slate-300 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-500/50"
        }`}
      >
        <div className="flex items-center gap-2">
          <motion.i
            className="fas fa-chevron-left text-sm"
            animate={currentPage !== 1 ? { x: [-2, 0, -2] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="hidden sm:inline">Anterior</span>
        </div>
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-slate-500"
              >
                •••
              </div>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <motion.button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              whileHover={{ scale: isActive ? 1 : 1.1, y: -2 }}
              whileTap={{ scale: isActive ? 1 : 0.95 }}
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-bold transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-cyan-400"
              }`}
            >
              {/* Active background gradient */}
              {isActive && (
                <>
                  <motion.div
                    layoutId="active-page"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0,198,255,0.3)",
                        "0 0 30px rgba(0,198,255,0.5)",
                        "0 0 20px rgba(0,198,255,0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </>
              )}

              {/* Inactive background */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all" />
              )}

              {/* Number */}
              <span className="relative z-10">{pageNumber}</span>

              {/* Decorative corner */}
              {!isActive && (
                <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-br-xl rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        className={`group relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
            : "bg-gradient-to-r from-slate-800/90 to-slate-900/90 text-slate-300 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-500/50"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Próximo</span>
          <motion.i
            className="fas fa-chevron-right text-sm"
            animate={currentPage !== totalPages ? { x: [0, 2, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.button>

      {/* Page Info */}
      <div className="hidden md:flex items-center gap-2 ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50">
        <i className="fas fa-layer-group text-cyan-400 text-sm" />
        <span className="text-sm text-slate-400">
          Página <span className="text-cyan-400 font-semibold">{currentPage}</span> de{" "}
          <span className="text-cyan-400 font-semibold">{totalPages}</span>
        </span>
      </div>
    </motion.div>
  );
}
