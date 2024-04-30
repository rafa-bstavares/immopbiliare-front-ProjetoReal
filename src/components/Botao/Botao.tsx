import IconeInstagram from "../IconeInstagram/IconeInstagram"
import IconeWpp from "../IconeWpp/IconeWpp"


type Props = {
    temImg: boolean,
    btTexto: string,
    temaClaro: boolean
    imgWpp: boolean,
    btPequeno?: boolean
}

export default function Botao({temImg, btTexto, temaClaro, imgWpp, btPequeno}: Props){

    const iconeEscura = "#214E34"
    const iconeClaro = "#fff"
    const dimensaoIcone = "25px"
    

    return (
        <a href={imgWpp ? "https://wa.me//5521987671995?text=Tenho%20interesse%20nos%20imóveis%20que%20vi%20no%20site" : "https://www.instagram.com/immobiliare.sp/"} target="_blank" className={`cursor-pointer rounded-3xl py-2 px-8 flex items-center gap-5 ${temaClaro? "bg-white":"bg-verdePrincipal" } border-2 border-solid ${btPequeno ? "scale-75" : ""} ${temaClaro? "border-verdePrincipal":"border-white"}`}>
            {temImg &&
                imgWpp ? 
                <IconeWpp color={temaClaro ? iconeEscura : iconeClaro} heightIcon={dimensaoIcone} widthIcon={dimensaoIcone} />
                :
                <IconeInstagram color={temaClaro ? iconeEscura : iconeClaro} heightIcon={dimensaoIcone} widthIcon={dimensaoIcone} />
            }
            <div className={`font-[Antonio] text-center text-lg ${temaClaro? "text-verdePrincipal":"text-white"}`}>{btTexto.toUpperCase()}</div>
        </a>
    )
}