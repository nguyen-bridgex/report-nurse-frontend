'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// List item with minimal data
export interface GeneratedSummaryListItem {
  id: string;
  source_nursing_report_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

// Full detail data
export interface GeneratedSummaryData {
  id: string;
  source_nursing_report_id: string;
  title: string;
  illness_course: string;
  nursing_service: string;
  home_care_situation: string;
  mental_style: string;
  special_notes: string;
  contents: string;
  feedback: string;
  created_at?: string;
  updated_at?: string;
}

export interface GeneratedSummaryResponse {
  items: GeneratedSummaryListItem[];
}

interface GeneratedSummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = 'https://c3jh0qba9f.execute-api.ap-northeast-1.amazonaws.com/prod/ai-nursing-reports';

export const GeneratedSummaryDialog: React.FC<GeneratedSummaryDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [summaries, setSummaries] = useState<GeneratedSummaryListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<GeneratedSummaryData | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSummaries();
    }
  }, [isOpen]);

  const fetchSummaries = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<GeneratedSummaryResponse>(API_URL);
      setSummaries(response.data.items);
    } catch (err) {
      console.error('Failed to fetch summaries:', err);
      setError('生成済みレポートの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (summary: GeneratedSummaryListItem) => {
    setLoadingDetails(true);
    setDetailsError(null);
    
    try {
      const response = await axios.get<GeneratedSummaryData>(`${API_URL}/${summary.id}`);
      setSelectedSummary(response.data);
    } catch (err) {
      console.error('Failed to fetch summary details:', err);
      setDetailsError('レポートの詳細取得に失敗しました。');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedSummary(null);
    setDetailsError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              生成済みAI報告書一覧
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">データを読み込んでいます...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
              <button
                onClick={fetchSummaries}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                           transition-all duration-200 shadow-md hover:shadow-lg"
              >
                再試行
              </button>
            </div>
          ) : summaries.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              生成済みレポートが見つかりませんでした
            </div>
          ) : (
            <div className="space-y-4">
              {summaries.map((summary) => (
                <div
                  key={summary.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {/* Title */}
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">
                    {summary.title}
                  </h3>

                  {/* Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3 text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">作成日: </span>
                      <span>{new Date(summary.created_at).toLocaleString('ja-JP')}</span>
                    </div>
                    <div>
                      <span className="font-medium">更新日: </span>
                      <span>{new Date(summary.updated_at).toLocaleString('ja-JP')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(summary)}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg
                               transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    詳細を見る
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {loading ? '読み込み中...' : `${summaries.length}件のレポート`}
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg
                         transition-all duration-200 shadow-md hover:shadow-lg"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>

      {/* Detail View Modal */}
      {(selectedSummary || loadingDetails) && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Detail Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {loadingDetails ? '読み込み中...' : selectedSummary?.title}
                </h3>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Detail Content */}
            <div className="flex-1 overflow-auto p-6">
              {loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">詳細を読み込んでいます...</p>
                </div>
              ) : detailsError ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-red-600 dark:text-red-400 text-center mb-4">{detailsError}</p>
                  <button
                    onClick={handleCloseDetails}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                               transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    閉じる
                  </button>
                </div>
              ) : selectedSummary ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">病状の経過</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-3 rounded">
                      {selectedSummary.illness_course}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">看護（リハビリテーション）の内容</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-3 rounded">
                      {selectedSummary.nursing_service}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">家庭での介護の状況（精神様式：家族等との関係）</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-3 rounded">
                      {selectedSummary.home_care_situation}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">特記すべき事項</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-3 rounded">
                      {selectedSummary.special_notes}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">PT・OT・STが行った訪問看護、家族等への指導、リスク管理等の内容</h4>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-3 rounded">
                      {selectedSummary.contents}
                    </p>
                  </div>

                  {selectedSummary.feedback && (
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">フィードバック</h4>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                        {selectedSummary.feedback}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Detail Footer */}
            {!loadingDetails && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <button
                  onClick={handleCloseDetails}
                  className="w-full px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg
                             transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  閉じる
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


