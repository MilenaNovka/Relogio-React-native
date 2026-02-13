import { useState } from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Text, View, StyleSheet, TextInput} from "react-native";
import { useRouter } from "expo-router";


export default function addAlarm(){

    const router = useRouter();

    const [hora, setHora] = useState(null);
    const [minuto, setMinuto] = useState(null);
    const [nomeAlarme, setnomeAlarme] = useState(null);
    const [dias, setDias] = useState([
        {id:1, letra:'D',abreviacao:'Dom', selecionado: false},
        {id:2, letra:'S',abreviacao:'Seg', selecionado: false},
        {id:3, letra:'T',abreviacao:'Ter', selecionado: false},
        {id:4, letra:'Q',abreviacao:'Qua', selecionado: false},
        {id:5, letra:'Q',abreviacao:'Qui', selecionado: false},
        {id:6, letra:'S',abreviacao:'Sex', selecionado: false},
        {id:7, letra:'S',abreviacao:'Sab', selecionado: false}
    ])
    const diasMarc = dias.filter(dia => dia.selecionado === true).map(dia => dia.abreviacao);


    function textDiasMarc(){
      if (diasMarc.length === 7){return('Todos os dias')}
      else if(diasMarc.length > 0){return('A cada '+ diasMarc.join(', '))}
      else{return('Não repetir')}
    }

    const toggleDia = (id) => {
        setDias(dias.map(dia => 
            dia.id === id ? { ...dia, selecionado: !dia.selecionado } : dia
        ));
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Adicione um alarme</Text>
                <View style={styles.time}>
                    <TextInput style={[styles.display,styles.hour]}
                               value ={hora}
                               placeholder="00"
                               onChangeText={(texto)=> setHora(texto)}
                               keyboardType="numeric"
                               maxLength={2}
                    />
                    <Text style={styles.display}>:</Text>
                    <TextInput style={[styles.display,styles.min]}
                               value ={minuto}
                               placeholder="00"
                               onChangeText={(texto)=> setMinuto(texto)}
                               
                               
                               maxLength={2}
                               
                    />
                </View>

                <View style={styles.container2}>
                    <View style={styles.selectDays}>
                      <Text style={styles.text}>{textDiasMarc()}</Text>
                    </View>
                    <View style={styles.days}>
                        {dias.map((dia)=>{
                            return(
                              <TouchableOpacity key={dia.id} onPress={()=>toggleDia(dia.id)}>
                                  <View style={[styles.day,{backgroundColor: dia.selecionado ? '#ACC1D3' : '#2E5077'}]}>
                                      <Text style={[{color:dia.selecionado ? '#2E5077' : '#ACC1D3'},{fontWeight:'600'}]}>{dia.letra}</Text>
                                  </View>
                              </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={styles.alarmName}>
                      <TextInput
                               style={styles.text}
                               value ={nomeAlarme}
                               placeholder="Insira o nome do alarme"
                               onChangeText={(texto)=> setnomeAlarme(texto)}
                    />
                    </View>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity
                          onPress={() => {
                            if(hora > 23 || minuto > 59 || hora < 0 || minuto < 0 || hora ==='-0' || minuto === '-0'){
                              console.log("Erro, horario inválida")
                              return
                            }
                            router.push({
                              pathname: "/", 
                              params: { 
                                novoTitulo: nomeAlarme || "Novo Alarme",
                                novaHora: hora || "00",
                                novoMin: minuto || "00",
                                novaFreq: textDiasMarc() 
                              }
                            });
                          }}>
                          <View style={styles.button}><Text style={styles.textB}>Salvar</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>router.push("/")}>
                          <View style={styles.button}><Text style={styles.textB}>Cancelar</Text></View>
                        </TouchableOpacity>

                    </View>
                </View>
                
                
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#1A3953',
  },
  header:{

  },
  title:{
    color:'white',
    alignSelf:'center',
    marginTop:'40%',
    marginBottom:'10%',
    color:'#ACC1D3',
    fontWeight:'600'
  },
  time:{
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:'5%'
  },
  display: {
    color: '#ACC1D3',
    fontSize: 100,
    fontWeight: '500',
    letterSpacing: 2,
    letterSpacing: 3,
    
  },
  hour:{
    textAlign:'right',
    width:120,
  },
  min:{
    textAlign:'left',
        width:120,
  },
  container2:{
    backgroundColor:'#3D5F7E',
    marginTop:'40%',
    alignSelf:'center',
    height:'35%',
    width:'90%',
    borderRadius:45
  },
  days:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20
  },
  day:{
    height:35,
    width:35,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'

  },
  selectDays:{
    padding:'5%',
    paddingLeft:'7%'
  },
  text:{
    color:'#ACC1D3',
    fontWeight:'600'
  },
  alarmName:{
    paddingHorizontal:'5%',
    marginVertical:'5%'
  },
  containerButtons:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:'5%'
  },
  button:{
    backgroundColor:'#ACC1D3',
    height:30,
    width:90,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  textB:{
    color:'#2E5077',
    fontWeight:'600'
  },
})