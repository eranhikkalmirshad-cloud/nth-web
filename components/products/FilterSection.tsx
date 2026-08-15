// components/products/FilterSection.tsx
"use client";

import { X } from "lucide-react";

interface FilterSectionProps {
  types: string[];
  activeType: string;
  onTypeChange: (type: string) => void;
  onClose?: () => void;
}

export default function FilterSection({
  types,
  activeType,
  onTypeChange,
  onClose,
}: FilterSectionProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBEBEA]">
        <h2 className="text-base font-serif font-bold text-[#141414]">
          Filter Collection
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-[#777777] hover:text-[#141414] transition-colors"
            aria-label="Close Filter"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onTypeChange("All")}
            className={`flex items-center justify-between px-4 py-3 rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors ${
              activeType === "All"
                ? "bg-[#141414] text-white"
                : "bg-[#FAFAF9] text-[#555555] border border-[#EAEAEA] hover:border-[#141414] hover:text-[#141414]"
            }`}
          >
            <span>All Pieces</span>
          </button>

          {types.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`flex items-center justify-between px-4 py-3 rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors ${
                activeType === type
                  ? "bg-[#141414] text-white"
                  : "bg-[#FAFAF9] text-[#555555] border border-[#EAEAEA] hover:border-[#141414] hover:text-[#141414]"
              }`}
            >
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer / CTA */}
      {onClose && (
        <div className="px-6 py-4 border-t border-[#EBEBEA] bg-white">
          <button
            onClick={onClose}
            className="btn-primary w-full text-xs"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
