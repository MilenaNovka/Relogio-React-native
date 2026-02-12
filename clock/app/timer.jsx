import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useAudioPlayer } from 'expo-audio';

export default function Timer() {
  const [h, setH] = useState("00"); // hora
  const [m, setM] = useState("00"); // minuto
  const [s, setS] = useState("10"); // segundo

  const [isRunning, setIsRunning] = useState(false); // controla o timer
  const [timeLeft, setTimeLeft] = useState(10); // guarda o tempo restante, usado na subtração
  const [iniciar, setIniciar] = useState(0); // controla o circulo

  const [isModalVisible, setModalVisible] = useState(false); // controla o modal

  const player = useAudioPlayer(require('../assets/sounds/alarm.mp3')) // som do alarme
  if (player) { // usar o som em loop
    player.loop = true;
  }

  const alert = () => { // func para controlar se o modal aparece ou não
    setModalVisible(true);
    player.play();
  };

  const closeModal = () => {
    setModalVisible(false);
    if (player) {
      player.pause(); 
     player.seekTo(0); // Volta o som para o inicio para a próxima vez
    }
  }

  const getTotalSeconds = () => { // transforma horas, minutos e segundos em segundos totais
    return (parseInt(h || 0) * 3600) + (parseInt(m || 0) * 60) + parseInt(s || 0); // parseInt para transformar string em in
  };//                    1h = 3600s                  1m = 60s

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) { // se tiver tempo
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1); // Subtrai 1 segundo por vez
      }, 1000);
    } else if (timeLeft === 0 && isRunning) { // se não tiver tempo
      setIsRunning(false);  // para o timer
      alert() // ativa o aviso de termino do tempo
    }
    return () => clearInterval(timer); // Limpa o intervalo anterior antes de criar outro, evitando múltiplos timers rodando ao mesmo tempo
  }, [isRunning, timeLeft]);

  const syncTime = () => { // sincroniza o tempo digitado com o timer real e reinicia o círculo
    const total = getTotalSeconds();
    setTimeLeft(total); // Sincroniza o valor em segundos
    setIniciar(prev => prev + 1); // inicia o circulo
  };

  const Start = () => { // inicia
    if (getTotalSeconds() === 0) return;
    syncTime(); 
    setIsRunning(true);
  };

  const Pause = () => setIsRunning(false); // pausa

  const Reset = () => { // reinicia
    setIsRunning(false); // para o timer
    syncTime(); // reinicia o tempo
  };

  // transforma nos valores originais
  const displayH = Math.floor(timeLeft / 3600);
  const displayM = Math.floor((timeLeft % 3600) / 60);
  const displayS = timeLeft % 60;

  const format = (num) => num.toString().padStart(2, '0'); // para dois digitos

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      
        <Modal 
        isVisible={isModalVisible}
        animationIn={"zoomIn"}
        >
        <View style={styles.modalOverlay}> 
          <View style={styles.esgotado}>
            <Text style={styles.alertMsg}>Tempo esgotado</Text>
            <TouchableOpacity style={styles.buttonModal} onPress={closeModal}>
              <Text style={styles.buttonText}>Dispensar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>

      <View style={styles.tempo}>
        <CountdownCircleTimer
          key={iniciar}
          isPlaying={isRunning}
          duration={getTotalSeconds()}
          initialRemainingTime={timeLeft} 
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[
            getTotalSeconds(),          
            getTotalSeconds()/3*2,    
            getTotalSeconds()/3,    
            0                      
          ]} 
          size={280}
          strokeWidth={10}
        >
          {() => (
            <View style={styles.containerTotal}>
              <TextInput
                style={styles.timerInput}
                value={isRunning ? format(displayH) : h}
                onChangeText={setH}
                keyboardType="numeric"
                maxLength={2}
                editable={!isRunning}
              />
              <Text style={styles.ponto}>:</Text>
              <TextInput
                style={styles.timerInput}
                value={isRunning ? format(displayM) : m}
                onChangeText={setM}
                keyboardType="numeric"
                maxLength={2}
                editable={!isRunning}
              />
              <Text style={styles.ponto}>:</Text>
              <TextInput
                style={styles.timerInput}
                value={isRunning ? format(displayS) : s}
                onChangeText={setS}
                keyboardType="numeric"
                maxLength={2}
                editable={!isRunning}
              />
            </View>
          )}
        </CountdownCircleTimer>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={Reset}>
            <FontAwesome6 name="arrow-rotate-right" size={24} color="#ACC1D3" />
          </TouchableOpacity>
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
    width: 65 
    },
  ponto: { 
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  esgotado: {
    width: '80%',
    backgroundColor: '#ACC1D3',
    padding: 30,
    borderRadius: 25,
    alignItems: 'center'
  },
  alertMsg: {
    color: '#1A3953' ,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonModal: {
    width: '35%',
    padding: 8,
    backgroundColor: '#1A3953',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10
  },
  buttonText: {
    color: '#ACC1D3',
    fontWeight: 'bold'
  }
});
