import EstruturaInfos from "../EstruturaInfos/EstruturaInfos"
import seta from "../../assets/setaSeletor.svg"
import { useContext, useEffect, useState } from "react"
import { ContextoInfoImoveis, objImovel } from "../../Contexts/ContextoInfoImoveis/ContextoInfoImoveis"

type Props = {
    imgs: string[],
    id: string,
    modal?: boolean
}

export default function ImovelPesquisa({imgs, id, modal}: Props){

    const [idxImagem, setIdxImagem] = useState<number>(0)
    const [infoAtual, setInfoAtual] = useState<objImovel[]>([{bairro: "1", codigo: "1", id: "8", metragem: "1", numquartos: "1", numsuites: "1", numvagas: "1", preco: "1", tipoimovel: "1", metragemfinal: "1", descricao: ""}])
    
    const {imoveisInfo} = useContext(ContextoInfoImoveis)

    useEffect(() => {
  
            if(id){
                console.log("o id vale: " + id)
                let novoInfoAtual = imoveisInfo.filter(item => item.id == id)
                if(novoInfoAtual){
                    setInfoAtual(novoInfoAtual)
                }else{
                    setInfoAtual([{bairro: "1", codigo: "1", id: "8", metragem: "1", numquartos: "1", numsuites: "1", numvagas: "1", preco: "1", tipoimovel: "1", metragemfinal: "1", descricao: ""}] )
                }
            }else{
                setInfoAtual([{bairro: "1", codigo: "1", id: "8", metragem: "1", numquartos: "1", numsuites: "1", numvagas: "1", preco: "1", tipoimovel: "1", metragemfinal: "1", descricao: ""}] )
            }
        
    }, [imoveisInfo])

    useEffect(() => {
console.log(infoAtual)
    }, [infoAtual])

    function setaTras(){
        if(idxImagem > 0){
            setIdxImagem(idxImagem - 1)
        }
    }

    function setaFrente(){
        if(idxImagem < imgs.length - 1){
            setIdxImagem(idxImagem + 1)
        }
    }

    return (
        <div className={`md:w-larguraFotoSlide w-larguraFotoSlideMobile flex flex-col`}>
            <div className="relative w-full">
                <img src={imgs[idxImagem]} alt="imagem da pesquisa" className="rounded-t-md w-full md:h-alturaFotoSlide h-alturaFotoSlideMobile object-cover" />
                <div onClick={setaTras} className="absolute w-12 h-12 p-[10px] left-0 top-1/2 z-10 bg-verdeMaisEscuro translate-x-[-60%] translate-y-[-50%] cursor-pointer rotate-90 rounded-full flex justify-center items-center"><img className="w-2/3 h-2/3" src={seta} alt="seta esquerda slide" /></div>
                <div onClick={setaFrente} className="absolute w-12 h-12 p-[10px] right-0 top-1/2 z-10 bg-verdeMaisEscuro translate-x-[60%] translate-y-[-50%] cursor-pointer -rotate-90 rounded-full flex justify-center items-center"><img className="w-2/3 h-2/3" src={seta} alt="seta seta direita slide" /></div>
            </div>
            <EstruturaInfos modal={modal} descricao={infoAtual[0].descricao} numeroAreaFinal={Number(infoAtual[0].metragemfinal) ? Number(infoAtual[0].metragemfinal) : 0} numeroArea={Number(infoAtual[0].metragem)} numeroCodigo={infoAtual[0].codigo} numeroPreco={Number(infoAtual[0].preco)} numeroQuartos={Number(infoAtual[0].numquartos)} numeroSuites={Number(infoAtual[0].numsuites)} numeroVagas={Number(infoAtual[0].numvagas)} alturaFoto={true} temBotao={true}/>
        </div>
    )
}