import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Minus, Square, X, Folder, ChevronRight } from 'lucide-react';
import type { SectionId } from '../../types';

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectSection?: (id: SectionId) => void;
}

export default function TerminalWindow({ isOpen, onToggle, onSelectSection }: TerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [outputLogs, setOutputLogs] = useState<Array<{ cmd?: string; text: string; isError?: boolean }>>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputLogs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    setInputVal('');

    if (lower === 'clear' || lower === 'cls') {
      setOutputLogs([]);
      return;
    }

    if (lower === 'help') {
      setOutputLogs((prev) => [
        ...prev,
        {
          cmd: trimmed,
          text:
            "COMMANDS:\n" +
            "  whoami            - Print identity & callsign\n" +
            "  cat about_me.txt  - Print engineering bio & focus\n" +
            "  ls -la            - List all portfolio directories\n" +
            "  cd <section>      - Navigate (projects, experience, skills, education, contact)\n" +
            "  ./resume.sh       - View Darshan's verified credentials\n" +
            "  clear             - Clear terminal screen",
        },
      ]);
      return;
    }

    if (lower === 'whoami') {
      setOutputLogs((prev) => [
        ...prev,
        { cmd: trimmed, text: "darshan_sp (Predator007)" },
      ]);
      return;
    }

    if (lower.startsWith('cat about_me') || lower.startsWith('cat about')) {
      setOutputLogs((prev) => [
        ...prev,
        {
          cmd: trimmed,
          text:
            "> Software Engineer\n" +
            "> AI/ML • Backend • Full-Stack\n" +
            "> Building real-world, scalable systems\n" +
            "> Passionate about AI, Systems & Performance",
        },
      ]);
      return;
    }

    if (lower.startsWith('ls')) {
      setOutputLogs((prev) => [
        ...prev,
        {
          cmd: trimmed,
          text:
            "projects/\n" +
            "experience/\n" +
            "skills/\n" +
            "education/\n" +
            "contact/",
        },
      ]);
      return;
    }

    if (lower.startsWith('cd ')) {
      const target = lower.replace('cd ', '').replace('/', '').trim() as SectionId;
      if (['projects', 'experience', 'skills', 'about', 'education', 'contact'].includes(target)) {
        setOutputLogs((prev) => [
          ...prev,
          { cmd: trimmed, text: `Opening ${target}/ destination...` },
        ]);
        if (onSelectSection) onSelectSection(target);
      } else {
        setOutputLogs((prev) => [
          ...prev,
          { cmd: trimmed, text: `bash: cd: ${target}: No such directory`, isError: true },
        ]);
      }
      return;
    }

    if (lower === './resume.sh' || lower === 'cat experience.txt') {
      setOutputLogs((prev) => [
        ...prev,
        {
          cmd: trimmed,
          text:
            "DARSHAN SP — Software Engineer\n" +
            "• TechCrafter.cps: AI-Assisted HTS Tariff RAG (BM25 + RRF, 4500+ pages)\n" +
            "• Quation Solutions: YOLOv8 & CSRNet real-time crowd analytics on Azure GPU VMs\n" +
            "• Certified: Stanford Supervised ML, Red Hat RHCSA EX200",
        },
      ]);
      return;
    }

    // Default unknown
    setOutputLogs((prev) => [
      ...prev,
      { cmd: trimmed, text: `bash: ${trimmed}: command not found. Type 'help' for available commands.`, isError: true },
    ]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 sm:left-6 z-20 cyber-glass-purple px-3 py-1.5 rounded-lg text-xs font-mono text-pink-400 hover:text-white flex items-center gap-2 border border-purple-500/40 shadow-neon-purple cursor-pointer transition-all"
      >
        <Terminal className="w-3.5 h-3.5" />
        <span>Open Terminal [TAB]</span>
      </button>
    );
  }

  return (
    <div className="absolute top-4 left-4 sm:left-6 z-30 w-[92vw] sm:w-[380px] md:w-[440px] max-h-[82vh] flex flex-col rounded-2xl cyber-glass-purple border border-purple-500/50 shadow-neon-purple backdrop-blur-xl transition-all">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/40 border-b border-purple-500/30 rounded-t-2xl select-none">
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggle}
            className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 border border-red-300 cursor-pointer shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-transform hover:scale-110"
            title="Close Terminal"
          />
          <button
            onClick={onToggle}
            className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-400 border border-amber-300 cursor-pointer transition-transform hover:scale-110"
            title="Minimize"
          />
          <button
            className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 border border-emerald-400"
            title="Terminal Active"
          />
          <span className="ml-2 font-mono text-xs text-gray-200 flex items-center gap-1.5 font-bold">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            darshan@portfolio: ~
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-gray-400">
          <button
            onClick={onToggle}
            className="p-1 hover:text-white rounded hover:bg-purple-900/40 cursor-pointer transition-colors"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:text-red-400 rounded hover:bg-red-950/40 cursor-pointer transition-colors"
            title="Close Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 overflow-y-auto max-h-[55vh] font-mono text-xs text-gray-200 space-y-3 leading-relaxed">
        {/* Default initial commands from user's sketch */}
        <div>
          <div className="flex items-center text-emerald-400 font-semibold gap-1.5">
            <span className="text-pink-400">$</span> whoami
          </div>
          <div className="text-gray-300 pl-3 pt-0.5">darshan_sp (Predator007)</div>
        </div>

        <div>
          <div className="flex items-center text-emerald-400 font-semibold gap-1.5">
            <span className="text-pink-400">$</span> cat about_me.txt
          </div>
          <div className="text-cyan-200/90 pl-3 pt-0.5 space-y-0.5">
            <div>&gt; Software Engineer</div>
            <div>&gt; AI/ML • Backend • Full-Stack</div>
            <div>&gt; Building real-world, scalable systems</div>
            <div>&gt; Passionate about AI, Systems & Performance</div>
          </div>
        </div>

        <div>
          <div className="flex items-center text-emerald-400 font-semibold gap-1.5">
            <span className="text-pink-400">$</span> ls -la
          </div>
          <div className="pl-3 pt-1 grid grid-cols-1 gap-1 text-yellow-300/90">
            {(['projects', 'experience', 'skills', 'education', 'contact'] as SectionId[]).map((dir) => (
              <button
                key={dir}
                onClick={() => onSelectSection && onSelectSection(dir)}
                className="flex items-center gap-2 hover:text-cyan-300 transition-colors text-left cursor-pointer group"
              >
                <Folder className="w-3.5 h-3.5 text-yellow-400 group-hover:text-cyan-400" />
                <span className="group-hover:underline">{dir}/</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic User Command History */}
        {outputLogs.map((log, idx) => (
          <div key={idx} className="space-y-1">
            {log.cmd && (
              <div className="flex items-center text-emerald-400 font-semibold gap-1.5">
                <span className="text-pink-400">$</span> {log.cmd}
              </div>
            )}
            <pre className={`whitespace-pre-wrap pl-3 ${log.isError ? 'text-red-400' : 'text-gray-200'}`}>
              {log.text}
            </pre>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Interactive Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center px-3.5 py-2.5 bg-black/50 border-t border-purple-500/30 rounded-b-2xl gap-2 font-mono text-xs"
      >
        <span className="text-emerald-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command (e.g. 'help', 'cd projects', './resume.sh')..."
          className="flex-1 bg-transparent border-none outline-none text-cyan-200 placeholder-gray-500 font-mono text-xs"
          autoFocus
        />
        <button
          type="submit"
          className="px-2 py-0.5 rounded bg-purple-600/30 text-purple-300 border border-purple-500/40 text-[10px] hover:bg-purple-600/50"
        >
          EXEC
        </button>
      </form>
    </div>
  );
}
