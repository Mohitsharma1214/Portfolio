import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Minus, 
  Copy, 
  Check,
  Settings,
  Key,
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { ChatMessage, LlmProvider } from '../services/aiChatService';
import { 
  sendChatMessage, 
  getStoredLlmConfig, 
  saveStoredLlmConfig, 
  clearStoredLlmConfig,
  testLlmConnection,
  PROVIDER_LABELS,
  DEFAULT_MODELS
} from '../services/aiChatService';

export const MohitNeuralTwinChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // LLM Config state
  const [currentConfig, setCurrentConfig] = useState(getStoredLlmConfig());
  const [inputApiKey, setInputApiKey] = useState(currentConfig.apiKey);
  const [selectedProvider, setSelectedProvider] = useState<LlmProvider>(currentConfig.provider);
  const [showKeyText, setShowKeyText] = useState(false);
  const [testStatus, setTestStatus] = useState<{ testing: boolean; success?: boolean; message?: string }>({
    testing: false,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **Mohit's Neural Twin** — an interactive AI agent representing Mohit Sharma.\n\nAsk me about his **<120ms P95 latency architecture**, **Govt. Copyright SW-19841/2024**, or full-time career availability!\n\n*(💡 To enable live, unrestricted LLM generation powered by Llama 3.3 70B or Gemini, click the **⚙️ Settings** icon in the header and paste a free API key!)*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'grounded-rag',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPromptHint, setShowPromptHint] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sync config when modal opens
  useEffect(() => {
    if (isOpen) {
      const cfg = getStoredLlmConfig();
      setCurrentConfig(cfg);
      setInputApiKey(cfg.apiKey);
      setSelectedProvider(cfg.provider);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isSettingsOpen) {
      scrollToBottom();
      setShowPromptHint(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping, isSettingsOpen]);

  // Hide hint bubble after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPromptHint(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(messages, text.trim());
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source,
        providerName: response.providerName,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered a brief latency hiccup. Please ask again or reach out to Mohit at mohitsharma1214.dev@gmail.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'grounded-rag',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!inputApiKey.trim()) {
      clearStoredLlmConfig();
      setCurrentConfig(getStoredLlmConfig());
      setTestStatus({ testing: false, success: false, message: 'API key cleared. System will use grounded knowledge.' });
      return;
    }

    setTestStatus({ testing: true });
    const result = await testLlmConnection(selectedProvider, inputApiKey.trim());
    setTestStatus({ testing: false, success: result.success, message: result.message });

    if (result.success) {
      saveStoredLlmConfig(selectedProvider, inputApiKey.trim(), DEFAULT_MODELS[selectedProvider]);
      setCurrentConfig(getStoredLlmConfig());
      setTimeout(() => setIsSettingsOpen(false), 1200);
    }
  };

  const handleClearSettings = () => {
    clearStoredLlmConfig();
    setInputApiKey('');
    setCurrentConfig(getStoredLlmConfig());
    setTestStatus({ testing: false, success: true, message: 'Settings reset to default.' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Chat history cleared. What technical topic would you like to explore regarding Mohit Sharma?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'grounded-rag',
      },
    ]);
  };

  const promptSuggestions = [
    'Top Computer Vision Projects',
    'How does he achieve <120ms P95 latency?',
    'Govt. Copyright SW-19841/2024 Details',
    'Is Mohit open to new roles?',
  ];

  const hasLiveKey = Boolean(currentConfig.apiKey && currentConfig.apiKey.length > 5);

  return (
    <aside aria-label="AI Chat Assistant">
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        {/* Animated hint callout */}
        <AnimatePresence>
          {showPromptHint && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-slate-900/95 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl border border-blue-500/40 shadow-xl cursor-pointer text-xs font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Ask Mohit's Neural Twin</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3 sm:px-4 sm:py-3 rounded-full bg-slate-950 text-white border border-blue-500/50 shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:border-cyan-400 transition-all flex items-center gap-2.5 cursor-pointer ring-1 ring-white/20"
          title="Open Mohit's Neural Twin AI Chatbot"
        >
          {/* Glowing pulse rings */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 blur-sm opacity-40 group-hover:opacity-80 transition-opacity -z-10" />

          {/* Bot Avatar Icon */}
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
            {isOpen ? <X className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="font-display font-black text-xs uppercase tracking-wider text-white leading-tight">
              Mohit's Neural Twin
            </span>
            <span className="text-[10px] font-mono text-cyan-300 leading-none flex items-center gap-1 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${hasLiveKey ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400 animate-pulse'} inline-block`} />
              {hasLiveKey ? `${PROVIDER_LABELS[currentConfig.provider].split(' ')[0]} Active` : 'AI Copilot Ready'}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[82vh] rounded-3xl bg-[#030712]/95 backdrop-blur-2xl border border-blue-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10 flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0 ring-1 ring-white/20">
                  MS
                </div>
                <div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-white flex items-center gap-1.5 leading-tight">
                    <span>Mohit's Neural Twin</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h3>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${hasLiveKey ? 'bg-emerald-400' : 'bg-cyan-400'} animate-pulse`} />
                    <span>
                      {hasLiveKey 
                        ? `Live LLM &bull; ${PROVIDER_LABELS[currentConfig.provider]}` 
                        : 'Interactive RAG &bull; LLM Ready'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  title="Configure LLM API Key (Groq / Gemini)"
                  className={`p-1.5 rounded-lg transition-colors ${
                    isSettingsOpen ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={clearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* In-Modal Settings Drawer */}
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-950/95 border-b border-blue-500/20 p-4 text-xs font-mono space-y-3.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                      LLM Engine Configuration
                    </span>
                    <span className="text-[10px] text-slate-400">100% Client-Side Storage</span>
                  </div>

                  {/* Provider Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Select Free LLM Provider
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['groq', 'gemini', 'openrouter'] as LlmProvider[]).map((prov) => (
                        <button
                          key={prov}
                          type="button"
                          onClick={() => setSelectedProvider(prov)}
                          className={`py-1.5 px-2 rounded-lg border text-[11px] font-sans font-medium text-center transition-all ${
                            selectedProvider === prov
                              ? 'bg-blue-600/30 border-blue-500 text-white shadow-xs'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {prov === 'groq' ? 'Groq (70B)' : prov === 'gemini' ? 'Gemini' : 'OpenRouter'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* API Key Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {selectedProvider.toUpperCase()} API Key
                      </label>
                      <a
                        href={
                          selectedProvider === 'groq'
                            ? 'https://console.groq.com/keys'
                            : selectedProvider === 'gemini'
                            ? 'https://aistudio.google.com/apikey'
                            : 'https://openrouter.ai/keys'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Get free key</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type={showKeyText ? 'text' : 'password'}
                        value={inputApiKey}
                        onChange={(e) => setInputApiKey(e.target.value)}
                        placeholder={
                          selectedProvider === 'groq'
                            ? 'gsk_...'
                            : selectedProvider === 'gemini'
                            ? 'AIzaSy...'
                            : 'sk-or-...'
                        }
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg pl-3 pr-8 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKeyText(!showKeyText)}
                        className="absolute right-2 text-slate-400 hover:text-white"
                        title={showKeyText ? 'Hide key' : 'Show key'}
                      >
                        {showKeyText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Status / Feedback message */}
                  {testStatus.message && (
                    <div
                      className={`p-2 rounded-lg text-[11px] flex items-center gap-2 ${
                        testStatus.success
                          ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                          : 'bg-red-950/60 border border-red-500/30 text-red-300'
                      }`}
                    >
                      {testStatus.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                      )}
                      <span className="truncate">{testStatus.message}</span>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      disabled={testStatus.testing}
                      className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {testStatus.testing ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Test & Save Key</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleClearSettings}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-sans">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Tag */}
                  <div className="text-[10px] font-mono text-slate-400 mb-1 px-1 flex items-center gap-1.5">
                    <span>{msg.role === 'user' ? 'You' : "Mohit's Twin"}</span>
                    <span>&bull;</span>
                    <span>{msg.timestamp}</span>
                    {msg.source && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase tracking-wider ${
                          msg.source === 'llm'
                            ? 'bg-blue-900/60 border border-blue-500/40 text-cyan-300 font-bold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {msg.source === 'llm' ? (msg.providerName || 'Live LLM') : 'Grounded RAG'}
                      </span>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl relative group ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs shadow-md'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-xs shadow-lg leading-relaxed'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">{msg.content}</div>

                    {/* Copy Button for Assistant responses */}
                    {msg.role === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="absolute bottom-2 right-2 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-300" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Loader */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl rounded-tl-xs max-w-[75%]">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {hasLiveKey ? 'Generating neural response with LLM...' : 'Consulting grounded knowledge...'}
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Fast Suggested Queries Strip */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/80 overflow-x-auto [scrollbar-width:none]">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                {promptSuggestions.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 hover:bg-blue-600/30 border border-slate-800 hover:border-blue-400 text-slate-300 hover:text-white transition-all shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3.5 border-t border-slate-800/90 bg-slate-900/90 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Mohit's systems, code, or metrics..."
                disabled={isTyping}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white disabled:opacity-40 hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
