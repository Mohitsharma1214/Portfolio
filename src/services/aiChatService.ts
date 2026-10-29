import { PERSONAL_INFO } from '../data/portfolioData';

export type LlmProvider = 'groq' | 'gemini' | 'openrouter';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  source?: 'llm' | 'grounded-rag';
  providerName?: string;
}

export interface LlmConfig {
  provider: LlmProvider;
  apiKey: string;
  model: string;
}

const STORAGE_KEY_API_KEY = 'mohit_llm_api_key';
const STORAGE_KEY_PROVIDER = 'mohit_llm_provider';
const STORAGE_KEY_MODEL = 'mohit_llm_model';

export const DEFAULT_MODELS: Record<LlmProvider, string> = {
  groq: 'llama-3.3-70b-versatile',
  gemini: 'gemini-1.5-flash',
  openrouter: 'meta-llama/llama-3.3-70b-instruct:free',
};

export const PROVIDER_LABELS: Record<LlmProvider, string> = {
  groq: 'Groq (Llama 3.3 70B)',
  gemini: 'Google Gemini Flash',
  openrouter: 'OpenRouter Free',
};

export function getStoredLlmConfig(): LlmConfig {
  const envGroqKey = import.meta.env.VITE_GROQ_API_KEY || '';
  const envGeminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const envOpenRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';

  const storedProvider = (localStorage.getItem(STORAGE_KEY_PROVIDER) as LlmProvider) || (envGroqKey ? 'groq' : envGeminiKey ? 'gemini' : envOpenRouterKey ? 'openrouter' : 'groq');
  const storedKey = localStorage.getItem(STORAGE_KEY_API_KEY) || (storedProvider === 'groq' ? envGroqKey : storedProvider === 'gemini' ? envGeminiKey : envOpenRouterKey);
  const storedModel = localStorage.getItem(STORAGE_KEY_MODEL) || DEFAULT_MODELS[storedProvider] || DEFAULT_MODELS.groq;

  return {
    provider: storedProvider,
    apiKey: storedKey || '',
    model: storedModel,
  };
}

export function saveStoredLlmConfig(provider: LlmProvider, apiKey: string, model?: string): void {
  localStorage.setItem(STORAGE_KEY_PROVIDER, provider);
  localStorage.setItem(STORAGE_KEY_API_KEY, apiKey.trim());
  localStorage.setItem(STORAGE_KEY_MODEL, model || DEFAULT_MODELS[provider]);
}

export function clearStoredLlmConfig(): void {
  localStorage.removeItem(STORAGE_KEY_PROVIDER);
  localStorage.removeItem(STORAGE_KEY_API_KEY);
  localStorage.removeItem(STORAGE_KEY_MODEL);
}

export const SYSTEM_PROMPT = `You are "Mohit's Neural Twin", the official AI representative and interactive career co-pilot for Mohit Sharma, an elite AI Systems & Computer Vision Engineer.

Your job is to answer queries about Mohit's background, production systems, research, technical stack, metrics, case studies, and career availability with technical depth, precision, and confidence.

KEY FACTS ABOUT MOHIT SHARMA:
- Current Role: AI Developer at Sodio Technologies (developing low-latency computer vision backends, edge telematics, and deterministic LLM agents).
- Flagship Computer Vision Achievement: Scaled clinical dermatology inference pipeline to 5,000+ images/day with strict P95 latency < 120ms using PyTorch, TensorRT, dynamic micro-batching, and FastAPI asynchronous worker queues.
- Registered Government Copyright: Government of India Software Copyright SW-19841/2024 for "Driver Drowsiness Detection System" running offline on Raspberry Pi 4B (ARM architecture, Dlib 68-point 3D facial landmarks, EAR 0.21-0.24 thresholding).
- Prior Tenures: Centilytics (Cloud Cost Intelligence & telemetry automation), Hairscope AI (Lead Computer Vision).
- Education: B.Tech in Artificial Intelligence & Data Science (Batch 2021-2025) and M.Tech in Computer Science.
- Core Technical Stack: Python, C++, CUDA, PyTorch, TensorRT, ONNX Runtime, OpenCV, Dlib, FastAPI, Docker, ChromaDB, LangChain, Git.
- Location & Availability: Based in India. Actively open to high-impact AI Engineering, Computer Vision, and MLOps opportunities worldwide (Remote, Hybrid, or On-site).
- Direct Contact: Email: ${PERSONAL_INFO.email} | Portfolio: https://mohitsharma.is-a.dev/ | GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

GUIDELINES:
- Keep answers direct, technically articulate, and grounded.
- When asked about metrics or SLAs, quote real figures (<120ms P95, 5,000+ daily images, 0.84 mAP, SW-19841/2024).
- Speak with technical authority, precision, and professionalism.`;

// Conversational contextual knowledge engine
function getConversationalGroundedResponse(userQuery: string): string {
  const q = userQuery.toLowerCase().trim();

  // Natural greetings
  if (['hi', 'hello', 'hey', 'greetings', 'yo'].includes(q) || q.startsWith('hi ') || q.startsWith('hello ')) {
    return `Hello! I am **Mohit's Neural Twin**. 

I can answer any questions about Mohit Sharma's production systems, such as his **<120ms P95 latency pipeline**, his **Govt. Copyrighted edge drowsiness system (SW-19841/2024)**, or his current career availability.

*(Tip: You can also connect your own free Groq or Gemini API key in ⚙️ Settings for live streaming LLM generations!)*

What would you like to explore first?`;
  }

  if (q.includes('latency') || q.includes('120ms') || q.includes('fast') || q.includes('sla') || q.includes('throughput')) {
    return `Mohit engineered a clinical computer vision inference backend processing **5,000+ daily images** with a verified **P95 latency of <120ms**. 

**Core Architectural Optimizations**:
1. **Model Optimization**: Graph fusion and FP16 quantization using TensorRT and ONNX Runtime.
2. **Dynamic Micro-Batching**: Grouped single requests arriving within a 15ms window into parallelized GPU micro-batches, lifting GPU utilization from 32% to 84%.
3. **Asynchronous Architecture**: Decoupled IO-bound image validation with FastAPI workers from CUDA execution streams.`;
  }

  if (q.includes('copyright') || q.includes('ip') || q.includes('19841') || q.includes('drowsiness') || q.includes('patent') || q.includes('raspberry')) {
    return `Mohit holds registered **Government of India Software Copyright (Registration No: SW-19841/2024)** for his *Driver Drowsiness Detection System*.

**System Highlights**:
- **Zero-Cloud Edge Hardware**: Fully autonomous real-time telematics running locally on an ARM Raspberry Pi 4B.
- **Ocular Geometry**: Computes 3D facial landmarks using Dlib to calculate the Eye Aspect Ratio (EAR).
- **Distinguishing Micro-Sleep**: Accurately differentiates involuntary blinking (<250ms dip) from prolonged micro-sleep (>1.5s) using an EAR threshold range of 0.21–0.24.`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('tool') || q.includes('language')) {
    return `Mohit's core engineering stack covers deep learning through edge production:
- **Languages & CUDA**: Python, C++, CUDA, SQL
- **Deep Learning & CV**: PyTorch, TensorRT, ONNX Runtime, OpenCV, Dlib, YOLOv8, Instance Segmentation (0.84 mAP)
- **Production Backends**: FastAPI, Docker, Micro-batching queues, Linux kernel tuning
- **LLMs & Retrieval**: LangChain, ChromaDB (Vector HNSW index), Pydantic Guardrails, Deterministic JSON schemas`;
  }

  if (q.includes('job') || q.includes('hire') || q.includes('role') || q.includes('available') || q.includes('contact') || q.includes('email') || q.includes('open')) {
    return `Mohit is **actively open to high-impact full-time AI Engineering, Computer Vision, and MLOps roles** worldwide.

- **Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})
- **LinkedIn**: [linkedin.com/in/mohitsharma1214](${PERSONAL_INFO.linkedin})
- **GitHub**: [github.com/Mohitsharma1214](${PERSONAL_INFO.github})
- **Location**: Based in India; open to remote, hybrid, or on-site relocation.`;
  }

  if (q.includes('project') || q.includes('case stud') || q.includes('work')) {
    return `Mohit has architected several flagship systems:
1. **Clinical Trichology & Vision Backend** (Hairscope AI): Scaled to 5,000+ daily inferences at <120ms P95 latency.
2. **Driver Drowsiness Edge Telematics**: Govt. Copyright SW-19841/2024 deployed on Raspberry Pi.
3. **Industrial Optical Inspection**: Automated microscopic defect segmentation achieving 0.84 mAP.
4. **Deterministic Agent RAG Engine**: Zero-hallucination agent workflow bounded with Pydantic JSON schemas.`;
  }

  if (q.includes('who are you') || q.includes('who is mohit') || q.includes('about')) {
    return `I am **Mohit's Neural Twin**, an interactive AI co-pilot representing Mohit Sharma. 

Mohit is an **AI Systems Specialist and Edge Hardware Architect** delivering low-latency computer vision, ARM edge pipelines, and deterministic LLM architectures. You can ask me about his production metrics, project code, or schedule a discussion!`;
  }

  return `Mohit is an AI Developer specializing in production computer vision backends, edge telematics on Raspberry Pi, and deterministic LLM pipelines. 

He scaled clinical inference to **5,000+ daily images at <120ms P95**, holds registered **Govt. Copyright SW-19841/2024**, and works with **PyTorch, TensorRT, CUDA, and FastAPI**.

To enable unrestricted dynamic completions for any question, click **⚙️ Settings** at the top right to connect a free Groq or Gemini key! What specific technical topic would you like to explore?`;
}

/**
 * Call Groq API (OpenAI-compatible format with native CORS)
 */
async function callGroqApi(
  apiKey: string,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.6,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('Groq returned empty text');
  }
  return text.trim();
}

/**
 * Call Google Gemini API (Native CORS)
 */
async function callGeminiApi(
  apiKey: string,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const activeModel = model || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey}`;

  // Convert chat messages to Gemini contents format
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 600,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini returned empty text');
  }
  return text.trim();
}

/**
 * Call OpenRouter Free API (Native CORS)
 */
async function callOpenRouterApi(
  apiKey: string,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://mohitsharma.is-a.dev',
      'X-Title': "Mohit's Neural Twin",
    },
    body: JSON.stringify({
      model: model || 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.6,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('OpenRouter returned empty text');
  }
  return text.trim();
}

/**
 * Test API key connectivity
 */
export async function testLlmConnection(
  provider: LlmProvider,
  apiKey: string,
  model?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const testMessages = [{ role: 'user', content: 'Say "Connection verified" in 2 words.' }];
    if (provider === 'groq') {
      await callGroqApi(apiKey, model || DEFAULT_MODELS.groq, testMessages);
    } else if (provider === 'gemini') {
      await callGeminiApi(apiKey, model || DEFAULT_MODELS.gemini, testMessages);
    } else if (provider === 'openrouter') {
      await callOpenRouterApi(apiKey, model || DEFAULT_MODELS.openrouter, testMessages);
    }
    return { success: true, message: 'Connected successfully to ' + PROVIDER_LABELS[provider] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: msg };
  }
}

/**
 * Send a chat message: calls configured live LLM (Groq / Gemini / OpenRouter),
 * or falls back to conversational grounded knowledge if no key is set.
 */
export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string
): Promise<{ text: string; source: 'llm' | 'grounded-rag'; providerName?: string }> {
  const config = getStoredLlmConfig();

  // If user or environment has configured an API key, use live LLM
  if (config.apiKey && config.apiKey.trim().length > 5) {
    const recentMessages = history.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    }));
    recentMessages.push({ role: 'user', content: newMessage });

    try {
      let output = '';
      if (config.provider === 'groq') {
        output = await callGroqApi(config.apiKey, config.model, recentMessages);
      } else if (config.provider === 'gemini') {
        output = await callGeminiApi(config.apiKey, config.model, recentMessages);
      } else if (config.provider === 'openrouter') {
        output = await callOpenRouterApi(config.apiKey, config.model, recentMessages);
      }

      if (output && output.trim().length > 0) {
        return {
          text: output.trim(),
          source: 'llm',
          providerName: PROVIDER_LABELS[config.provider] || config.provider,
        };
      }
    } catch (err) {
      console.warn('Live LLM call failed, falling back to grounded knowledge:', err);
    }
  }

  // Fallback: conversational grounded knowledge
  const text = getConversationalGroundedResponse(newMessage);
  return { text, source: 'grounded-rag' };
}
