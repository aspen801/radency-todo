import React from "react";
import { X } from "lucide-react";
import IconButton from "../icon-button/icon-button";

const Modal: React.FC<any> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="flex flex-col gap-3 relative bg-white outline-slate-400 px-9 py-6 rounded-lg">
        {children}
        <IconButton
          onClick={onClose}
          className="absolute right-1 top-1"
          icon={<X />}
        />
      </div>
    </div>
  );
};

export default Modal;
