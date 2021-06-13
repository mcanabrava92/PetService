import React, { useState,useEffect } from "react"
import { TextStyle, View, ViewStyle, Alert, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
//import { State } from "react-native-gesture-handler"
import DatePicker from 'react-native-datepicker'
import { RadioGroup } from "react-native-radio-buttons-group"
import VeterinarioService from "../../services/veterinario-service"
import VeterinarioModel from "../../models/veterinario-model"
import PetService from "../../services/pet-service"


const FULL: ViewStyle = {
  flex: 1,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_SELECT: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const CONTAINER_ADD: ViewStyle = {
  ...LIST_CONTAINER,
  alignItems: "center",
  flexDirection: "column",
  padding: 10,
  alignSelf: "center",
  alignContent: "center",
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "center",
  width: 110,
}
const TEXT_FIELD: ViewStyle = {
  width: 300,
}
const TEXT_FIELD_CONTENT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#5D2555",
  padding: 8,
}

export const VeterinarioFormEditScreen = observer(function VeterinarioFormEditScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const veterinarioService = new VeterinarioService()
  const petService = new PetService()

  const { veterinarioStore } = useStores()

  //const [radioButtonsData, setRadioButtonsData] = useState([]);  
  const [especialidadeSelecionada, setSelecionarEspecialidade] = useState("");
  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [status, setSelecionarStatus] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState("");
  const [dataAtendimento, setDataAtendimentoSelecionada] = useState("");
  const [petId, setPetId] = useState("");
  const [pets, setPets] = useState([]);
 // const [petRadioGroup, setSelecionarPetId] = useState(radioButtonsData);


  async function loadPets() {
    setPets(await petService.getPets())
   
  }

  async function loadVeterinarioData() {
    let veterinario = await veterinarioService.getVeterinarioById(veterinarioStore.veterinario)
    setSelecionarEspecialidade(veterinario.especialidade)
    setSelecionarNome(veterinario.nome)
    setSelecionarStatus(veterinario.status)
    setImagemSelecionada(veterinario.imagem)
    setDataAtendimentoSelecionada(veterinario.dataAtendimento)
    
    setPetId(veterinario.petId)
  }

  useEffect(() => {
    loadPets()
    loadVeterinarioData() 
  }, [])

  async function editarVeterinario() {
    
    if (petId) {
      
      try {
        const veterinario = new VeterinarioModel();
        veterinario.nome = nomeSelecionado,
        veterinario.especialidade = especialidadeSelecionada,
        veterinario.status = status,
        veterinario.dataAtendimento = dataAtendimento,
        veterinario.imagem = imagemSelecionada,
        veterinario.petId = petId
        
        await veterinarioService.updateVeterinario(veterinarioStore.veterinario, veterinario)
        
        navigation.navigate("home")
        navigation.navigate("veterinarioList")
      } catch(e) {
        console.log(e)
        Alert.alert(
          "Atenção",
          "Ocorreu um erro ao tentar cadastrar o veterinário!"
        )
      }

    }else{
      Alert.alert(
        "Atenção",
        "Olá antes de cadastrar o Veterinário é necessário cadastrar o Pet para o Atendimento",
        [
          { text: "OK", onPress: () => navigation.navigate('home') }
        ]
      );
  }
}

  return (
    <View testID="VeterinarioListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Editar Veterinário"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <TextField
            value={nomeSelecionado}
            onChangeText={setSelecionarNome}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Nome"/>
        
          <TextField
            value={especialidadeSelecionada}
            onChangeText={setSelecionarEspecialidade}
            inputStyle={TEXT_FIELD_CONTENT} 
            style={TEXT_FIELD}
            placeholder="Especialidade"/>
          
          <TextField
            value={status}
            onChangeText={setSelecionarStatus}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Status"/>
            
            <TextField
            value={imagemSelecionada}
            onChangeText={setImagemSelecionada}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Informe a Url da imagem"/>
                        
            <DatePicker
            format="DD/MM/YYYY"
            mode="date"
            placeholder="Informe a data do Atendimento"
            style={{width: 200, backgroundColor: "white"}}
            date={dataAtendimento}
            onDateChange={setDataAtendimentoSelecionada}></DatePicker>

            </View>
                  <FlatList
                    contentContainerStyle={FLAT_LIST}
                    data={pets}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <View style={LIST_CONTAINER}>
                          <Text style={LIST_TEXT}>
                          {item.nome} 
                          </Text>
                        <Button
                          style={BUTTON_SELECT}
                          disabled={petId===item.id}
                          onPress={() => {
                            setPetId(item.id)
                            
                          }}
                          text="Selecionar"
                          >
                            
                          </Button>
                      
                      </View>
                    )}
                  />
                  <View>  


          <Button
            style={BUTTON_ADD}
            text="Salvar Alterações"
            onPress={() => { editarVeterinario() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
