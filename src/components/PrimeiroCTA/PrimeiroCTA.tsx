import Titulo from "../Titulo/Titulo"
import Botao from "../Botao/Botao"


export default function PrimeiroCTA(){



    return (
        <div className="py-yGeralPc px-xGeralPc bg-verdePrincipal flex flex-col items-center gap-16">
            <Titulo texto="quer vender ou alugar seu imóvel?"/>
            <div className="font-[Montserrat] text-xl text-white text-center">
                Colha os frutos de uma empresa consolidada no mercado há mais de 10 anos!<br/>
                Clique no botão abaixo e converse com um dos nosso especialistas!
            </div>
            <Botao btTexto="entre em contato" temImg={true} temaClaro={true} imgWpp={true}/>
        </div>
    )
}