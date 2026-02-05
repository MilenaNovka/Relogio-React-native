import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Cronometro() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <View style={s.container}>
      <View style={s.stopwatch}>
        <Text style={s.display}>{formatTime()}</Text>

        <View style={s.controls}>
          <TouchableOpacity style={[s.button, s.start]} onPress={start}>
            <Text style={s.buttonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.button, s.stop]} onPress={stop}>
            <Text style={s.buttonText}>Stop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.button, s.reset]} onPress={reset}>
            <Text style={s.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    
  },
  stopwatch: {
    
  },
  display: {
    
  },
  controls: {

  },
  button: {

  },
  start: {

  },
  buttonText: {

  },
  stop: {

  },
  reset: {

  }
  
});