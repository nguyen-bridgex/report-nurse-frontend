import React from 'react';
import { RichTextEditor } from './RichTextEditor';

interface SessionRecordSectionProps {
  sessionNumber: number;
  nsValue: string;
  ptValue: string;
  onNsChange: (value: string) => void;
  onPtChange: (value: string) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

export const SessionRecordSection: React.FC<SessionRecordSectionProps> = ({
  sessionNumber,
  nsValue,
  ptValue,
  onNsChange,
  onPtChange,
  onRemove,
  showRemoveButton = false,
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 relative">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-md text-gray-800 dark:text-gray-200">
          第{sessionNumber}回
        </h4>
        {showRemoveButton && onRemove && (
          <button
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                       transition-colors text-sm font-medium"
            title="削除"
          >
            削除
          </button>
        )}
      </div>
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

