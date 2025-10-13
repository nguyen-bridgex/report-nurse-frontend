'use client';

import React, { useState } from 'react';
import { TextAreaField } from './components/TextAreaField';
import { WeeklyRecordSection } from './components/WeeklyRecordSection';

interface PreviousMonthData {
  sampleDataName: string;
  diseaseProgress: string;
  nursingContent: string;
  homeCareStatus: string;
  familyRelations: string;
  specialNotes: string;
  ptOtStContent: string;
  weeklyRecords: {
    ns: string[];
    ptOtSt: string[];
  };
}

interface CurrentMonthData {
  sampleDataName: string;
  diseaseProgress: string;
  nursingContent: string;
  homeCareStatus: string;
  familyRelations: string;
  specialNotes: string;
  feedback: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [previousMonth, setPreviousMonth] = useState<PreviousMonthData>({
    sampleDataName: '',
    diseaseProgress: '',
    nursingContent: '',
    homeCareStatus: '',
    familyRelations: '',
    specialNotes: '',
    ptOtStContent: '',
    weeklyRecords: {
      ns: ['', '', '', ''],
      ptOtSt: ['', '', '', ''],
    },
  });

  const [currentMonth, setCurrentMonth] = useState<CurrentMonthData>({
    sampleDataName: '',
    diseaseProgress: '',
    nursingContent: '',
    homeCareStatus: '',
    familyRelations: '',
    specialNotes: '',
    feedback: '',
  });

  const handleSearch = () => {
    console.log('検索:', searchQuery);
    // Implement search logic here
  };

  const handleRegister = () => {
    console.log('登録:', currentMonth);
    // Implement register logic here
  };

  const handleGenerateAIReport = () => {
    console.log('AI報告書生成');
    // Implement AI report generation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            AI 報告書テスト画面イメージ
          </h1>
          
          {/* Search Section */}
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                サンプルデータ名
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="サンプルデータ名を入力してください"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           dark:bg-gray-700 dark:text-white
                           transition-all duration-200"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                         transition-all duration-200 shadow-md hover:shadow-lg
                         active:scale-95"
            >
              検索
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Pane - Previous Month */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b-2 border-blue-500">
                前月の訪問看護報告書
              </h2>
              
              <div className="space-y-4">
                <TextAreaField
                  label="サンプルデータ名"
                  value={previousMonth.sampleDataName}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, sampleDataName: value })
                  }
                  rows={2}
                />
                
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
                  label="家庭での介護の状況"
                  value={previousMonth.homeCareStatus}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, homeCareStatus: value })
                  }
                  rows={4}
                />
                
                <TextAreaField
                  label="（精神様式：家族等との関係）"
                  value={previousMonth.familyRelations}
                  onChange={(value) =>
                    setPreviousMonth({ ...previousMonth, familyRelations: value })
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

            {/* Weekly Records Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-3 border-b-2 border-green-500">
                前月の訪問看護記録書Ⅱ
              </h2>
              
              <div className="space-y-4">
                {[0, 1, 2, 3].map((index) => (
                  <WeeklyRecordSection
                    key={index}
                    weekNumber={index + 1}
                    nsValue={previousMonth.weeklyRecords.ns[index]}
                    ptValue={previousMonth.weeklyRecords.ptOtSt[index]}
                    onNsChange={(value) => {
                      const newNs = [...previousMonth.weeklyRecords.ns];
                      newNs[index] = value;
                      setPreviousMonth({
                        ...previousMonth,
                        weeklyRecords: { ...previousMonth.weeklyRecords, ns: newNs },
                      });
                    }}
                    onPtChange={(value) => {
                      const newPtOtSt = [...previousMonth.weeklyRecords.ptOtSt];
                      newPtOtSt[index] = value;
                      setPreviousMonth({
                        ...previousMonth,
                        weeklyRecords: { ...previousMonth.weeklyRecords, ptOtSt: newPtOtSt },
                      });
                    }}
                  />
                ))}
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
                  label="サンプルデータ名"
                  value={currentMonth.sampleDataName}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, sampleDataName: value })
                  }
                  rows={2}
                />
                
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
                  label="家庭での介護の状況"
                  value={currentMonth.homeCareStatus}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, homeCareStatus: value })
                  }
                  rows={4}
                  placeholder="家庭での介護の状況を入力してください"
                />
                
                <TextAreaField
                  label="（精神様式：家族等との関係）"
                  value={currentMonth.familyRelations}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, familyRelations: value })
                  }
                  rows={4}
                  placeholder="家族等との関係を入力してください"
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
                  label="フィードバック"
                  value={currentMonth.feedback}
                  onChange={(value) =>
                    setCurrentMonth({ ...currentMonth, feedback: value })
                  }
                  rows={4}
                  placeholder="フィードバックを入力してください"
                />
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 
                             hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg
                             transition-all duration-200 shadow-md hover:shadow-lg
                             active:scale-95"
                >
                  AI報告書生成
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
