import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function Cronometro() {
  const [isRunning, setIsRunning] = useState(false); // controla o conometro
  const [elapsedTime, setElapsedTime] = useState(0); // guarda o tempo decorrido, começa em 0

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0); // guarda o momento que o cronometro iniciou

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current); // A cada 10ms, tempo atual - tempo que começou
      }, 10);//        Date.now já traz o tempo em milissegundos
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function Start() { // inicia
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime; //Define o ponto inicial considerando o tempo já decorrido
  }

  function Stop() { // pausa/para
    setIsRunning(false);
  }

  function Reset() { //reinicia
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() { // transforma os milissegundos
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    // coloca 0
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Cronômetro</Text>
      <View style={s.cronometro}>
        <Text style={s.display}>{formatTime()}</Text>

        <View style={s.controls}>
          {/* Reset */}
          <TouchableOpacity style={s.button} onPress={Reset}>
            <FontAwesome6 name="arrow-rotate-right" size={28} color="#ACC1D3" />
          </TouchableOpacity>

          {/* Play/Pause */}
          <TouchableOpacity 
            style={s.button} 
            onPress={isRunning ? Stop : Start}
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
    marginBottom: 120, 
    letterSpacing: 1,
  },
  cronometro: {
    alignItems: 'center',
    width: '100%'
  },
  display: {
    color: '#ACC1D3',
    fontSize: 50,
    fontWeight: '500',
    marginBottom: 80,
    fontVariant: ['tabular-nums'],
    letterSpacing: 3,
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20
  },
  button: {
    width: 110,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#3D5F7E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});