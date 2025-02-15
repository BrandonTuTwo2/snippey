import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"

interface Props {
    title?: string,
    body?: string,
    tags?: string[]
}

export const StickyNote = ({ title, body, tags }: Props) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [stickyNoteState, setStickyNoteState] = useState("");
    const [stickynoteTags] = useState(() => {
        const hashed = tags?.map(i => "#" + i);
        return hashed?.join(" ")
    });

    const updateBody = async (newBody: string) => {
        const req = {
            post_name: title,
            newBody: newBody
        }

        const res = await fetch('/api/update',{
            method: 'PATCH',
            body: JSON.stringify(req)
        })

        if (res.status != 200) {
            console.error("Uh oh error");
        } 
    }

    const deleteStickyNote = async () => {
        const tempy = { name: title }

        await fetch('/api/delete', {
            method: 'DELETE',
            body: JSON.stringify(tempy)
        })
        //I could maybe set the sticky note display to none for now
        setStickyNoteState("hidden");
    }

    const copyToClipboard = async () => {
        try {
            if (typeof body === 'string') { //its going to be a string but I have to type check or else Typescript will shoot me behind the mcdonalds
                await navigator.clipboard.writeText(body);
                console.log("successfully copied");
            }
        } catch (e) {
            console.log("uh oh");
            console.log(e);
        }
    }

    useEffect(() =>{
        const textArea = document.getElementById(`${title}-textArea`) as HTMLTextAreaElement
        if (isDisabled &&  textArea.value) {
            updateBody(textArea.value);
        } 
    },[isDisabled])




    return <>
        <div className={stickyNoteState}>
            <Card className="bg-yellow-500 m-5 size-96">
                <CardHeader>
                    <CardTitle className="text-neutral-950">{title}</CardTitle>
                </CardHeader>
                <CardContent className="w-full h-4/6" >
                    <Textarea className="h-60"  placeholder={body} id={`${title}-textArea`} disabled={isDisabled}/>
                </CardContent>
                <CardFooter>
                    <div className="items-center justify-center">
                        <Button className="hover:bg-sky-700 active:bg-sky-800" onClick={() => {setIsDisabled(!isDisabled)}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg></Button>
                        <Button variant="destructive" onClick={deleteStickyNote} className="mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></Button>
                        <Button className="hover:bg-sky-700 active:bg-sky-800" onClick={copyToClipboard}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg></Button>
                    </div>
                    <div>
                        <p>{stickynoteTags}</p>
                    </div>
                </CardFooter>
            </Card>
        </div>

    </>

}