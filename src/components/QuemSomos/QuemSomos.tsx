import Titulo from "../Titulo/Titulo";
import imgQuemSomos from "../../assets/imgQuemSomos.jpg"



export default function QuemSomos(){
    return (
        <div className="md:h-[70vh] bg-verdePrincipal flex px-xGeralMobile">
            <div className="flex-1 flex flex-col">
                <Titulo texto="Quem Somos"/>
                <div className="flex flex-col flex-1 justify-evenly md:p-20 py-6 text-white text-lg font-[Montserrat] gap-6 md:gap-0">
                    <div>
                        Nosso negócio é prospectar imóveis com algo a mais, que encante os nossos clientes e que façam a diferença em suas vidas. Isso é o que nos move!
                    </div>
                    <div>
                        Queremos ser lembrados como facilitadores de todo o processo que envolve a comercialização de um imóvel e como especialistas nos melhores bairros de São Paulo e região.
                    </div>
                    <div className="text-xl font-[Antonio] font-bold">
                        Admirar. Surpreender. Realizar
                    </div>
                    <div>
                    Com 25 anos de experiência no mercado imobiliário, os nossos profissionais possuem conhecimento específico no mercado de alto-padrão e um olhar sofisticado para a arquitetura e para o design, selecionando projetos diferenciados.
                    </div>
                </div>
            </div>
            <div className="flex-1 md:block hidden">
                <img className="h-full w-full object-cover py-10" src={imgQuemSomos} alt="imagem" />
            </div>
        </div>
    )
}