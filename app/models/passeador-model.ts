import BaseModel from "./base-model"

export default class PasseadorModel extends BaseModel {
    nome: string
    especialidade: string
    dataAtendimento: string
    imagem: string
    petId: string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.nome = obj.nome
            this.especialidade = obj.especialidade
            this.dataAtendimento = obj.dataAtendimento
            this.status = obj.status
            this.imagem = obj.imagem
            this.petId = obj.clientId
        }
    }
}