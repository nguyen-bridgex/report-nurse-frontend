'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface PromptData {
  id: string;
  name: string;
  instruction: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PromptResponse {
  items: PromptData[];
}

interface PromptSelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (prompt: PromptData) => void;
}

const API_URL = 'https://c3jh0qba9f.execute-api.ap-northeast-1.amazonaws.com/prod/prompts';

export const PromptSelectDialog: React.FC<PromptSelectDialogProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [prompts, setPrompts] = useState<PromptData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptData | null>(null);
  const [selectedPromptId, setSelectedPromptId] = useState<string>('0');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    instruction: '',
    description: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchPrompts();
      // Load selected prompt ID from localStorage
      const storedPromptId = localStorage.getItem('selectedPromptId') || '1';
      setSelectedPromptId(storedPromptId);
    }
  }, [isOpen]);

  const fetchPrompts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<PromptResponse>(API_URL);
      setPrompts(response.data.items);
    } catch (err) {
      console.error('Failed to fetch prompts:', err);
      setError('プロンプトの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.instruction) {
      alert('名前と指示内容は必須です。');
      return;
    }

    try {
      await axios.post(API_URL, {
        name: formData.name,
        instruction: formData.instruction,
        description: formData.description || undefined,
      });
      
      setFormData({ name: '', instruction: '', description: '' });
      setIsCreating(false);
      fetchPrompts();
    } catch (err) {
      console.error('Failed to create prompt:', err);
      alert('プロンプトの作成に失敗しました。');
    }
  };

  const handleUpdate = async () => {
    if (!editingPrompt || !formData.name || !formData.instruction) {
      alert('名前と指示内容は必須です。');
      return;
    }

    try {
      await axios.put(`${API_URL}/${editingPrompt.id}`, {
        name: formData.name,
        instruction: formData.instruction,
        description: formData.description || undefined,
      });
      
      setFormData({ name: '', instruction: '', description: '' });
      setEditingPrompt(null);
      fetchPrompts();
    } catch (err) {
      console.error('Failed to update prompt:', err);
      alert('プロンプトの更新に失敗しました。');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('このプロンプトを削除してもよろしいですか？')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPrompts();
    } catch (err) {
      console.error('Failed to delete prompt:', err);
      alert('プロンプトの削除に失敗しました。');
    }
  };

  const startEdit = (prompt: PromptData) => {
    setEditingPrompt(prompt);
    setFormData({
      name: prompt.name,
      instruction: prompt.instruction,
      description: prompt.description || '',
    });
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingPrompt(null);
    setFormData({ name: '', instruction: '', description: '' });
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingPrompt(null);
    setFormData({ name: '', instruction: '', description: '' });
  };

  const handleSelectPrompt = (prompt: PromptData) => {
    // Save selected prompt ID to localStorage
    localStorage.setItem('selectedPromptId', prompt.id);
    setSelectedPromptId(prompt.id);
    onSelect(prompt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              プロンプト選択
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
          {/* Create/Edit Form */}
          {(isCreating || editingPrompt) && (
            <div className="mb-6 p-4 border-2 border-purple-500 rounded-lg bg-purple-50 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {editingPrompt ? 'プロンプト編集' : '新規プロンプト作成'}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    名前 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="プロンプト名を入力"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               dark:bg-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    指示内容 *
                  </label>
                  <textarea
                    value={formData.instruction}
                    onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
                    placeholder="AIへの指示内容を入力"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               dark:bg-gray-900 dark:text-white resize-y"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    説明（任意）
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="プロンプトの説明を入力"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               dark:bg-gray-900 dark:text-white resize-y"
                  />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={editingPrompt ? handleUpdate : handleCreate}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg
                               transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {editingPrompt ? '更新' : '作成'}
                  </button>
                  <button
                    onClick={cancelForm}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg
                               transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Create New Button */}
          {!isCreating && !editingPrompt && (
            <button
              onClick={startCreate}
              className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg
                         transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              新規プロンプト作成
            </button>
          )}

          {/* Prompts List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">プロンプトを読み込んでいます...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
              <button
                onClick={fetchPrompts}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                           transition-all duration-200 shadow-md hover:shadow-lg"
              >
                再試行
              </button>
            </div>
          ) : prompts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              プロンプトが見つかりませんでした
            </div>
          ) : (
            <div className="space-y-3">
              {prompts.map((prompt) => {
                const isSelected = prompt.id === selectedPromptId;
                return (
                  <div
                    key={prompt.id}
                    className={`rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                               ${isSelected 
                                 ? 'border-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                 : 'border border-gray-200 dark:border-gray-700'}`}
                  >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {prompt.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(prompt)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded
                                   transition-all duration-200"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDelete(prompt.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded
                                   transition-all duration-200"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  
                  {prompt.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {prompt.description}
                    </p>
                  )}
                  
                  <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded mb-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {prompt.instruction}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleSelectPrompt(prompt)}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg
                               transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    このプロンプトを使用
                  </button>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {loading ? '読み込み中...' : `${prompts.length}件のプロンプト`}
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

