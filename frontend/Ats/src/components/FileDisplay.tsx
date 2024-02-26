import pdficon from '../assets/pdficon.png'

interface FileDisplayProps {
    name: string;
}
export function FileDisplay(props:FileDisplayProps)
{
    return <div class = "flex justify-start border-2 rounded-sm border-b-stone-50 px-2 h-10 w-full">
        <img src = {pdficon} class = "w-10 "></img>
        <div class="text-center">{props.name}</div>
    </div>
}