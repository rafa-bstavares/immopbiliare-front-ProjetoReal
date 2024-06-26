import { useContext, useEffect } from "react"
import Botao from "../Botao/Botao"
import { ContextoModalSlide } from "../../Contexts/ContextoModalSlide/ContextoModalSlide"

type Props = {
    numeroArea: number,
    numeroAreaFinal: number,
    numeroQuartos: number,
    numQuartosFinal: number
    numeroSuites: number,
    numSuitesFinal: number,
    numeroVagas: number,
    numeroPreco: number,
    numeroCodigo: string,
    descricao: string,
    alturaFoto: boolean,
    temBotao: boolean,
    btPequeno?: boolean,
    modal?: boolean,
    lerMais?: boolean
}

export default function EstruturaInfos({numeroArea, numeroQuartos, numQuartosFinal, numeroSuites, numSuitesFinal, numeroVagas, alturaFoto, temBotao, numeroAreaFinal, modal, lerMais, descricao}: Props){

    useEffect(() => {
        console.log(modal)
    }, [])

    const {setTemModalSlide} = useContext(ContextoModalSlide)

    return(
        <div className={`group md:w-larguraFotoSlide w-full md:p-2 flex flex-col justify-evenly items-center md:h-${alturaFoto? "alturaFotoSlide" : "auto"}`}>
            <div className="flex-6 grid grid-cols-2 py-2 w-full md:flex md:">
                {
                    numeroArea > 0 &&
                    <div className="h-full flex-1 flex flex-col justify-center items-center p-2 "><span className="">{numeroArea == numeroAreaFinal ? numeroArea + "m²" : <div><span>{`De ${numeroArea}m²`}</span><br/><span>{`à ${numeroAreaFinal}m²`}</span></div>}</span>Área Útil</div>
                }
                {
                    numeroQuartos > 0 &&
                    <div className="border-l-[1px] border-solid border-white flex-1 flex flex-col justify-center items-center p-2">{numeroQuartos == numQuartosFinal ? numeroQuartos : <div><span>{`De ${numeroQuartos}`}</span><br/><span>{`à ${numQuartosFinal}`}</span></div>} Dormitórios</div>
                }
                {
                    numeroSuites > 0 &&
                    <div className="border-l-[1px] border-solid border-white flex-1 flex flex-col justify-center items-center p-2">{numeroSuites == numSuitesFinal ? numeroSuites : <div><span>{`De ${numeroSuites}`}</span><br/><span>{`à ${numSuitesFinal}`}</span></div>} Suítes</div> 
                }
                {
                    numeroVagas > 0 && 
                    <div className="border-l-[1px] border-solid border-white flex-1 flex justify-center items-center p-2">{numeroVagas} vagas</div>
                }
            </div>
            <hr />
            <div className="flex-4 flex py-2 flex-col">
                <div className="text-sm flex flex-row gap-4 justify-center">
                    Valor sob consulta
                </div>
                <div className="flex md:flex-row flex-col gap-2 items-center">
                    {
                        temBotao &&
                        <Botao btTexto="conversar sobre o imóvel" temImg={true} imgWpp={true} temaClaro={true} btPequeno/>
                    }
                    {
                        modal &&
                        <div onClick={() => setTemModalSlide(false)} className="text-white text-lg py-2 px-4 rounded-sm bg-laranjaPrincipal cursor-pointer my-5">
                            Voltar
                        </div>
                    }
                </div>
            </div>
            {
                descricao && 
                <div className="flex flex-col items-center w-full">
                <div>Descrição do imóvel:</div>
                <div className={`w-full ${modal? 'h-20' : 'h-16'} text-sm text-center px-4 ${modal ? 'overflow-y-scroll' : 'overflow-y-hidden'} scrollbar-thin scrollbar-track-verdeMaisEscuro scrollbar-thumb-[#fff]`}>
                    {descricao}
                </div>
            </div>
            }
            {
                lerMais &&
                <div className="group-hover:animate-bounce">
                    Clique para ver mais
                </div>
            }
        </div>
    )
}