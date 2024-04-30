import Titulo from "../Titulo/Titulo"
import Botao from "../Botao/Botao"


export default function PrimeiroCTA(){



    return (
        <div className="md:py-40 py-28 md:px-xGeralPc px-xGeralMobile bg-verdePrincipal flex flex-col items-center md:gap-16 gap-8">
            <Titulo texto="quer vender ou alugar?"/>
            <div className="font-[Montserrat] text-xl text-white text-center">
                Colha os frutos de uma empresa consolidada no mercado há mais de 10 anos!<br/>
                Clique no botão abaixo e converse com um dos nosso especialistas!
            </div>
            <Botao btTexto="entre em contato" temImg={true} temaClaro={true} imgWpp={true}/>
        </div>
    )
}