import EstruturaInfos from "../EstruturaInfos/EstruturaInfos"

type Props = {
    img:string
}

export default function ImovelPesquisa({img}: Props){
    return (
        <div className="w-larguraFotoSlide flex flex-col">
            <img src={img} alt="imagem da pesquisa" className="w-full h-alturaFotoSlide object-cover" />
            <EstruturaInfos numeroArea={223} numeroCodigo={1234} numeroPreco={779000} numeroQuartos={3} numeroSuites={2} numeroVagas={1} alturaFoto={false} temBotao={true}/>
        </div>
    )
}