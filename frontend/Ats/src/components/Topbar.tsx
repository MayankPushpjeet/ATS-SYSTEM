import cruxlogo from '../assets/getcruxai_logo.jpg'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Topbar()
{
    return <div class = "h-12 bg-slate-100 flex justify-between">
            <div class = "flex justify-start mx-10 py-1">
                <img src = {cruxlogo} class = "flex items-center rounded-md"></img>
                <label class="text-blue-700 mx-1 font-bold text-xl flex items-center h-full">CRUX</label>
            </div>
            <div class = "mx-10 py-1">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
    </div>
}