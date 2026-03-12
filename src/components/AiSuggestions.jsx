import React, { useState, useCallback, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

const AiSuggestions = ({ data }) => {
  const [suggestions, setSuggestions] = useState(() => {
    return localStorage.getItem("spendora_ai_cache") || "";
  });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceType, setVoiceType] = useState("female"); // State for gender version

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // --- Voice Selection Logic (Mobile Software Component) ---
  const speakAdvice = () => {
    if (!suggestions) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(suggestions);
    const voices = window.speechSynthesis.getVoices();

    // Logic to find a specific voice based on common OS naming conventions
    const selectedVoice = voices.find((v) => {
      if (voiceType === "male") {
        return (
          v.name.includes("Male") ||
          v.name.includes("David") ||
          v.name.includes("Guy") ||
          v.name.includes("Google US English Male")
        );
      } else {
        return (
          v.name.includes("Female") ||
          v.name.includes("Zira") ||
          v.name.includes("Google UK English Female") ||
          v.name.includes("Samantha")
        );
      }
    });

    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Ensure voices are loaded early (Asynchronous behavior in browsers)
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const fetchAiAdvice = useCallback(async () => {
    if (!data || Object.keys(data).length === 0) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post(API_PATHS.AI.GET_SUGGESTIONS, data);
      const newAdvice = res.data.suggestions;
      setSuggestions(newAdvice);
      localStorage.setItem("spendora_ai_cache", newAdvice);
      setCooldown(60);
    } catch (err) {
      console.error("AI Error:", err);
      if (err.response?.status === 429) {
        setSuggestions("Daily quota reached. Check back tomorrow!");
        setCooldown(3600);
      } else {
        setSuggestions("Connection dropped. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="p-4 bg-linear-to-r from-violet-50 to-white rounded-2xl border border-violet-100 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-primary flex items-center gap-2">
          ✨ Spendora Ai
        </h3>

        {/* Voice Version Selector */}
        <div className="flex bg-violet-100 rounded-lg p-1 gap-1 border border-violet-200">
          <button
            onClick={() => setVoiceType("female")}
            className={`text-[9px] px-2 py-1 rounded transition-all ${voiceType === "female" ? "bg-white shadow-sm text-primary font-bold" : "text-gray-500"}`}
          >
            👩 Female
          </button>
          <button
            onClick={() => setVoiceType("male")}
            className={`text-[9px] px-2 py-1 rounded transition-all ${voiceType === "male" ? "bg-white shadow-sm text-primary font-bold" : "text-gray-500"}`}
          >
            👨 Male
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end gap-2">
        <div className="flex-1">
          {loading ? (
            <div className="space-y-2">
              <div className="h-2 w-3/4 bg-violet-200 animate-pulse rounded"></div>
              <div className="h-2 w-1/2 bg-violet-100 animate-pulse rounded"></div>
            </div>
          ) : (
            <p className="text-xs text-gray-600 italic whitespace-pre-line leading-relaxed">
              {suggestions || "Ready to analyze your February 2026 spending."}
            </p>
          )}
        </div>

        {/* Main Voice Trigger */}
        {suggestions && !loading && (
          <button
            onClick={speakAdvice}
            className={`text-[10px] p-2 rounded-full transition-all shadow-sm flex items-center justify-center ${
              isSpeaking
                ? "bg-red-500 text-white animate-pulse"
                : "bg-primary text-white hover:bg-violet-700"
            }`}
          >
            {isSpeaking ? "🛑" : "🔊"}
          </button>
        )}
      </div>

      <button
        onClick={fetchAiAdvice}
        disabled={loading || cooldown > 0}
        className="mt-3 text-[10px] font-medium text-primary hover:text-violet-700 transition-colors disabled:text-gray-400 flex items-center gap-1"
      >
        <span className={loading ? "animate-spin" : ""}>
          {loading ? "⏳" : "🔄"}
        </span>
        {loading
          ? "Syncing..."
          : cooldown > 0
            ? `Wait ${cooldown}s`
            : "Refresh Advice"}
      </button>
    </div>
  );
};

export default AiSuggestions;
