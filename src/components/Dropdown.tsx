import React, { useEffect, useRef, useState } from 'react';

interface CustomDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export const Dropdown: React.FC<CustomDropdownProps> = ({ options, selectedOption, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [position,] = useState<'bottom' | 'top'>('top');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
	};
	
useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-blue-500 hover:border-blue-700 min-h-10 rounded bg-blue-500 text-white cursor-pointer flex justify-center items-center px-3 py-1.5 outline-none gap-2"
      >
        {selectedOption ?? "Select"}
				<svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ml-2 inline-block transition-transform transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 10l5 5 5-5"
          />
        </svg>
      </div>
			{isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${
            position === 'bottom' ? '-top-[210%]' : 'bottom-[110%]'
          } left-0 mt-1 w-full  rounded shadow-lg`}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`flex gap-2 capitalize items-center px-4 py-2 cursor-pointer bg-gray-500 hover:bg-gray-700 text-white border-b-2 last:border-0 first:rounded-t-lg last:rounded-b-lg ${selectedOption === option ? "bg-blue-700" : ""}`}
            >
              {selectedOption === option && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              )}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};