import { useEffect, useState } from "react"
import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"
import img3 from "../../assets/img3.jpg"
import img4 from "../../assets/img4.jpg"
import img5 from "../../assets/img5.jpg"
import img6 from "../../assets/img6.jpg"
import * as C from "./style.ts"

export default function Slide(){

    let larguraTela = screen.width //largura da tela em px

    const [arrayFotosFinal, setArrayFotosFinal] = useState<string[]>([])
    const [mLeft, setMLeft] = useState("0vw")
    const [valorTransition, setValorTransition] = useState<string>("all 20s linear")
    const [chegouFinal, setChegouFinal] = useState<boolean>(false)



    const larguraFotoSlide: number = 22
    const gapSlider: number = 10
    let arrayFotos = [img1, img2, img3, img4, img5, img6] //Isso aqui tem que ser construido a partir do que vem da API
    const quantFotos: number = arrayFotos.length //isso aqui tem que vir da API
    let quantidadeTotalFotos: number
    const quantidadeElemTela: number = Number((100/larguraFotoSlide).toFixed())

    const gapEmVw = (100 * gapSlider) / larguraTela

    let distMax = (quantFotos * larguraFotoSlide) + (quantFotos * gapEmVw)



    useEffect(() => {
        if(quantFotos <= quantidadeElemTela){
            let j = 1
            quantidadeTotalFotos = quantidadeElemTela + quantFotos
            console.log(quantidadeTotalFotos)
            let newArr = [...arrayFotosFinal]
            for(let i = 0; i < quantidadeTotalFotos; i++){
                let indexFotoAdd = j - 1
                newArr.push(arrayFotos[indexFotoAdd])

                if(j % quantFotos == 0){
                    j = 0 //O j tem que voltar pra 1, mas a gente coloca zero aqui pq depois vai ocorrer o j++ que vai deixar ele igual a 1
                }
                j++
            } 
            setArrayFotosFinal(newArr)
        }else{
            let j = 1
            quantidadeTotalFotos = quantFotos + 5
            let newArr = [...arrayFotosFinal]
            for(let i = 0; i < quantidadeTotalFotos; i++){
                let indexFotoAdd = j - 1
                newArr.push(arrayFotos[indexFotoAdd])
                if(j % quantFotos == 0){
                    j = 0 //O j tem que voltar pra 1, mas a gente coloca zero aqui pq depois vai ocorrer o j++ que vai deixar ele igual a 1
                }
                j++
            } 
            setArrayFotosFinal(newArr)




        }

        setMLeft(`-${distMax}vw`)
        setTimeout(() => {
            if(quantFotos > quantidadeElemTela){
                console.log(mLeft)

                    setMLeft("0vw")
                    setValorTransition("none")
            }
        }, 20000)
    }, [])





        useEffect(() => {
            if(mLeft == "0vw"){
                setValorTransition("all 20s linear")
            }
        }, [mLeft])

        useEffect(() => {
            console.log("executou, o valor do mLeft é "+mLeft+" e o valor do transition é: "+valorTransition )
            if(mLeft == "0vw" && valorTransition == "all 20s linear"){
                setMLeft(`-${distMax}vw`)
            }
        }, [valorTransition])


   return(
        <C.divHidden>
            <C.divSlider style={{marginLeft: mLeft, gap: gapSlider, transition: valorTransition}}>
                {arrayFotosFinal.map(item => <C.divSlide><C.imgSlide src={item} alt="foto slide" /></C.divSlide>)}
            </C.divSlider>
        </C.divHidden>
   ) 
}