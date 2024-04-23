import { Dispatch, SetStateAction } from "react"

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
    }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao buscar os bairros no banco de dados. Erro: ${err}`)})
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
    }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao buscar os tipos de imóveis no banco de dados. Erro: ${err}`)})
}