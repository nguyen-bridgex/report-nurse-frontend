import React from 'react';
import { RichTextEditor } from './RichTextEditor';

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
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Nsが行った訪問看護記録
          </label>
          <RichTextEditor
            content={nsValue}
            onChange={onNsChange}
            placeholder="Nsが行った訪問看護記録を入力してください"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            PT・OT・STが行った訪問看護記録
          </label>
          <RichTextEditor
            content={ptValue}
            onChange={onPtChange}
            placeholder="PT・OT・STが行った訪問看護記録を入力してください"
          />
        </div>
      </div>
    </div>
  );
};
