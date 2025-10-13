import React from 'react';

interface WeeklyRecordSectionProps {
  weekNumber: number;
  nsValue: string;
  ptValue: string;
  onNsChange: (value: string) => void;
  onPtChange: (value: string) => void;
}

export const WeeklyRecordSection: React.FC<WeeklyRecordSectionProps> = ({
  weekNumber,
  nsValue,
  ptValue,
  onNsChange,
  onPtChange,
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
      <h4 className="font-semibold text-md text-gray-800 dark:text-gray-200 mb-3">
        第{weekNumber}週
      </h4>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Nsが行った訪問看護記録
          </label>
          <textarea
            value={nsValue}
            onChange={(e) => onNsChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       dark:bg-gray-900 dark:text-white
                       transition-all duration-200 resize-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            PT・OT・STが行った訪問看護記録
          </label>
          <textarea
            value={ptValue}
            onChange={(e) => onPtChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       dark:bg-gray-900 dark:text-white
                       transition-all duration-200 resize-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};

