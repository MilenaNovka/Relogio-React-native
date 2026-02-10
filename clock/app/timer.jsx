import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Timer() {

  const [h, setH] = useState("00"); // Hora
  const [m, setM] = useState("00"); // Minuto
  const [s, setS] = useState("10"); // Segundo

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10000); 
  const [iniciar, setIniciar] = useState(0);

  const getTotalSeconds = () => { // serve para transformar o tempo em segundos
    return (parseInt(h || 0) * 3600) + (parseInt(m || 0) * 60) + parseInt(s || 0); // o 0 serve para não ser "copiado" como tmepo
  };//                 1hr tem 3600s                1m tem 60s          

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) { // verifica para iniciar a rodar
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1000, 0)); // diminui 1000ms do numero anterior a cada 1000ms
      }, 1000);
    } else if (timeLeft === 0 && isRunning) { // para a contagem
      Reset();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // calcula os valores para milissegundos
  const syncTime = () => {
    const total = getTotalSeconds();
    setTimeLeft(total * 1000); // multiplica 1000 para trabalhar em milissegundos
    setIniciar(prev => prev + 1); // reiniciar o circulo
  };

  const Start = () => {
    if (getTotalSeconds() === 0) return; // em cado do timer zerado
    syncTime(); 
    setIsRunning(true);
  };

  const Pause = () => setIsRunning(false); // pausa

  const Reset = () => {
    setIsRunning(false); // pausa
    syncTime();          // reinicia para o tempo calculado inicial
  };

  // monta os valores para suas formas originais (em segundos)
  const displayH = Math.floor(timeLeft / 3600000);
  const displayM = Math.floor((timeLeft % 3600000) / 60000);
  const displayS = Math.ceil((timeLeft % 60000) / 1000);

  // serve para mostrar os numeros singulares com 0
  const format = (num) => num.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      
      <View style={styles.tempo}>
        <CountdownCircleTimer
          key={iniciar}
          isPlaying={isRunning}
          duration={getTotalSeconds()}
          initialRemainingTime={timeLeft / 1000}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[
            getTotalSeconds(),          
            getTotalSeconds()/3*2 ,    
            getTotalSeconds()/3 ,    
            0                      
          ]} 
          size={280}
          strokeWidth={10}
        >
          {() => ( // para o circulo
            <View style={styles.containerTotal}>
              {/* HORA */}
              <TextInput
                style={styles.timerInput}
                value={isRunning ? format(displayH) : h}
                onChangeText={setH}
                keyboardType="numeric"
                maxLength={2}
                editable={!isRunning}
                selectTextOnFocus
              />
              <Text style={styles.separator}>:</Text>
              {/* MINUTO */}
              <TextInput
                style={styles.timerInput}
                value={isRunning ? format(displayM) : m}
                onChangeText={setM}
                keyboardType="numeric"
                maxLength={2}
                editable={!isRunning}
                selectTextOnFocus
              />
              <Text style={styles.separator}>:</Text>
              {/* SEGUNDO */}
              <TextInput
                style={styles.timerInput}
                value={isRunning ? format(displayS) : s}
                onChangeText={setS}
                keyboardType="numeric"
                maxLength={2}
                editable={!isRunning}
                selectTextOnFocus
              />
            </View>
          )}
        </CountdownCircleTimer>
        <View style={styles.controls}>
          {/* Reset */}
          <TouchableOpacity style={styles.button} onPress={Reset}>
            <FontAwesome6 name="arrow-rotate-right" size={24} color="#ACC1D3" />
          </TouchableOpacity>
          {/* play e pause */}
          <TouchableOpacity style={styles.button} onPress={isRunning ? Pause : Start}> 
            <MaterialIcons name={isRunning ? "pause" : "play-arrow"} size={45} color="#ACC1D3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#1A3953' 
  },
  title: { 
    color: '#ACC1D3', 
    fontSize: 32,
    marginBottom: 50 
  },
  tempo: {
    alignItems: 'center' 
  },
  containerTotal: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%' 
  },
  timerInput: { 
    fontSize: 45, 
    fontWeight: 'bold', 
    color: '#ACC1D3', 
    textAlign: 'center',
    width: 65, 
  },
  separator: { 
    fontSize: 35, 
    color: '#ACC1D3', 
    fontWeight: 'bold',
    paddingBottom: 5 
  },
  controls: { 
    flexDirection: 'row', 
    gap: 20, 
    marginTop: 60 
  },
  button: { 
    width: 80, 
    height: 55, 
    borderRadius: 20, 
    backgroundColor: '#3D5F7E', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});
