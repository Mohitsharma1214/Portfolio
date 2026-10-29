import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Minus, 
  Copy, 
  Check 
} from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { ChatMessage } from '../services/aiChatService';
import { sendChatMessage } from '../services/aiChatService';
import { notifyAiChatActivity } from '../services/visitorTelemetryService';

/**
 * High-performance, secure Markdown renderer for chat assistant bubbles.
 * Parses bold, italics, code blocks, lists, and links while sanitizing HTML.
 */
const ChatMarkdownMessage: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedHtml = useMemo(() => {
    try {
      const rawHtml = marked.parse(content, { 
        gfm: true, 
        breaks: true 
      }) as string;

      return DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['target', 'rel', 'class'],
      });
    } catch {
      return content;
    }
  }, [content]);

  return (
    <div
      className="chat-markdown text-slate-200 leading-relaxed text-xs"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export const MohitNeuralTwinChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **Mohit's Neural Twin** — an interactive AI agent trained on Mohit Sharma's production systems, research, and technical credentials.\n\nAsk me anything about his **<120ms P95 latency architecture**, registered **Govt. Copyright SW-19841/2024**, or full-time career availability!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'llm',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPromptHint, setShowPromptHint] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowPromptHint(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

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
      };
      setMessages((prev) => [...prev, botMessage]);

      // Instantly notify Mohit on Telegram regarding visitor query or contact lead
      const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
      const isLead = hasEmail || /contact|hire|interview|reach out|email me|schedule|call|phone|leave a message/i.test(text);
      notifyAiChatActivity({
        userQuery: text.trim(),
        botReply: response.text,
        isLead,
      });
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered a brief latency hiccup. Please ask again or reach out to Mohit at mohitsharma1214.dev@gmail.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'llm',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
        source: 'llm',
      },
    ]);
  };

  const promptSuggestions = [
    'Leave a message for Mohit 📬',
    'Top Computer Vision Projects',
    'How does he achieve <120ms P95 latency?',
    'Govt. Copyright SW-19841/2024 Details',
    'Is Mohit open to new roles?',
  ];

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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              AI Copilot Online
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
            className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 z-50 w-auto sm:w-[420px] h-[580px] max-h-[82dvh] rounded-3xl bg-[#030712]/95 backdrop-blur-2xl border border-blue-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10 flex flex-col overflow-hidden text-white"
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
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AI Copilot &bull; Production Knowledge</span>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
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
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl relative group ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs shadow-md'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-xs shadow-lg leading-relaxed'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                    ) : (
                      <ChatMarkdownMessage content={msg.content} />
                    )}

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
                    Synthesizing response...
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
