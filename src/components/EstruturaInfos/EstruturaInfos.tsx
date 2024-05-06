import Botao from "../Botao/Botao"

type Props = {
    numeroArea: number,
    numeroAreaFinal: number,
    numeroQuartos: number,
    numeroSuites: number,
    numeroVagas: number,
    numeroPreco: number,
    numeroCodigo: string,
    alturaFoto: boolean,
    temBotao: boolean,
    btPequeno?: boolean
}

export default function({numeroArea, numeroQuartos, numeroSuites, numeroVagas, numeroPreco, numeroCodigo, alturaFoto, temBotao, numeroAreaFinal}: Props){

    let numPrecoTratado = numeroPreco

    return(
        <div className={`md:w-larguraFotoSlide w-full  p-2 flex flex-col justify-center items-center md:h-${alturaFoto? "alturaFotoSlide" : "auto"}`}>
            <div className="flex-6 flex py-2 w-full">
                <div className="h-full flex-1 flex flex-col justify-center items-center p-2 "><span className="">{numeroArea == numeroAreaFinal ? numeroArea + "m²" : <div><span>{`De ${numeroArea}m²`}</span><br/><span>{`à ${numeroAreaFinal}m²`}</span></div>}</span>Área Útil</div>
                <div className="border-l-[1px] border-solid border-white h-full flex-1 flex justify-center items-center p-2">{numeroQuartos} Dormitórios</div>
                <div className="border-l-[1px] border-solid border-white h-full flex-1 flex justify-center items-center p-2">{numeroSuites} Suítes</div>
                <div className="border-l-[1px] border-solid border-white h-full flex-1 flex justify-center items-center p-2">{numeroVagas} vagas</div>
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
        </div>
    )
}