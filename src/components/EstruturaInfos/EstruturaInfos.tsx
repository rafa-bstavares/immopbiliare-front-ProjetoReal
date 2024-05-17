import { useEffect } from "react"
import Botao from "../Botao/Botao"

type Props = {
    numeroArea: number,
    numeroAreaFinal: number,
    numeroQuartos: number,
    numeroSuites: number,
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

export default function EstruturaInfos({numeroArea, numeroQuartos, numeroSuites, numeroVagas, numeroPreco, numeroCodigo, alturaFoto, temBotao, numeroAreaFinal, modal, lerMais, descricao}: Props){

    useEffect(() => {
        console.log(modal)
    }, [])

    let numPrecoTratado = numeroPreco

    return(
        <div className={`group md:w-larguraFotoSlide w-full  p-2 flex flex-col justify-evenly items-center md:h-${alturaFoto? "alturaFotoSlide" : "auto"}`}>
            <div className="flex-6 flex py-2 w-full">
                {
                    numeroArea > 0 &&
                    <div className="h-full flex-1 flex flex-col justify-center items-center p-2 "><span className="">{numeroArea == numeroAreaFinal ? numeroArea + "m²" : <div><span>{`De ${numeroArea}m²`}</span><br/><span>{`à ${numeroAreaFinal}m²`}</span></div>}</span>Área Útil</div>
                }
                {
                    numeroQuartos > 0 &&
                    <div className="border-l-[1px] border-solid border-white h-full flex-1 flex justify-center items-center p-2">{numeroQuartos} Dormitórios</div>
                }
                {
                    numeroSuites > 0 &&
                    <div className="border-l-[1px] border-solid border-white h-full flex-1 flex justify-center items-center p-2">{numeroSuites} Suítes</div> 
                }
                {
                    numeroVagas > 0 && 
                    <div className="border-l-[1px] border-solid border-white h-full flex-1 flex justify-center items-center p-2">{numeroVagas} vagas</div>
                }
            </div>
            <hr />
            <div className="flex-4 flex py-2 flex-col">
                <div className=" flex flex-row gap-4 justify-center">
                    <div>Venda: <span className="font-bold">R$ {numPrecoTratado}</span></div>
                    <div>Código: <span className="font-bold">{numeroCodigo}</span></div>
                </div>
                {
                    temBotao &&
                    <Botao btTexto="conversar sobre o imóvel" temImg={true} imgWpp={true} temaClaro={true} btPequeno/>
                }
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