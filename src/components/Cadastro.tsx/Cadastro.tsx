import { useState, useRef, useEffect, useContext } from "react"
import TelaAviso from "../TelaAviso/TelaAviso"
import { GeralContext } from "../../Contexts/ContextGeral/ContextGeral"
import { PegarBairros, pegarTiposImoveis } from "../../Contexts/Functions/gettersFunctions"
import ItemDeletar from "../ItemDeletar/ItemDeletar"
import ModalCerteza from "../ModalCerteza/ModalCerteza"

export type objImoveisType = {
    id: string,
    bairro: string,
    tipoimovel: string,
    metragem: string,
    numquartos: string,
    numsuites: string,
    numvagas: string,
    preco: string,
    codigo: string
}

export default function Cadastro(){

    const [fotoEnviar, setFotoEnviar] = useState<File | string>("")
    const [bairro, setBairro] = useState<string>("")
    const [tipoImovel, setTipoImovel]  = useState<string>("")
    const [metragem, setMetragem] = useState<string>("")
    const [numQuartos, setNumQuartos] = useState<string>("")
    const [numSuites, setNumSuites] = useState<string>("")
    const [numVagas, setNumVagas] = useState<string>("")
    const [preco, setPreco] = useState<string>("")
    const [codigo, setCodigo] = useState<string>("")
    const [numeroFotos, setNumeroFotos] = useState<number>(1)
    const [arrNumFotos, setArrNumFotos] = useState<string[]>([])
    const [ordinalidade, setOrdinalidade] = useState<string[]>(['primeira', 'segunda', 'terceira', 'quarta', 'quinta', 'sexta', 'sétima', 'oitava', 'nona', 'décima'])
    const [fotos, setFotos] = useState<File[] | []>([])
    const [idxUltimaClicada, setIdxUltimaClicada] = useState<number>() 
    const [novoBairro, setNovoBairro] = useState<string>("")
    const [novoBairro2, setNovoBairro2] = useState<string>("")
    const[novoTipo, setNovoTipo] = useState<string>("")
    const[novoTipo2, setNovoTipo2] = useState<string>("")
    const [bairros, setBairros] = useState<string[]>([])
    const [tiposImoveis, setTiposImoveis] = useState<string[]>([])
    const [temModalCerteza, setTemModalCerteza] = useState<boolean>(false)
    const [codigoItemDeletar, setCodigoItemDeletar] = useState<string>("")
    const [idItemDeletar, setIdItemDeletar] = useState<string>("")

    const [imoveisDeletar, setImoveisDeletar] = useState<objImoveisType[]>([])
    

    const ref = useRef<HTMLInputElement>(null)

    const {temAviso, setTemAviso, textoAviso, setTextoAviso} = useContext(GeralContext)

    useEffect(() => {
        PegarBairros(setBairros, setTemAviso, setTextoAviso)
        pegarTiposImoveis(setTiposImoveis, setTemAviso, setTextoAviso)
    }, [])


    function cadastrarNovoImovel(){
        if(bairro && tipoImovel && metragem && numQuartos && numSuites && numVagas && preco && codigo){
            console.log(fotoEnviar)
            const formData = new FormData()
            console.log(fotos)
            for(let i = 0; i < fotos.length; i++){
                formData.append("files", fotos[i])
            }
    
            formData.append("bairro", bairro)
            formData.append("tipoImovel", tipoImovel)
            formData.append("metragem", metragem)
            formData.append("numQuartos", numQuartos)
            formData.append("numSuites", numSuites)
            formData.append("numVagas", numVagas)
            formData.append("preco", preco)
            formData.append("codigo", codigo)
            formData.append("numFotos", numeroFotos.toString())
    
    
    
            
    
            fetch("http://localhost:3000/cadastrarNovoImovel", {
                method: "POST",
                body: formData
            }).then(res => res.json()).then(data => {
                if(data[0] == "erro" && data[1]){
                    setTemAviso(true)
                    setTextoAviso(data[1])
                }else{
                    setTemAviso(true)
                    setTextoAviso("imóvel adicionado com sucesso!")
                    console.log(data)
                }
            }).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao se conectar com o servidor, por favor cheque sua internet. Erro: ${err}`)})
        }else{
            setTemAviso(true)
            setTextoAviso("preencha todos os campos de cadastro de imóvel, por favor")
        }
    }


    useEffect(() => {
        let newArr = []
        let initialFotos = new Array(numeroFotos)
        for(let i = 0; i < numeroFotos; i++){
            newArr.push("item")
        }
        setArrNumFotos(newArr)
        setFotos(initialFotos)
    }, [numeroFotos])

    useEffect(() => {
        console.log(fotos)
    }, [fotos])


    function inputFn(file: File){
        if(idxUltimaClicada !== undefined){
            console.log(fotos)
            let newFotos = [...fotos]
            newFotos[idxUltimaClicada] = file
            setFotos(newFotos)
        }
    }

    function novoBairroFn(){
        if(novoBairro == novoBairro2  && novoBairro){
            fetch("http://localhost:3000/novoBairro", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    novoBairro
                })
            }).then(res => res.json()).then(data => {if(data[0] == "sucesso"){
                setTemAviso(true)
                setTextoAviso("bairro adicionado com sucesso")
                setNovoBairro("")
                setNovoBairro2("")
            }else{
                setTemAviso(true)
                setTextoAviso("verifique se o nome já não existe. Caso não, tente novamente. Caso o erro persista, falar com o desenvolvedor que ocorreu alguma inconsistência no banco de dados")
            }}).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao se conectar com o servidor, por favor cheque sua internet. Erro: ${err}`)})
        }else{
            setTemAviso(true)
            setTextoAviso("Verifique se ambos os campos estão preenchidos e se são iguais")
        }
    }

    function novoTipoFn(){
        if(novoTipo == novoTipo2  && novoTipo){
            fetch("http://localhost:3000/novoTipo", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    novoTipo
                })
            }).then(res => res.json()).then(data => {
                if(data[0] == "erro"){
                    setTemAviso(true)
                }else{
                    setTemAviso(true)
                    setTextoAviso("Tipo de imóvel adicionado com sucesso")
                    setNovoTipo("")
                    setNovoTipo2("")
            }}).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao se conectar com o servidor, por favor cheque sua internet. Erro: ${err}`)})
        }else{
            setTemAviso(true)
            setTextoAviso("Verifique se ambos os campos estão preenchidos e se são iguais")
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/infoImoveis").then(res => res.json()).then(data => {setImoveisDeletar(data[1])}).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao tentar pegar as informações, por favor cheque sua internet e recarregue a página. Erro: ${err}`)})
    }, [])


    return (
        <div className="bg-verdePrincipal text-white relative overflow-x-hidden p-10">
            <div className="flex items-center justify-evenly min-h-screen bg-verdePrincipal text-white overflow-x-hidden">
                <div className="flex flex-col items-start gap-5">
                    <div className="text-3xl ">Cadastrar novo imóvel</div>
                    <div className="flex flex-col">
                        <label htmlFor="selectNumFotos" className="text-lg">Numero de fotos</label>
                        <select onChange={(e) => {setNumeroFotos(Number(e.target.value))}} name="selectNumFotos" id="selectNumFotos" className="border-2 border-solid border-black text-black">
                            {ordinalidade.map((item, index) => <option value={index + 1} key={item}>{index + 1}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col relative">
                        <div className="grid grid-cols-3 gap-2">
                            {arrNumFotos.map((item, index) =>  <div className="cursor-pointer p-1 rounded-md bg-white text-black text-sm flex justify-center items-center" onClick={(e) => {setIdxUltimaClicada(index); ref.current?.click()}}>{ordinalidade[index]} foto</div>)}
                        </div>
                        <input type="file" ref={ref} onChange={(e) => {if(e.target.files){inputFn(e.target.files[0])}}}  className="opacity-0 absolute inset-0 -z-10"/> {/* e.target.files[0].name */}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="selectBairros" className="text-lg">Selecione um bairro</label>
                        <select onChange={(e) => setBairro(e.target.value)} name="selectBairros" id="selectBairros" className="border-2 border-solid border-black text-black">
                            {bairros.map((item, index) => <option disabled={index == 0} selected={index == 0} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="selectTipo" className="text-lg">Selecione o tipo de imóvel</label>
                        <select onChange={(e) => setTipoImovel(e.target.value)} name="selectTipo" id="selectTipo" className="border-2 border-solid border-black text-black">
                            {tiposImoveis.map((item, index) => <option disabled={index == 0} selected={index == 0} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="numeroMetragem">Metragem <br/><div className="text-sm">*apenas números, ao invés de vírgula utilizar ponto, caso necessário</div></label>
                        <input onChange={(e) => setMetragem(e.target.value)} type="number" id="numeroMetragem" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="numeroQuartos">Número de quartos <br/><div className="text-sm">*apenas números</div></label>
                        <input onChange={(e) => setNumQuartos(e.target.value)} type="number" id="numeroQuartos" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="numeroSuites">Número de suítes<br/><div className="text-sm">*apenas números</div></label>
                        <input onChange={(e) => setNumSuites(e.target.value)} type="number" id="numeroSuites" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="numeroVagas">Número de vagas<br/><div className="text-sm">*apenas números</div></label>
                        <input onChange={(e) => setNumVagas(e.target.value)} type="number" id="numeroVagas" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="numeroPreco">Preço <br/><div className="text-sm">*apenas números, ao invés de vírgula utilizar ponto, apenas para números quebrados , numeros inteiros colocar sem vírgula e ponto</div></label>
                        <input onChange={(e) => setPreco(e.target.value)} type="number" id="numeroPreco" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="numeroCódigo">Código<br/><div className="text-sm">*apenas números</div></label>
                        <input onChange={(e) => setCodigo(e.target.value)} type="number" id="numeroCódigo" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                    </div>
                    <button className="p-2 bg-verdeMaisEscuro font-bold border-2 border-solid border-white text-white" onClick={cadastrarNovoImovel}>Cadastrar novo imóvel</button>
                </div>
                <div className="flex flex-col items-start gap-7">
                    <div className="flex flex-col items-start gap-4">
                        <div className="text-3xl ">Cadastrar Bairro inédito</div>
                        <div className="flex flex-col gap-2">
                            <input onChange={(e) => {setNovoBairro(e.target.value)}} value={novoBairro} type="text" placeholder="Nome do novo bairro" className="border-2 border-black border-solid p-2 w-64 text-black"/>
                            <input onChange={(e) => {setNovoBairro2(e.target.value)}} value={novoBairro2} type="text" placeholder="repita o nome do novo bairro" className="border-2 border-black border-solid p-2 w-64 text-black"/>
                            <button onClick={novoBairroFn} className="p-2 bg-verdeMaisEscuro font-bold border-2 border-solid border-white text-white">Cadastrar novo bairro</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <div className="text-3xl ">Cadastrar Tipo de imóvel inédito</div>
                        <div className="flex flex-col gap-2">
                            <input onChange={(e) => setNovoTipo(e.target.value)} value={novoTipo} type="text" placeholder="Nome do novo tipo" className="border-2 border-black border-solid p-2 w-64 text-black"/>
                            <input onChange={(e) => setNovoTipo2(e.target.value)} value={novoTipo2} type="text" placeholder="repita o nome do novo tipo" className="border-2 border-black border-solid p-2 w-64 text-black"/>
                            <button onClick={novoTipoFn} className="p-2 bg-verdeMaisEscuro font-bold border-2 border-solid border-white text-white">Cadastrar novo tipo</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-16 items-center m-10">
                <div className="text-3xl">Deletar Imóveis</div>
                {imoveisDeletar.map(item => <ItemDeletar setCodigoItemDeletar={setCodigoItemDeletar} setIdItemDeletar={setIdItemDeletar} setTemModalCerteza={setTemModalCerteza} item={item} />)}
            </div>
            {
                temModalCerteza && 
                <ModalCerteza setImoveisDeletar={setImoveisDeletar} setTemModalCerteza={setTemModalCerteza} codigo={codigoItemDeletar} id={idItemDeletar}/>
            }
            {
                temAviso &&
                <TelaAviso texto={textoAviso} temAvisoFn={setTemAviso}/>
            }
        </div>
    )
}