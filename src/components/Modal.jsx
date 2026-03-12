import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    // BACKDROP: Changed to a light, airy slate with low opacity for better visibility
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-slate-900/40 backdrop-blur-sm transition-all">
      {/* Container: Added a soft violet glow to make the 'Signal' pop */}
      <div className="relative p-4 w-full max-w-lg max-h-full drop-shadow-[0_10px_40px_rgba(139,92,246,0.2)]">
        {/* MODAL CONTENT: Removed all 'dark:' classes to force it to be bright */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-violet-100 overflow-hidden">
          {/* Modal header: Light violet-tinted background */}
          <div className="flex items-center justify-between p-6 border-b border-violet-50 bg-violet-50/30">
            <h3 className="text-xl font-extrabold text-violet-900">{title}</h3>

            <button
              type="button"
              className="text-violet-400 hover:bg-violet-100 hover:text-violet-600 rounded-xl p-2 transition-colors"
              onClick={onClose}
            >
              <LuX size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Modal body: Pure white for maximum contrast */}
          <div className="p-8 bg-white text-slate-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
