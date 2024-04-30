import Titulo from "../Titulo/Titulo";
import imgQuemSomos from "../../assets/imgQuemSomos.jpg"



export default function QuemSomos(){
    return (
        <div className="md:h-[70vh] bg-verdePrincipal flex px-xGeralMobile">
            <div className="flex-1 flex flex-col">
                <Titulo texto="Quem Somos"/>
                <div className="flex flex-col flex-1 justify-evenly md:p-20 py-6 text-white text-lg font-[Montserrat]">
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, necessitatibus vitae dolorem beatae quaerat quae eaque, cumque cum nemo dolores odit
                         numquam? Culpa architecto explicabo quasi itaque maxime fuga repellat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, necessitatibus 
                         vitae dolorem beatae quaerat quae eaque, cumque cum nemo dolores odit numquam? Culpa architecto explicabo quasi itaque maxime fuga repellat!
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, necessitatibus vitae dolorem beatae quaerat quae eaque, cumque cum nemo dolores odit
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium modi natus quibusdam laborum debitis ea inventore quis velit molestias suscipit possimus 
                        pariatur maiores nisi fuga saepe, quia, dignissimos dicta illum.
                    </div>
                </div>
            </div>
            <div className="flex-1 md:block hidden">
                <img className="h-full w-full object-cover" src={imgQuemSomos} alt="imagem" />
            </div>
        </div>
    )
}