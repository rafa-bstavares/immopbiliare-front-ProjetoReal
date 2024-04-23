
type Props = {
    texto: string
}

export default function Titulo({texto}: Props){
    return (
        <div className="relative text-5xl text-white self-center font-[Forum]">
            <div className="relative z-10">{texto.toUpperCase()}</div>
            <div className="absolute h-[52%] bg-laranjaPrincipal w-[105%] translate-x-[-2.5%] bottom-0 rounded-tl-xl rounded-br-xl"></div>
        </div>
    )
}