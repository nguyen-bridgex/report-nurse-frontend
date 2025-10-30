'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface RecordData {
  id: string;
  sampleDataName: string;
  diseaseProgress: string;
  nursingContent: string;
  homeCareStatus: string;
  familyRelations: string;
  specialNotes: string;
  ptOtStContent: string;
  weeklyRecords: {
    week1Ns: string;
    week1Pt: string;
    week2Ns: string;
    week2Pt: string;
    week3Ns: string;
    week3Pt: string;
    week4Ns: string;
    week4Pt: string;
  };
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (record: RecordData) => void;
  searchQuery: string;
}

// API Response Types
interface ApiWeeklyReport {
  id: string;
  title: string;
  content: string;
  type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface ApiWeeklyReports {
  week_number: number;
  reports: ApiWeeklyReport[];
}

interface ApiRecord {
  id: string;
  title: string;
  illness_course: string;
  nursing_service: string;
  home_care_situation: string;
  mental_style: string;
  special_notes: string;
  contents: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  weekly_reports: ApiWeeklyReports[];
}

interface ApiResponse {
  items: ApiRecord[];
}

const API_URL = 'https://c3jh0qba9f.execute-api.ap-northeast-1.amazonaws.com/prod/nursing-reports';

// Map API response to RecordData format
const mapApiRecordToRecordData = (apiRecord: ApiRecord): RecordData => {
  // Initialize weekly records with empty strings
  const weeklyRecords = {
    week1Ns: '',
    week1Pt: '',
    week2Ns: '',
    week2Pt: '',
    week3Ns: '',
    week3Pt: '',
    week4Ns: '',
    week4Pt: '',
  };

  // Map weekly reports from API
  apiRecord.weekly_reports.forEach((weekData) => {
    const weekNum = weekData.week_number;
    if (weekNum >= 1 && weekNum <= 4) {
      weekData.reports.forEach((report) => {
        const weekKey = `week${weekNum}` as 'week1' | 'week2' | 'week3' | 'week4';
        if (report.type === 'NS') {
          weeklyRecords[`${weekKey}Ns` as keyof typeof weeklyRecords] = report.content;
        } else if (report.type === 'PT・OT・ST') {
          weeklyRecords[`${weekKey}Pt` as keyof typeof weeklyRecords] = report.content;
        }
      });
    }
  });

  return {
    id: apiRecord.id,
    sampleDataName: apiRecord.title,
    diseaseProgress: apiRecord.illness_course,
    nursingContent: apiRecord.nursing_service,
    homeCareStatus: apiRecord.home_care_situation,
    familyRelations: apiRecord.mental_style,
    specialNotes: apiRecord.special_notes,
    ptOtStContent: apiRecord.contents,
    weeklyRecords,
  };
};

export const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data when dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchRecords();
      setSearchInput('');
      setCurrentPage(1);
    }
  }, [isOpen]);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<ApiResponse>(API_URL);
      const mappedRecords = response.data.items.map(mapApiRecordToRecordData);
      setRecords(mappedRecords);
    } catch (err) {
      console.error('Failed to fetch records:', err);
      setError('データの取得に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Filter records based on search input
  const filteredRecords = searchInput
    ? records.filter((record) =>
        record.sampleDataName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : records;

  // Pagination calculations
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if(!text) return '';
    // Remove HTML tags for preview
    const plainText = text.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              検索結果
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="サンプルデータ名で検索..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         dark:bg-gray-700 dark:text-white
                         transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">データを読み込んでいます...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-red-600 dark:text-red-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
              <button
                onClick={fetchRecords}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                           transition-all duration-200 shadow-md hover:shadow-lg"
              >
                再試行
              </button>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              検索結果が見つかりませんでした
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedRecords.map((record) => (
                <div
                  key={record.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => {
                    onSelect(record);
                    onClose();
                  }}
                >
                  {/* Sample Data Name - Large and prominent */}
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {record.sampleDataName}
                  </h3>

                  {/* Two column layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: 前月の訪問看護報告書 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 border-b pb-1">
                        前月の訪問看護報告書
                      </h4>
                      
                      <div className="text-xs space-y-2">
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">病状の経過: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.diseaseProgress, 40)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">看護内容: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.nursingContent, 40)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">介護状況: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.homeCareStatus, 40)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">特記事項: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.specialNotes, 40)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">PT・OT・ST: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.ptOtStContent, 40)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: 前月の訪問看護記録書Ⅱ */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 border-b pb-1">
                        前月の訪問看護記録書Ⅱ
                      </h4>
                      
                      <div className="text-xs space-y-2">
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">第1週 Ns: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.weeklyRecords.week1Ns, 35)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">第1週 PT: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.weeklyRecords.week1Pt, 35)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">第2週 Ns: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.weeklyRecords.week2Ns, 35)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">第2週 PT: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.weeklyRecords.week2Pt, 35)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">第3週 Ns: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.weeklyRecords.week3Ns, 35)}
                          </span>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">第4週 Ns: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.weeklyRecords.week4Ns, 35)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {loading ? '読み込み中...' : `${filteredRecords.length}件の結果`}
            </span>
            
            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg font-medium transition-all duration-200
                             ${currentPage === 1 
                               ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' 
                               : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                >
                  前へ
                </button>
                
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentPage} / {totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg font-medium transition-all duration-200
                             ${currentPage === totalPages 
                               ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' 
                               : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                >
                  次へ
                </button>
              </div>
            )}
            
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
    </div>
  );
};
