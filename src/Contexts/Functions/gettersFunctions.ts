import { Dispatch, SetStateAction } from "react"
import { objImovel } from "../ContextoInfoImoveis/ContextoInfoImoveis"
import { imoveisPesquisaType } from "../../components/PaginaPrincipal/PaginaPrincipal"

export function PegarBairros(setBairros: Dispatch<SetStateAction<string[]>>, setTemAviso: Dispatch<SetStateAction<boolean>>, setTextoAviso: Dispatch<SetStateAction<string>>){
    fetch("http://localhost:3000/pegarBairros").then(res => res.json()).then(data => {
        if(data.length > 0){
            let arrNovosBairros = ["selecione um bairro"]
            data.forEach((item: {bairro: string}) => {
                arrNovosBairros.push(item.bairro)
            })
            setBairros(arrNovosBairros)
        }else{
            setTemAviso(true)
            setTextoAviso("Confira se existe algum bairro cadastrado")
        }
    }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao buscar os bairros no banco de dados, por favor cheque sua internet. Erro: ${err}`)})
}

export function pegarTiposImoveis(setTiposImoveis: Dispatch<SetStateAction<string[]>>, setTemAviso: Dispatch<SetStateAction<boolean>>, setTextoAviso: Dispatch<SetStateAction<string>>){
    fetch("http://localhost:3000/pegarTipos").then(res => res.json()).then(data => {
        if(data.length > 0){
            let arrNovosTipos = ["selecione um tipo de imóvel"]
            data.forEach((item: {tipoimovel: string}) => {
                arrNovosTipos.push(item.tipoimovel)
            })
            setTiposImoveis(arrNovosTipos)
        }else{
            setTemAviso(true)
            setTextoAviso("Confira se existe algum tipo cadastrado")
        }
    }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao buscar os tipos de imóveis no banco de dados, por favor cheque sua internet. Erro: ${err}`)})
}

export function pegarInfosImoveis(setInfoImoveis: Dispatch<SetStateAction<objImovel[]>>, setTemAviso: Dispatch<SetStateAction<boolean>>, setTextoAviso: Dispatch<SetStateAction<string>>){
    fetch("http://localhost:3000/infoImoveis").then(res => res.json()).then(data => {
        if(data[0] == "sucesso"){
            setInfoImoveis(data[1])
        }else{
            setTemAviso(true)
            setTextoAviso("ocorreu um erro, recarregue a página por favor.")
        }
    }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao buscar as informações no banco de dados, por favor cheque sua internet. Erro: ${err}`)})
}

export function pesquisarImoveis(setArrayImoveisPesquisa: Dispatch<SetStateAction<imoveisPesquisaType[]>>, bairrosPesquisa: string[], tiposPesquisa: string[], setPesquisa: Dispatch<SetStateAction<boolean>>, setTemAviso: Dispatch<SetStateAction<boolean>>, setTextoAviso: Dispatch<SetStateAction<string>>){
    console.log("acionou a função de pesquisa")

    fetch("http://localhost:3000/pesquisaImoveis", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            bairrosPesquisa,
            tiposPesquisa
        })
    }).then(res => res.json()).then(data => {
        if(data[0] == "sucesso"){
            console.log(data[1])
            setPesquisa(true)
            setArrayImoveisPesquisa(data[1])
        }else{
            console.log(data[1])
            setTemAviso(true)
            setTextoAviso(data[1])
        }
    }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao buscar as informações no banco de dados, por favor cheque sua internet. Erro: ${err}`)})
}

export function pesquisarImoveisId(setArrayImovel: Dispatch<SetStateAction<imoveisPesquisaType[]>>, id: string, setTemAviso: Dispatch<SetStateAction<boolean>>, setTextoAviso: Dispatch<SetStateAction<string>>){


    fetch("http://localhost:3000/pesquisaImoveisId", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id
        })
    }).then(res => res.json()).then(data => {
        if(data[0] == "sucesso"){
            console.log(data[1])
            setArrayImovel(data[1])
        }else{
            console.log(data[1])
            setTemAviso(true)
            setTextoAviso(data[1])
        }
    }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao buscar as informações no banco de dados, por favor cheque sua internet. Erro: ${err}`)})
}