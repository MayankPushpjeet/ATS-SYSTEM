export function DetailView(props)
{
     return <div class="flex flex-row  gap-x-4 h-8 px-4 mt-4">
            <div class=" text-slate-900 font-bold px-2 w-1/3">{props.title}</div>
            <div class="text-slate-900 w-2/3">{props.value}</div>
     </div>
}