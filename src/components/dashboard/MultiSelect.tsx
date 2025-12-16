"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder = "All",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const displayText =
    selected.length === 0
      ? placeholder
      : selected
          .map((v) => options.find((o) => o.value === v)?.label || v)
          .join(", ");

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2 sm:px-3 py-2 bg-slate-50 border rounded-lg text-xs sm:text-sm text-left flex items-center justify-between transition-colors ${
          isOpen
            ? "border-teal-500 ring-2 ring-teal-500/20"
            : "border-slate-200 hover:border-slate-300"
        } ${selected.length > 0 ? "text-slate-800" : "text-slate-500"}`}
      >
        <span className="truncate">{displayText}</span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-1 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg py-1 max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <label
                key={option.value}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleOption(option.value)}
                  className="w-4 h-4 flex-shrink-0 rounded border-slate-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0"
                />
                <span
                  className={`text-xs sm:text-sm ${
                    isSelected ? "text-slate-800 font-medium" : "text-slate-600"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
          {options.length === 0 && (
            <div className="px-3 py-2 text-xs sm:text-sm text-slate-400">No options</div>
          )}
        </div>
      )}
    </div>
  );
}

// Rating specific multi-select with stars
interface RatingMultiSelectProps {
  selected: number[];
  onChange: (values: number[]) => void;
}

export function RatingMultiSelect({
  selected,
  onChange,
}: RatingMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleRating = (rating: number) => {
    if (selected.includes(rating)) {
      onChange(selected.filter((r) => r !== rating));
    } else {
      onChange([...selected, rating]);
    }
  };

  const displayText =
    selected.length === 0
      ? "All"
      : selected
          .sort((a, b) => b - a)
          .map((r) => `${r}★`)
          .join(", ");

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
        Rating
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2 sm:px-3 py-2 bg-slate-50 border rounded-lg text-xs sm:text-sm text-left flex items-center justify-between transition-colors ${
          isOpen
            ? "border-teal-500 ring-2 ring-teal-500/20"
            : "border-slate-200 hover:border-slate-300"
        } ${selected.length > 0 ? "text-slate-800" : "text-slate-500"}`}
      >
        <span className="truncate">{displayText}</span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-1 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg py-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const isSelected = selected.includes(rating);
            return (
              <label
                key={rating}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleRating(rating)}
                  className="w-4 h-4 flex-shrink-0 rounded border-slate-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0"
                />
                <span
                  className={`text-xs sm:text-sm ${
                    isSelected ? "text-slate-800 font-medium" : "text-slate-600"
                  }`}
                >
                  {rating}★
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
