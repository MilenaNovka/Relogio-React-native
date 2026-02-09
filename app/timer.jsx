import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';

export default function Timer() {
  const DURATION_SECONDS = 10;
  const DURATION_MS = DURATION_SECONDS * 1000;

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION_MS);
  const [key, setKey] = useState(0); 

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        const remaining = DURATION_MS - elapsed;

        if (remaining <= 0) {
          handleReset();
        } else {
          setTimeLeft(remaining);
        }
      }, 10);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  function Start() {
    if (isRunning) return;
    setIsRunning(true); // alterna entre ligado/desligado
    startTimeRef.current = Date.now() - (DURATION_MS - timeLeft);
  }

  function Pause() {
    setIsRunning(false); // alterna entre ligado/desligado
    clearInterval(intervalIdRef.current);
  }

  function Reset() {
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
    setTimeLeft(DURATION_MS);
    setKey(prev => prev + 1); // círculo a voltar ao início
  }

  function formatTime() {
    const seconds = Math.ceil(timeLeft / 1000);
    return seconds;
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Timer</Text>
      
      <View style={s.tempo}>
        <CountdownCircleTimer
          key={key}
          isPlaying={isRunning}
          duration={10}
          initialRemainingTime={timeLeft / 1000}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[10, 6, 3, 0]}
          size={250}
          strokeWidth={9}
        >
          {() => (
            <Text style={s.timerText}>{formatTime()}</Text>
          )}
        </CountdownCircleTimer>

        <View style={s.controls}>
          {/* Reset */}
          <TouchableOpacity style={s.button} onPress={Reset}>
            <FontAwesome6 name="arrow-rotate-right" size={28} color="#ACC1D3" />
          </TouchableOpacity>

          {/* Play/Pause */}
          <TouchableOpacity 
            style={s.button} 
            onPress={isRunning ? Pause : Start}
          > 
            <MaterialIcons 
              name={isRunning ? "pause" : "play-arrow"} 
              size={48} 
              color="#ACC1D3" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A3953'
  },
  title: {
    color: '#ACC1D3',
    fontSize: 40,
    marginBottom: 80,
    letterSpacing: 1,
  },
  tempo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 80
  },
  button: {
    width: 100,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#3D5F7E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 60,
    fontWeight: '500',
    color: '#ACC1D3'
  }
});