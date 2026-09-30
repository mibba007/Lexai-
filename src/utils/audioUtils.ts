// Audio playback and recording utilities for LEXAI UZ

export async function playGeminiAudio(base64Audio: string, sampleRate = 24000) {
  try {
    const binary = atob(base64Audio);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate,
    });

    // Check if it's raw 16-bit PCM (little endian)
    const pcm16 = new Int16Array(bytes.buffer);
    const audioBuffer = audioCtx.createBuffer(1, pcm16.length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < pcm16.length; i++) {
      channelData[i] = pcm16[i] / 32768.0;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();

    return new Promise((resolve) => {
      source.onended = () => {
        audioCtx.close();
        resolve(true);
      };
    });
  } catch (err) {
    console.error('Error playing raw PCM, trying blob fallback', err);
    return false;
  }
}

export function speakBrowserTTS(text: string, lang = 'uz-UZ') {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_`]/g, '').slice(0, 300));
  utterance.lang = lang;
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}
