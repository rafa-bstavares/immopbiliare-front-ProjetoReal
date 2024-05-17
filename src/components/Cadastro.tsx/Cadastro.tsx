import { useState, useRef, useEffect, useContext } from "react"
import TelaAviso from "../TelaAviso/TelaAviso"
import { GeralContext } from "../../Contexts/ContextGeral/ContextGeral"
import { PegarBairros, pegarTiposImoveis } from "../../Contexts/Functions/gettersFunctions"
import ItemDeletar from "../ItemDeletar/ItemDeletar"
import ModalCerteza from "../ModalCerteza/ModalCerteza"
import ModalDesc from "../ModalDesc/ModalDesc"

export type objImoveisType = {
    id: string,
    bairro: string,
    tipoimovel: string,
    metragem: string,
    numquartos: string,
    numsuites: string,
    numvagas: string,
    preco: string,
    codigo: string,
    descricao: string
}

export default function Cadastro(){

    const [fotoEnviar] = useState<File | string>("")
    const [bairro, setBairro] = useState<string>("")
    const [tipoImovel, setTipoImovel]  = useState<string>("")
    const [metragem, setMetragem] = useState<string>("")
    const [metragemFinal, setMetragemFinal] = useState<string>("")
    const [numQuartos, setNumQuartos] = useState<string>("")
    const [numSuites, setNumSuites] = useState<string>("")
    const [numVagas, setNumVagas] = useState<string>("")
    const [preco, setPreco] = useState<string>("")
    const [codigo, setCodigo] = useState<string>("")
    const [numeroFotos, setNumeroFotos] = useState<number>(1)
    const [arrNumFotos, setArrNumFotos] = useState<string[]>([])
    const [fotos, setFotos] = useState<File[] | []>([])
    const [idxUltimaClicada, setIdxUltimaClicada] = useState<number>() 
    const [novoBairro, setNovoBairro] = useState<string>("")
    const [novoBairro2, setNovoBairro2] = useState<string>("")
    const [novoTipo, setNovoTipo] = useState<string>("")
    const [novoTipo2, setNovoTipo2] = useState<string>("")
    const [bairros, setBairros] = useState<string[]>([])
    const [tiposImoveis, setTiposImoveis] = useState<string[]>([])
    const [temModalCerteza, setTemModalCerteza] = useState<boolean>(false)
    const [temModalDesc, setTemModalDesc] = useState<boolean>(false)
    const [codigoItemDeletar, setCodigoItemDeletar] = useState<string>("")
    const [idItemDeletar, setIdItemDeletar] = useState<string>("")
    const [logged, setLogged] = useState<boolean>(false)
    const [emailLogin, setEmailLogin] = useState<string>("")
    const [senhaLogin, setSenhaLogin] = useState<string>("")
    const [novaDescricao, setNovaDescricao] = useState<string>("") 
    const [idAlterarDesc, setIdAlterarDesc] = useState<string>("")

    const [imoveisDeletar, setImoveisDeletar] = useState<objImoveisType[]>([])

    const ordinalidade = ['primeira', 'segunda', 'terceira', 'quarta', 'quinta', 'sexta', 'sétima', 'oitava', 'nona', 'décima', 'décima primeira', 'décima segunda', 'décima terceira', 'décima quarta', 'décima quinta']
    

    const ref = useRef<HTMLInputElement>(null)

    const {temAviso, setTemAviso, textoAviso, setTextoAviso} = useContext(GeralContext)

    useEffect(() => {
        PegarBairros(setBairros, setTemAviso, setTextoAviso)
        pegarTiposImoveis(setTiposImoveis, setTemAviso, setTextoAviso)
    }, [])


    function clickBtFn(){
        fetch(import.meta.env.VITE_API_URL + "/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                emailLogin,
                senhaLogin
            })
        }).then(res => res.json()).then(data => {
            if(data[0] == "sucesso"){
                setLogged(true)
            }else{
                setTemAviso(true)
                setTextoAviso("Ocorreu algum erro, tente novamente")
            }
        }).catch(() => {setTemAviso(true); setTextoAviso("Ocorreu algum erro, tente novamente"); console.log("ta caindo no catch")})
    }

    function cadastrarNovoImovel(){
            console.log(fotoEnviar)
            const formData = new FormData()
            console.log(fotos)
            for(let i = 0; i < fotos.length; i++){
                formData.append("files", fotos[i])
            }
    
            formData.append("bairro", bairro)
            formData.append("tipoImovel", tipoImovel)
            formData.append("metragem", metragem)
            formData.append("metragemFinal", metragemFinal)
            formData.append("numQuartos", Number(numQuartos).toString())
            formData.append("numSuites", Number(numSuites).toString())
            formData.append("numVagas", Number(numVagas).toString())
            formData.append("preco", preco)
            formData.append("codigo", codigo)
            formData.append("numFotos", numeroFotos.toString())
    
    
    
            
     
            fetch(import.meta.env.VITE_API_URL + "/cadastrarNovoImovel", {
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
            fetch(import.meta.env.VITE_API_URL + "/novoBairro", {
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
            fetch(import.meta.env.VITE_API_URL + "/novoTipo", {
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
        let idxAlterarDesc = imoveisDeletar.findIndex(item => item.id == idAlterarDesc)
        if(idxAlterarDesc > -1){
            setNovaDescricao(imoveisDeletar[idxAlterarDesc].descricao)
        }
    }, [idAlterarDesc])


    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/infoImoveis").then(res => res.json()).then(data => {setImoveisDeletar(data[1])}).catch((err) => {setTemAviso(true); setTextoAviso(`Ocorreu algum erro ao tentar pegar as informações, por favor cheque sua internet e recarregue a página. Erro: ${err}`)})
    }, [])


    function mudarDescFn(){
        fetch("http://localhost:8800/mudarDesc", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                idAlterarDesc,
                novaDescricao
            })
        }).then(res => res.json()).then(data => {
            if(data[0] == "erro"){
                setTemAviso(true)
                setTextoAviso(data[1])
            }else{
                setTemAviso(true)
                setTextoAviso("descrição adicionada com sucesso")
            }
        }).catch(err => {setTemAviso(true); setTextoAviso("ocorreu algum erro ao mudar a descrição, por favor, tente novamente")})
    }


    return (
        <div className="bg-verdePrincipal text-white relative overflow-x-hidden p-10">
            {
                logged ?
                <>
                    <div className="flex flex-col md:flex-row gap-12 md:gap-0 items-center justify-evenly min-h-screen bg-verdePrincipal text-white overflow-x-hidden">
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
                                    {arrNumFotos.map((item, index) =>  <div key={item} className={`cursor-pointer p-1 rounded-md bg-${fotos[index] ? "verdeMaisEscuro" : "white"} text-${fotos[index] ? "white" : "black"} text-sm flex justify-center items-center`} onClick={() => {setIdxUltimaClicada(index); ref.current?.click()}}>
                                    {fotos[index] ? "foto selecionada" : ordinalidade[index] + " foto"}</div>)}
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
                            <div className="flex flex-col items-start gap-1">
                                <label htmlFor="numeroMetragem">Metragem <br/><div className="text-sm">*apenas números, ao invés de vírgula utilizar ponto, caso necessário</div></label>
                                <input placeholder="a partir de..." onChange={(e) => setMetragem(e.target.value)} type="number" id="numeroMetragem" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                                <input placeholder="até..." onChange={(e) => setMetragemFinal(e.target.value)} type="number" id="numeroMetragemFinal" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
                            </div>
                            <div className="flex flex-col items-start">
                                <label htmlFor="numeroQuartos">Número de dormitórios<br/><div className="text-sm">*apenas números</div></label>
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
                                <label htmlFor="numeroCódigo">Código<br/></label>
                                <input onChange={(e) => setCodigo(e.target.value)} type="text" id="numeroCódigo" className="border-2 border-black border-solid rounded-sm px-2 py-1 w-50 text-black"/>
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
                        <div className="text-3xl">Imóveis cadastrados</div>
                        {imoveisDeletar.map(item => <ItemDeletar setCodigoItemDeletar={setCodigoItemDeletar} setIdItemDeletar={setIdItemDeletar} setIdAlterarDesc={setIdAlterarDesc} setTemModalDesc={setTemModalDesc} setTemModalCerteza={setTemModalCerteza} item={item} />)}
                    </div>
                    {
                        temModalCerteza && 
                        <ModalCerteza setImoveisDeletar={setImoveisDeletar} setTemModalCerteza={setTemModalCerteza} codigo={codigoItemDeletar} id={idItemDeletar}/>
                    }
                    {
                        temAviso &&
                        <TelaAviso texto={textoAviso} temAvisoFn={setTemAviso}/>
                    }
                                        {
                        temModalDesc &&
                        <ModalDesc setTemModalDesc={setTemModalDesc} novaDescricao={novaDescricao} setNovaDescricao={setNovaDescricao} mudarDescFn={mudarDescFn} />
                    }
                </>
                :
                
                <div className="min-h-screen bg-verdePrincipal flex justify-center items-center relative">
                    <div className="flex flex-col gap-4 w-full items-center">
                        <input onChange={(e) => setEmailLogin(e.target.value)} className="p-2 rounded-md w-4/5 md:w-1/2 text-black" placeholder="email" type="text" name="" id="" />
                        <input onChange={(e) => setSenhaLogin(e.target.value)} className="p-2 rounded-md w-4/5 md:w-1/2 text-black" placeholder="senha" type="password" name="" id="" />
                        <button onClick={clickBtFn} className="p-2 bg-laranjaPrincipal rounded-md w-4/5 md:w-1/2">Entrar</button>
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
                    
            }
        </div>
        
    )
}