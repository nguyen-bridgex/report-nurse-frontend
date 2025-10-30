'use client';

import React, { useState } from 'react';
import { TextAreaField } from '../components/TextAreaField';
import { SessionRecordSection } from '../components/SessionRecordSection';
import { RecordData, SearchDialog } from '../components/SearchDialog';
import { PromptData, PromptSelectDialog } from '../components/PromptSelectDialog';
import { GeneratedSummaryDialog } from '../components/GeneratedSummaryDialog';
import axios from 'axios';
import Link from 'next/link';

interface SessionRecord {
  id: string;
  ns: string;
  ptOtSt: string;
}

interface PreviousMonthData {
  diseaseProgress: string;
  nursingContent: string;
  homeCareStatus: string;
  specialNotes: string;
  ptOtStContent: string;
  sessionRecords: SessionRecord[];
}

interface CurrentMonthData {
  diseaseProgress: string;
  nursingContent: string;
  homeCareStatus: string;
  specialNotes: string;
  ptOtStContent: string;
  feedback: string;
}

export default function PromptPage() {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [isPromptDialogOpen, setIsPromptDialogOpen] = useState(false);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [sampleDataName, setSampleDataName] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [sourceNursingReportId, setSourceNursingReportId] = useState('');
  
  const [previousMonth, setPreviousMonth] = useState<PreviousMonthData>({
    diseaseProgress: '',
    nursingContent: '',
    homeCareStatus: '',
    specialNotes: '',
    ptOtStContent: '',
    sessionRecords: [],
  });

  const [currentMonth, setCurrentMonth] = useState<CurrentMonthData>({
    diseaseProgress: '',
    nursingContent: '',
    homeCareStatus: '',
    specialNotes: '',
    ptOtStContent: '',
    feedback: '',
  });

  const handleSearch = () => {
    setIsSearchDialogOpen(true);
  };

  const handleAddSession = () => {
    const newSession: SessionRecord = {
      id: Date.now().toString(),
      ns: '',
      ptOtSt: '',
    };
    setPreviousMonth({
      ...previousMonth,
      sessionRecords: [...previousMonth.sessionRecords, newSession],
    });
  };

  const handleRemoveSession = (sessionId: string) => {
    setPreviousMonth({
      ...previousMonth,
      sessionRecords: previousMonth.sessionRecords.filter(s => s.id !== sessionId),
    });
  };

  const handleSessionNsChange = (sessionId: string, value: string) => {
    setPreviousMonth({
      ...previousMonth,
      sessionRecords: previousMonth.sessionRecords.map(s =>
        s.id === sessionId ? { ...s, ns: value } : s
      ),
    });
  };

  const handleSessionPtChange = (sessionId: string, value: string) => {
    setPreviousMonth({
      ...previousMonth,
      sessionRecords: previousMonth.sessionRecords.map(s =>
        s.id === sessionId ? { ...s, ptOtSt: value } : s
      ),
    });
  };

  const handleSelectRecord = (record: RecordData) => {
    // Populate previous month data from the selected record
    // Map weekly records to session records
    const sessionRecords: SessionRecord[] = [];
    
    // Add sessions from weekly records
    if (record.weeklyRecords.week1Ns || record.weeklyRecords.week1Pt) {
      sessionRecords.push({
        id: `week1-${Date.now()}`,
        ns: record.weeklyRecords.week1Ns,
        ptOtSt: record.weeklyRecords.week1Pt,
      });
    }
    if (record.weeklyRecords.week2Ns || record.weeklyRecords.week2Pt) {
      sessionRecords.push({
        id: `week2-${Date.now()}`,
        ns: record.weeklyRecords.week2Ns,
        ptOtSt: record.weeklyRecords.week2Pt,
      });
    }
    if (record.weeklyRecords.week3Ns || record.weeklyRecords.week3Pt) {
      sessionRecords.push({
        id: `week3-${Date.now()}`,
        ns: record.weeklyRecords.week3Ns,
        ptOtSt: record.weeklyRecords.week3Pt,
      });
    }
    if (record.weeklyRecords.week4Ns || record.weeklyRecords.week4Pt) {
      sessionRecords.push({
        id: `week4-${Date.now()}`,
        ns: record.weeklyRecords.week4Ns,
        ptOtSt: record.weeklyRecords.week4Pt,
      });
    }

    setPreviousMonth({
      diseaseProgress: record.diseaseProgress,
      nursingContent: record.nursingContent,
      homeCareStatus: record.homeCareStatus,
      specialNotes: record.specialNotes,
      ptOtStContent: record.ptOtStContent,
      sessionRecords: sessionRecords,
    });

    // Save the source nursing report ID
    setSourceNursingReportId(record.id);

    console.log('レコード選択:', record.sampleDataName);
  };

  const handleRegister = async () => {
    try {
      console.log('=== 登録開始 ===');
      
      const apiUrl = 'https://c3jh0qba9f.execute-api.ap-northeast-1.amazonaws.com/prod/regist-ai-summary';
      await axios.post(apiUrl, {
        source_nursing_report_id: sourceNursingReportId || '',
        title: sampleDataName,
        illness_course: currentMonth.diseaseProgress,
        nursing_service: currentMonth.nursingContent,
        home_care_situation: currentMonth.homeCareStatus,
        mental_style: '',
        special_notes: currentMonth.specialNotes,
        contents: currentMonth.ptOtStContent,
        feedback: currentMonth.feedback,
      });
      
      console.log('✅ 登録完了');
      
      // Open the generated summary list dialog
      setIsSummaryDialogOpen(true);
    } catch (error) {
      console.error('❌ 登録エラー:', error);
      alert('登録に失敗しました。もう一度お試しください。');
    }
  };

  const handleGenerateAIReport = () => {
    // Open prompt selection dialog
    setIsPromptDialogOpen(true);
  };

  const handlePromptSelect = async (prompt: PromptData) => {
    setSelectedPrompt(prompt);
    setIsGeneratingReport(true);
    
    try {
      console.log('=== AI報告書生成 ===');
      console.log('Selected Prompt:', prompt);
      console.log('Previous Month Data (including session records):', previousMonth);
      console.log('Current Month Data:', currentMonth);
      console.log('Selected Prompt:', selectedPrompt);

      const apiUrl = 'https://c3jh0qba9f.execute-api.ap-northeast-1.amazonaws.com/prod/summary';
      const response = await axios.post(apiUrl, {
          "title": sampleDataName,
          "illness_course": previousMonth.diseaseProgress,
          "nursing_service": previousMonth.nursingContent,
          "home_care_situation": previousMonth.homeCareStatus,
          "mental_style": '',
          "special_notes": previousMonth.specialNotes,
          "contents": previousMonth.ptOtStContent,
          "instruction": prompt.instruction, // Include prompt instruction in API call
          "weekly_reports": previousMonth.sessionRecords.map(record => ({
            "week_number": record.id,
            "type": record.ns,
            "content": record.ptOtSt,
          })),
      });
      const generatedData = response.data;
          
      // Populate current month fields with generated data
      setCurrentMonth({
        diseaseProgress: generatedData.summary.illness_course,
        nursingContent: generatedData.summary.nursing_service,
        homeCareStatus: generatedData.summary.home_care_situation,
        specialNotes: generatedData.summary.special_notes,
        ptOtStContent: generatedData.summary.contents,
        feedback: '', // Keep feedback empty
      });
      
      // Set sample data name if not already set
      if (!sampleDataName) {
        setSampleDataName(generatedData.summary.title);
      }
      
      console.log('✅ AI報告書生成完了');
    } catch (error) {
      console.error('❌ AI報告書生成エラー:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              AI 報告書テスト画面イメージ（プロンプト版）
            </h1>
            <Link
              href="/"
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg
                         transition-all duration-200 shadow-md hover:shadow-lg"
            >
              通常版へ戻る
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Pane - Previous Month */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-blue-500">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  前月の訪問看護報告書
                </h2>
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                             transition-all duration-200 shadow-md hover:shadow-lg
                             active:scale-95 flex-shrink-0"
                >
                  検索
                </button>
              </div>
              
              <div className="space-y-4">
                <TextAreaField
                  label="病状の経過"
                  value={previousMonth.diseaseProgress}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, diseaseProgress: value })
                  }
                  rows={4}
                />
                
                <TextAreaField
                  label="看護（リハビリテーション）の内容"
                  value={previousMonth.nursingContent}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, nursingContent: value })
                  }
                  rows={4}
                />
                
                <TextAreaField
                  label="家庭での介護の状況（精神様式：家族等との関係）"
                  value={previousMonth.homeCareStatus}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, homeCareStatus: value })
                  }
                  rows={4}
                />
                
                <TextAreaField
                  label="特記すべき事項"
                  value={previousMonth.specialNotes}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, specialNotes: value })
                  }
                  rows={4}
                />
                
                <TextAreaField
                  label="PT・OT・STが行った訪問看護、家族等への指導、リスク管理等の内容"
                  value={previousMonth.ptOtStContent}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, ptOtStContent: value })
                  }
                  rows={4}
                />
              </div>
            </div>

            {/* Session Records Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-green-500">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  前月の訪問看護記録書Ⅱ
                </h2>
                <button
                  onClick={handleAddSession}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg
                             transition-all duration-200 shadow-md hover:shadow-lg
                             active:scale-95 flex items-center gap-2"
                >
                  <span className="text-lg">+</span>
                  回を追加
                </button>
              </div>

              <div className="space-y-4">
                {previousMonth.sessionRecords.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <p className="mb-2">訪問看護記録がありません</p>
                    <p className="text-sm">「回を追加」ボタンをクリックして記録を追加してください</p>
                  </div>
                ) : (
                  previousMonth.sessionRecords.map((session, index) => (
                    <SessionRecordSection
                      key={session.id}
                      sessionNumber={index + 1}
                      nsValue={session.ns}
                      ptValue={session.ptOtSt}
                      onNsChange={(value) => handleSessionNsChange(session.id, value)}
                      onPtChange={(value) => handleSessionPtChange(session.id, value)}
                      onRemove={() => handleRemoveSession(session.id)}
                      showRemoveButton={true}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Pane - Current Month */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b-2 border-purple-500">
                今月の訪問看護報告書
              </h2>
              
              <div className="space-y-4">
                
                
                <TextAreaField
                  label="病状の経過"
                  value={currentMonth.diseaseProgress}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, diseaseProgress: value })
                  }
                  rows={4}
                  placeholder="病状の経過を入力してください"
                />
                
                <TextAreaField
                  label="看護（リハビリテーション）の内容"
                  value={currentMonth.nursingContent}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, nursingContent: value })
                  }
                  rows={4}
                  placeholder="看護の内容を入力してください"
                />
                
                <TextAreaField
                  label="家庭での介護の状況（精神様式：家族等との関係）"
                  value={currentMonth.homeCareStatus}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, homeCareStatus: value })
                  }
                  rows={4}
                  placeholder="家庭での介護の状況を入力してください"
                />
                
                <TextAreaField
                  label="特記すべき事項"
                  value={currentMonth.specialNotes}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, specialNotes: value })
                  }
                  rows={4}
                  placeholder="特記すべき事項を入力してください"
                />
                
                <TextAreaField
                  label="PT・OT・STが行った訪問看護、家族等への指導、リスク管理等の内容"
                  value={currentMonth.ptOtStContent}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, ptOtStContent: value })
                  }
                  rows={4}
                  placeholder="PT・OT・STが行った訪問看護、家族等への指導、リスク管理等の内容を入力してください"
                />
                
                <TextAreaField
                  label="フィードバック"
                  value={currentMonth.feedback}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, feedback: value })
                  }
                  rows={4}
                  placeholder="フィードバックを入力してください"
                />

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    サンプルデータ名
                  </label>
                  <input
                    type="text"
                    value={sampleDataName}
                    onChange={(e) => setSampleDataName(e.target.value)}
                    placeholder="サンプルデータ名を入力してください（例：田中太郎_20241115_01）"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                               focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               dark:bg-gray-900 dark:text-white
                               transition-all duration-200"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleRegister}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg
                             transition-all duration-200 shadow-md hover:shadow-lg
                             active:scale-95"
                >
                  登録
                </button>
                <button
                  onClick={handleGenerateAIReport}
                  disabled={isGeneratingReport}
                  className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg
                             transition-all duration-200 shadow-md hover:shadow-lg
                             active:scale-95 flex items-center justify-center gap-2
                             ${isGeneratingReport 
                               ? 'bg-gray-400 cursor-not-allowed' 
                               : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}`}
                >
                  {isGeneratingReport && (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isGeneratingReport ? '生成中...' : 'AI報告書生成'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
        onSelect={handleSelectRecord}
        searchQuery=""
      />

      {/* Prompt Select Dialog */}
      <PromptSelectDialog
        isOpen={isPromptDialogOpen}
        onClose={() => setIsPromptDialogOpen(false)}
        onSelect={handlePromptSelect}
      />

      {/* Generated Summary Dialog */}
      <GeneratedSummaryDialog
        isOpen={isSummaryDialogOpen}
        onClose={() => setIsSummaryDialogOpen(false)}
      />
    </div>
  );
}

