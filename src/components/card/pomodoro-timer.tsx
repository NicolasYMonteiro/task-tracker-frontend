'use client';

import { useEffect, useState } from 'react';
import { FaPause, FaPlay, FaRedo } from 'react-icons/fa';

const PomodoroTimer = () => {
  const [sessionLength, setSessionLength] = useState(50);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (onBreak) {
              setOnBreak(false);
              return sessionLength * 60;
            } else {
              setOnBreak(true);
              setSessionCount((c) => c + 1);
              return breakLength * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, sessionLength, breakLength, onBreak]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setIsRunning(false);
    setOnBreak(false);
    setTimeLeft(sessionLength * 60);
  };

  const adjustSession = (amount: number) => {
    const newLength = Math.max(1, sessionLength + amount);
    setSessionLength(newLength);
    if (!onBreak) setTimeLeft(newLength * 60);
  };

  const adjustBreak = (amount: number) => {
    const newLength = Math.max(1, breakLength + amount);
    setBreakLength(newLength);
    if (onBreak) setTimeLeft(newLength * 60);
  };

  return (
    <div className="w-full h-fit z-10 mx-auto mt-10 p-6 bg-white rounded-3xl shadow-md border border-blue-700 text-center">
      <h1 className="text-2xl font-bold text-blue-600">Temporizador Pomodoro</h1>
      <p className="text-gray-500 mb-4">Concentre-se no seu trabalho e não se distraia por apenas  {sessionLength} minutos</p>

      <div className="bg-blue-500 text-white rounded-full w-48 h-48 mx-auto flex flex-col justify-center items-center text-4xl font-semibold relative">
        <span className="text-2xl font bold text-white/90 absolute top-6">{onBreak ? 'Descansar' : 'Focar'}</span>
        {formatTime(timeLeft)}
        <div className="flex gap-8 absolute -bottom-2 ">
          <button
            className='bg-white rounded-full p-4 hover:bg-gray-200 border-2 border-blue-700 transition-colors duration-200'
            onClick={toggleTimer}
          >
            {isRunning ? (
              <FaPause className="text-black text-xl" />
            ) : (
              <FaPlay className="text-black text-xl" />
            )}
          </button>
          <button
            className='bg-white rounded-full p-4 hover:bg-gray-200 border-2 border-blue-700 transition-colors duration-200'
            onClick={resetTimer}
          >
            <FaRedo className="text-black text-xl" />
          </button>
        </div>
      </div>

      <p className="mt-6 text-xl text-gray-700 inline-block px-3 py-1 rounded-full">
        {sessionCount}º {onBreak ? 'Sessão de Descanso' : 'Sessão de Trabalho'}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-6 text-base text-gray-700 font-medium">
        <div>
          <p>Tempo de Foco</p>
          <div className="flex items-center justify-center mt-2 gap-4">
            <button
              onClick={() => adjustSession(-1)}
              className="w-8 h-8 text-2xl border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >−</button>
            <p className='text-xl'>{sessionLength}</p>
            <button
              onClick={() => adjustSession(1)}
              className="w-8 h-8  text-2xl border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >＋</button>
          </div>
        </div>
        <div>
          <p>Tempo de Descanso</p>
          <div className="flex items-center justify-center mt-2 gap-4">
            <button
              onClick={() => adjustBreak(-1)}
              className="w-8 h-8  text-2xl border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >−</button>
            <p className='text-xl'> {breakLength}</p>
            <button
              onClick={() => adjustBreak(1)}
              className="w-8 h-8  text-2xl border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >＋</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
