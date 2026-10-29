import { PERSONAL_INFO } from '../data/portfolioData';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  source?: 'llm' | 'rag';
}

const SYSTEM_PROMPT = `You are "Mohit's Neural Twin", the official AI representative and interactive career co-pilot for Mohit Sharma, an elite AI Systems & Computer Vision Engineer.

Your job is to answer queries about Mohit's background, production systems, research, technical stack, metrics, case studies, and career availability with technical depth, precision, and confidence.

KEY FACTS ABOUT MOHIT SHARMA:
- Current Role: AI Developer at Sodio Technologies (developing low-latency computer vision backends, edge telematics, and deterministic LLM agents).
- Flagship Computer Vision Achievement: Scaled clinical dermatology inference pipeline to 5,000+ images/day with strict P95 latency < 120ms using PyTorch, TensorRT, and dynamic micro-batching.
- Registered Government Copyright: Government of India Software Copyright SW-19841/2024 for "Driver Drowsiness Detection System" running offline on Raspberry Pi 4B (ARM architecture, Dlib 68-point 3D facial landmarks, EAR 0.21-0.24 thresholding).
- Prior Tenures: Centilytics (Cloud Cost Intelligence & telemetry automation), Hairscope AI (Lead Computer Vision).
- Education: B.Tech in Artificial Intelligence & Data Science (Batch 2021-2025) and M.Tech in Computer Science.
- Core Technical Stack: Python, C++, CUDA, PyTorch, TensorRT, ONNX Runtime, OpenCV, Dlib, FastAPI, Docker, ChromaDB, LangChain, Git.
- Location & Availability: Based in India. Actively open to high-impact AI Engineering, Computer Vision, and MLOps opportunities worldwide (Remote, Hybrid, or On-site).
- Direct Contact: Email: mohitsharma1214.dev@gmail.com | Portfolio: https://mohitsharma.is-a.dev/

GUIDELINES:
- Keep answers concise, articulate, and technically grounded.
- When asked about metrics or SLAs, quote real figures (<120ms P95, 5000+ daily images, 0.84 mAP, SW-19841/2024).
- Speak with technical authority, directness, and professionalism.`;

// Local RAG Knowledge Matcher for 100% zero-fail fallback
function getLocalRagResponse(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes('latency') || q.includes('120ms') || q.includes('fast') || q.includes('sla') || q.includes('throughput')) {
    return `Mohit engineered a clinical computer vision inference backend processing **5,000+ daily images** with a verified **P95 latency of <120ms**. 

Key architectural optimizations:
1. **Model Optimization**: Graph fusion and FP16 quantization using TensorRT and ONNX Runtime.
2. **Dynamic Micro-Batching**: Grouped single requests arriving within a 15ms window into parallelized GPU micro-batches, lifting GPU utilization from 32% to 84%.
3. **Asynchronous Architecture**: Decoupled IO-bound image validation with FastAPI workers from CUDA execution streams.`;
  }

  if (q.includes('copyright') || q.includes('ip') || q.includes('19841') || q.includes('drowsiness') || q.includes('patent') || q.includes('raspberry')) {
    return `Mohit holds registered **Government of India Software Copyright (Registration No: SW-19841/2024)** for his *Driver Drowsiness Detection System*.

Key highlights:
- **Zero-Cloud Edge Hardware**: Fully autonomous real-time telematics running locally on an ARM Raspberry Pi 4B.
- **Ocular Geometry**: Computes 3D facial landmarks using Dlib to calculate the Eye Aspect Ratio (EAR).
- **Transient vs True Drowsiness**: Accurately distinguishes involuntary blinking (<250ms dip) from prolonged micro-sleep (>1.5s) with a 0.21–0.24 EAR threshold.`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('tool') || q.includes('language')) {
    return `Mohit's core engineering stack covers research through edge production:
- **Languages & CUDA**: Python, C++, CUDA, SQL
- **Deep Learning & CV**: PyTorch, TensorRT, ONNX Runtime, OpenCV, Dlib, YOLOv8, Instance Segmentation (0.84 mAP)
- **Production Backends**: FastAPI, Docker, Micro-batching queues, Linux kernel tuning
- **LLMs & Retrieval**: LangChain, ChromaDB (Vector HNSW index), Pydantic Guardrails, Deterministic JSON schemas`;
  }

  if (q.includes('job') || q.includes('hire') || q.includes('role') || q.includes('available') || q.includes('contact') || q.includes('email')) {
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

  // Default intelligent response
  return `Mohit is an AI Developer specializing in production computer vision backends, edge telematics on Raspberry Pi, and deterministic LLM pipelines. 

He scaled clinical inference to **5,000+ daily images at <120ms P95**, holds registered **Govt. Copyright SW-19841/2024**, and works with **PyTorch, TensorRT, CUDA, and FastAPI**.

What specific technical area would you like to explore (e.g. Latency SLAs, Edge Hardware, LLM Guardrails, or Work Experience)?`;
}

/**
 * Send a message to the free LLM API (Pollinations AI) with automatic RAG fallback.
 */
export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string
): Promise<{ text: string; source: 'llm' | 'rag' }> {
  // 1. Prepare message payload for the LLM
  const messagesPayload = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: 'user', content: newMessage },
  ];

  try {
    // Attempt free Pollinations AI endpoint with 8s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8500);

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messagesPayload,
        model: 'mistral',
        temperature: 0.65,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const text = await response.text();
      if (text && text.trim().length > 0) {
        return { text: text.trim(), source: 'llm' };
      }
    }
  } catch (err) {
    console.warn('Pollinations free LLM unreachable, activating embedded RAG engine:', err);
  }

  // 2. Seamless RAG Fallback (Zero-Fail guarantee)
  const ragText = getLocalRagResponse(newMessage);
  return { text: ragText, source: 'rag' };
}
