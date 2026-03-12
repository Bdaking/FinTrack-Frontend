// EmojiPickerPopup.js
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div
        className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-14 h-14 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg border-2 border-purple-200">
          {icon ? (
            <img src={icon} alt="Icon" className="w-8 h-8 object-contain" />
          ) : (
            <LuImage size={24} className="text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">
            {icon ? "Change icon" : "Pick icon"}
          </p>
          <p className="text-xs text-gray-500">Emoji tur thlang roh le..</p>
        </div>
      </div>

      {isOpen && (
        <div className="relative w-full">
          {/* Backdrop to handle clicks outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Emoji Picker Dropdown */}
          <div className="absolute z-50 mt-2 left-0 bg-white rounded-lg shadow-2xl border">
            <button
              className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer shadow-sm hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <LuX size={14} />
            </button>
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              height={450}
              width={320}
              skinTonesDisabled
              searchPlaceholder="Search emojis..."
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
