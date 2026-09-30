import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Plus,
  Search,
  Trash2,
  Edit2,
  Pin,
  PinOff,
  Check,
  X,
  Download,
  Upload,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Scale,
  FolderArchive,
  AlertCircle
} from 'lucide-react';
import { LegalChatSession, ChatMessage } from '../types';

interface ChatSessionSidebarProps {
  sessions: LegalChatSession[];
  activeSessionId: string;
  isOpen: boolean;
  onToggleOpen: () => void;
  onSelectSession: (sessionId: string) => void;
  onCreateNewSession: () => void;
  onRenameSession: (sessionId: string, newTitle: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onTogglePinSession: (sessionId: string) => void;
  onImportSessions?: (imported: LegalChatSession[]) => void;
  onClearAllSessions?: () => void;
}

export const ChatSessionSidebar: React.FC<ChatSessionSidebarProps> = ({
  sessions,
  activeSessionId,
  isOpen,
  onToggleOpen,
  onSelectSession,
  onCreateNewSession,
  onRenameSession,
  onDeleteSession,
  onTogglePinSession,
  onImportSessions,
  onClearAllSessions,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter and sort sessions
  const filteredSessions = useMemo(() => {
    return sessions
      .filter((s) => {
        const matchesQuery =
          !searchQuery.trim() ||
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.lastQuery && s.lastQuery.toLowerCase().includes(searchQuery.toLowerCase())) ||
          s.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'all' || (s.category && s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        // Pinned first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        // Then by updated date descending
        const dateA = new Date(a.updatedAt || a.createdAt).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt).getTime();
        return dateB - dateA;
      });
  }, [sessions, searchQuery, selectedCategory]);

  // Grouping by time
  const groupedSessions = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const groups: { [key: string]: LegalChatSession[] } = {
      'Qadalganlar': [],
      'Bugun': [],
      'Kecha': [],
      'Oxirgi 7 kun': [],
      'Oldingi sessiyalar': [],
    };

    filteredSessions.forEach((session) => {
      if (session.isPinned) {
        groups['Qadalganlar'].push(session);
        return;
      }

      const sessionDate = new Date(session.updatedAt || session.createdAt);
      sessionDate.setHours(0, 0, 0, 0);

      if (sessionDate.getTime() === today.getTime()) {
        groups['Bugun'].push(session);
      } else if (sessionDate.getTime() === yesterday.getTime()) {
        groups['Kecha'].push(session);
      } else if (sessionDate >= lastWeek) {
        groups['Oxirgi 7 kun'].push(session);
      } else {
        groups['Oldingi sessiyalar'].push(session);
      }
    });

    return groups;
  }, [filteredSessions]);

  const handleStartRename = (session: LegalChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitleInput(session.title);
  };

  const handleSaveRename = (sessionId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editTitleInput.trim()) {
      onRenameSession(sessionId, editTitleInput.trim());
    }
    setEditingSessionId(null);
  };

  const handleCancelRename = () => {
    setEditingSessionId(null);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sessions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lexai-yuridik-sessiyalar-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && onImportSessions) {
          onImportSessions(parsed);
        }
      } catch (err) {
        console.error('Import hatosi:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          id="chat-sidebar-backdrop"
          onClick={onToggleOpen}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden transition-opacity"
        />
      )}

      <aside
        id="chat-sessions-sidebar"
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200 w-80 max-w-[85vw] transition-all duration-300 ease-in-out shadow-lg lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'
        }`}
        style={{ height: '100%' }}
      >
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FolderArchive className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5 truncate">
                <span>Konsultatsiyalar</span>
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-semibold">
                  {sessions.length}
                </span>
              </h3>
              <p className="text-[10px] text-slate-500 truncate">Sessiyalar & Lex.uz tahlillari</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="close-sidebar-btn"
              onClick={onToggleOpen}
              title="Panelni yopish"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/70 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* New Session Action Button */}
        <div className="p-3 border-b border-slate-100">
          <button
            id="create-new-session-btn"
            onClick={() => {
              onCreateNewSession();
              // On mobile, optionally keep open or close
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi konsultatsiya</span>
          </button>
        </div>

        {/* Search and Category Filter */}
        <div className="px-3 pt-2 pb-1.5 space-y-2 border-b border-slate-100">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="search-sessions-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sessiyalardan qidirish..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg text-xs text-slate-800 placeholder-slate-400 transition-all outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[11px]">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'fuqaro', label: 'Fuqarolik' },
              { id: 'mehnat', label: 'Mehnat' },
              { id: 'oila', label: 'Oila' },
              { id: 'soliq', label: 'Soliq' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 rounded-md shrink-0 font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs">
          {filteredSessions.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-slate-600">Sessiyalar topilmadi</p>
              <p className="text-[11px] text-slate-400 mt-1">
                {searchQuery ? 'Qidiruv so‘zini o‘zgartiring' : 'Yangi konsultatsiya boshlang'}
              </p>
            </div>
          ) : (
            Object.entries(groupedSessions).map(([groupTitle, groupItems]) => {
              if (groupItems.length === 0) return null;

              return (
                <div key={groupTitle} className="space-y-1">
                  <div className="px-2 py-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    <span>{groupTitle}</span>
                    <span className="text-[9px] bg-slate-200/60 px-1.5 py-0.2 rounded-full font-medium">
                      {groupItems.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {groupItems.map((session) => {
                      const isActive = session.id === activeSessionId;
                      const isEditing = editingSessionId === session.id;

                      return (
                        <div
                          key={session.id}
                          id={`session-item-${session.id}`}
                          onClick={() => {
                            if (!isEditing) onSelectSession(session.id);
                          }}
                          className={`group relative flex items-start gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-150 text-slate-700'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {session.isPinned ? (
                              <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            ) : (
                              <MessageSquare
                                className={`w-3.5 h-3.5 ${
                                  isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                                }`}
                              />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            {isEditing ? (
                              <form
                                onSubmit={(e) => handleSaveRename(session.id, e)}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1"
                              >
                                <input
                                  type="text"
                                  autoFocus
                                  value={editTitleInput}
                                  onChange={(e) => setEditTitleInput(e.target.value)}
                                  className="w-full py-0.5 px-1.5 text-xs bg-white border border-emerald-500 rounded-md focus:outline-hidden"
                                />
                                <button
                                  type="submit"
                                  className="p-1 text-emerald-700 hover:bg-emerald-100 rounded-sm"
                                  title="Saqlash"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelRename}
                                  className="p-1 text-slate-400 hover:bg-slate-100 rounded-sm"
                                  title="Bekor qilish"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            ) : (
                              <>
                                <div className="flex items-center justify-between gap-1">
                                  <span className="truncate text-xs font-semibold" title={session.title}>
                                    {session.title}
                                  </span>
                                  <span className="text-[10px] text-slate-600 shrink-0">
                                    {session.messages.length} xabar
                                  </span>
                                </div>

                                {session.lastQuery && (
                                  <p className="text-[11px] text-slate-600 truncate mt-0.5">
                                    {session.lastQuery}
                                  </p>
                                )}

                                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-600">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" />
                                    {new Date(session.updatedAt || session.createdAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                  {session.category && (
                                    <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-xs font-medium">
                                      {session.category}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Hover Action Buttons */}
                          {!isEditing && (
                            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 absolute right-1.5 top-2 bg-white/95 backdrop-blur-xs p-0.5 rounded-md shadow-xs border border-slate-200 transition-opacity">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTogglePinSession(session.id);
                                }}
                                title={session.isPinned ? 'Qadashni bekor qilish' : 'Tepaga qadash'}
                                className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-sm transition-colors"
                              >
                                {session.isPinned ? <PinOff className="w-3 h-3" /> : <Pin className="w-3 h-3" />}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleStartRename(session, e)}
                                title="Nomini o‘zgartirish"
                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-sm transition-colors"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSessionToDelete(session.id);
                                }}
                                title="O‘chirish"
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-sm transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Delete Confirmation Modal Overlay inside Sidebar */}
        {sessionToDelete && (
          <div
            id="delete-session-confirmation"
            className="p-3 m-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 animate-in fade-in"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-rose-950">Sessiyani o‘chirishni tasdiqlaysizmi?</p>
                <p className="text-[11px] text-rose-700 mt-0.5">
                  Bu konsultatsiya xabarlari va xulosalari mahalliy xotiradan butunlay o‘chiriladi.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      onDeleteSession(sessionToDelete);
                      setSessionToDelete(null);
                    }}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-[11px] font-semibold cursor-pointer"
                  >
                    Ha, o‘chirilsin
                  </button>
                  <button
                    onClick={() => setSessionToDelete(null)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-[11px] cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer: Export / Import / LocalStorage Info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <button
              id="export-sessions-btn"
              onClick={handleExportJson}
              title="Barcha sessiyalarni JSON fayl sifatida yuklab olish"
              className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md transition-colors"
            >
              <Download className="w-3 h-3 text-slate-500" />
              <span>Eksport</span>
            </button>

            <label
              id="import-sessions-label"
              title="Oldingi sessiyalar zaxira nusxasini import qilish"
              className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md transition-colors cursor-pointer"
            >
              <Upload className="w-3 h-3 text-slate-500" />
              <span>Import</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>

          {onClearAllSessions && sessions.length > 1 && (
            <button
              id="clear-all-sessions-btn"
              onClick={() => {
                if (window.confirm('Haqiqatan ham barcha konsultatsiya sessiyalarini tozalab tashlamoqchimisiz?')) {
                  onClearAllSessions();
                }
              }}
              title="Barchasini tozalash"
              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
