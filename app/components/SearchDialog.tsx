'use client';

import React from 'react';

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

// Mock data - will be replaced with API call
const mockRecords: RecordData[] = [
  {
    id: '1',
    sampleDataName: '田中太郎_20241015_01',
    diseaseProgress: '糖尿病の管理が良好。血糖値は安定しており、インスリン投与量は現状維持。',
    nursingContent: '血糖測定の指導を実施。インスリン自己注射の手技確認を行った。',
    homeCareStatus: '家族のサポートが十分にあり、日常生活は自立している。食事管理も良好。',
    familyRelations: '家族との関係は良好。配偶者が積極的にサポートしている。',
    specialNotes: '次回訪問時に、足のケアについて指導予定。',
    ptOtStContent: 'ADL向上のためのリハビリを実施。歩行訓練を中心に行った。',
    weeklyRecords: {
      week1Ns: '<p>初回訪問。バイタルサイン測定、<strong>血糖値110mg/dl</strong>。状態良好。</p>',
      week1Pt: '<p>歩行訓練実施。<strong>10分間</strong>の歩行が可能。</p>',
      week2Ns: '<p>血糖値測定指導。<em>自己測定</em>の手技を確認。</p>',
      week2Pt: '<p>バランス訓練追加。転倒リスク軽減のため。</p>',
      week3Ns: '<p>インスリン注射の手技確認。問題なく実施できている。</p>',
      week3Pt: '<p>階段昇降訓練開始。<strong>安全に実施</strong>できた。</p>',
      week4Ns: '<p>足のケア指導実施。<strong>毎日の観察</strong>を指導した。</p>',
      week4Pt: '<p>月末評価。ADL向上が認められる。継続実施予定。</p>',
    },
  },
  {
    id: '2',
    sampleDataName: '佐藤花子_20241010_02',
    diseaseProgress: '脳梗塞後のリハビリ継続中。右半身の麻痺が徐々に改善傾向。',
    nursingContent: '日常生活動作の訓練と服薬管理を実施。嚥下機能の評価も行った。',
    homeCareStatus: '娘が同居しており、介護サポートあり。訪問看護との連携も良好。',
    familyRelations: '娘との関係は良好だが、本人が介護負担を気にしている様子。',
    specialNotes: '嚥下機能低下の兆候あり。次回、STによる詳細評価を実施予定。',
    ptOtStContent: '上肢機能訓練と歩行訓練を実施。杖歩行が安定してきた。',
    weeklyRecords: {
      week1Ns: '<p>バイタル確認。血圧<strong>130/80mmHg</strong>。服薬状況良好。</p>',
      week1Pt: '<p>関節可動域訓練実施。右肩の可動域が<em>改善傾向</em>。</p>',
      week2Ns: '<p>嚥下評価実施。<strong>軽度の嚥下障害</strong>を認める。</p>',
      week2Pt: '<p>平行棒内歩行訓練。バランス能力向上。</p>',
      week3Ns: '<p>食事形態の調整指導。家族への説明も実施。</p>',
      week3Pt: '<p>杖歩行訓練開始。<strong>10m歩行可能</strong>。</p>',
      week4Ns: '<p>服薬管理良好。<em>自己管理</em>できている。</p>',
      week4Pt: '<p>階段訓練準備。手すり使用で2段昇降可能。</p>',
    },
  },
  {
    id: '3',
    sampleDataName: '山田一郎_20241008_01',
    diseaseProgress: '慢性心不全の管理。浮腫の改善が見られ、呼吸状態も安定している。',
    nursingContent: '体重測定と浮腫の観察を実施。利尿薬の効果確認と服薬指導を行った。',
    homeCareStatus: '独居だが、近隣の支援あり。訪問看護の頻度を増やして対応中。',
    familyRelations: '息子が遠方に居住。週1回の電話連絡で状況確認している。',
    specialNotes: '塩分制限の食事指導を継続。体重増加時の対応について再指導必要。',
    ptOtStContent: '心負荷を考慮した軽度の運動療法を実施。呼吸リハビリも併用。',
    weeklyRecords: {
      week1Ns: '<p>体重60.5kg。前回より<strong>1kg減少</strong>。浮腫軽減。</p>',
      week1Pt: '<p>座位での<em>深呼吸訓練</em>実施。SpO2 96%維持。</p>',
      week2Ns: '<p>血圧測定。120/75mmHg。<strong>安定している</strong>。</p>',
      week2Pt: '<p>歩行訓練5分実施。息切れなし。</p>',
      week3Ns: '<p>服薬状況確認。利尿薬の効果良好。塩分制限継続中。</p>',
      week3Pt: '<p>運動耐容能評価。<strong>前回より改善</strong>傾向。</p>',
      week4Ns: '<p>体重60.2kg。<em>維持できている</em>。状態安定。</p>',
      week4Pt: '<p>呼吸訓練継続。自宅でも実施できるよう指導。</p>',
    },
  },
  {
    id: '4',
    sampleDataName: '鈴木美咲_20241005_03',
    diseaseProgress: 'パーキンソン病による運動機能低下。薬物調整により症状はやや改善。',
    nursingContent: '服薬管理と転倒予防指導を実施。日常生活動作の評価も継続中。',
    homeCareStatus: '夫と二人暮らし。夫の介護負担が増加傾向。デイサービス利用検討中。',
    familyRelations: '夫との関係は良好だが、夫の疲労が心配。家族カンファレンス必要。',
    specialNotes: '転倒リスク高い。住宅環境の整備について家族と相談予定。',
    ptOtStContent: 'バランス訓練と歩行訓練を実施。転倒予防のための指導も行った。',
    weeklyRecords: {
      week1Ns: '<p>バイタル確認。<strong>振戦は軽度</strong>。服薬時間厳守できている。</p>',
      week1Pt: '<p>立位バランス訓練。保持時間<em>30秒</em>まで延長。</p>',
      week2Ns: '<p>転倒予防指導実施。環境整備の提案を行った。</p>',
      week2Pt: '<p>歩行訓練。<strong>歩行速度やや改善</strong>。</p>',
      week3Ns: '<p>服薬効果確認。<em>運動症状の改善</em>あり。</p>',
      week3Pt: '<p>階段昇降評価。手すり使用で安全に実施可能。</p>',
      week4Ns: '<p>家族面談実施。デイサービス利用について説明。</p>',
      week4Pt: '<p>月末評価。<strong>ADL維持</strong>できている。継続支援必要。</p>',
    },
  },
  {
    id: '5',
    sampleDataName: '高橋健太_20241001_01',
    diseaseProgress: 'COPD（慢性閉塞性肺疾患）の管理。呼吸状態は概ね安定。',
    nursingContent: '酸素療法の管理と呼吸訓練の指導を実施。感染予防の指導も継続。',
    homeCareStatus: '妻が介護。在宅酸素療法を適切に実施できている。',
    familyRelations: '妻との関係良好。妻の介護技術も向上している。',
    specialNotes: '季節の変わり目で感染リスク高い。インフルエンザ予防接種を勧奨。',
    ptOtStContent: '呼吸リハビリを中心に実施。運動耐容能の維持を目標としている。',
    weeklyRecords: {
      week1Ns: '<p>SpO2 94%（酸素2L）。<strong>呼吸状態安定</strong>。</p>',
      week1Pt: '<p>呼吸訓練実施。<em>腹式呼吸</em>の手技確認。</p>',
      week2Ns: '<p>感染徴候なし。予防的うがい・手洗い継続中。</p>',
      week2Pt: '<p>歩行訓練5分。酸素飽和度<strong>維持できた</strong>。</p>',
      week3Ns: '<p>酸素流量適切。<em>自己管理</em>良好。</p>',
      week3Pt: '<p>上肢運動訓練追加。日常生活動作の向上目指す。</p>',
      week4Ns: '<p>インフルエンザ予防接種実施。副反応なし。</p>',
      week4Pt: '<p>呼吸リハビリ継続。<strong>効果維持</strong>している。</p>',
    },
  },
];

export const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  onSelect,
  searchQuery,
}) => {
  if (!isOpen) return null;

  // Filter records based on search query
  const filteredRecords = searchQuery
    ? mockRecords.filter((record) =>
        record.sampleDataName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockRecords;

  const truncateText = (text: string, maxLength: number = 50) => {
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
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
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

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              検索結果が見つかりませんでした
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
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
                          <span className="font-medium text-gray-600 dark:text-gray-400">家族関係: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {truncateText(record.familyRelations, 40)}
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
              {filteredRecords.length}件の結果
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
    </div>
  );
};

