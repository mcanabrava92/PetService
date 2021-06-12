import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import DatePicker from 'react-native-datepicker'
import { RadioGroup } from "react-native-radio-buttons-group"
import VeterinarioService from '../../services/veterinario-service'
import VeterinarioModel from "../../models/veterinario-model"
import PetService from "../../services/pet-service"

const FULL: ViewStyle = {
  flex: 1,
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

export const VeterinarioFormCreateScreen = observer(function VeterinarioFormCreateScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const veterinarioService = new VeterinarioService()
  const petService = new PetService()
  
  const [radioButtonsData, setRadioButtonsData] = useState([]);  
  const [especialidadeSelecionada, setSelecionarEspecialidade] = useState("");
  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [statusSelecionado, setSelecionarStatus] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState("");
  const [dataAtendimento, setDataAtendimentoSelecionada] = useState("")
  const [petRadioGroup, setSelecionarPetId] = useState(radioButtonsData);

  async function loadPets() {
    const pets = await petService.getPets()
    let radioButtonsData = []
    pets.forEach((element, index) => {
      radioButtonsData[index] = {
        id: `${element.id}`,
        label: element.nome,
        value: `${element.id}`,
        color: "#FFF",
        labelStyle: {color: "white"}
      }
    });
    setRadioButtonsData(radioButtonsData)
  }

  useEffect(() => {
    loadPets()
  }, [])

  async function adicionarNovoVeterinario() {
    const petSelecionado = petRadioGroup.find((item) => {
      return (item.selected)
    })
    if (petSelecionado) {
      try {
        const veterinario = new VeterinarioModel()
        veterinario.nome = nomeSelecionado
        veterinario.especialidade = especialidadeSelecionada
        veterinario.status = statusSelecionado
        veterinario.dataAtendimento = dataAtendimento
        veterinario.imagem = imagemSelecionada
        veterinario.petId = petSelecionado.value

        await veterinarioService.saveVeterinario(veterinario)
        
        navigation.navigate("home")
        navigation.navigate("veterinarioList")
      } catch(e) {
        console.log(e)
        Alert.alert(
          "Atenção",
          "Ocorreu um erro ao tentar cadastrar o veterinário!"
        )
      }
    } else {
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
          headerText="Adicionar Veterinário"
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
            value={statusSelecionado}
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

            <RadioGroup
            radioButtons={petRadioGroup} 
            onPress={setSelecionarPetId} 
              />

          <Button
            style={BUTTON_ADD}
            text="Adicionar Veterinário"
            onPress={() => { adicionarNovoVeterinario() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
