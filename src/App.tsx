import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import netlifyIdentity from 'netlify-identity-widget';
import { Button } from "@/components/ui/button"
import { PlusIcon } from './components/plusicon';
import { StickyNote } from './components/stickynote';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import './App.css'

type CodeSnippet = {
  title: string;
  body: string;
  tags: string[]; //its going to be empty for now
}


function App() {
  const navigate = useNavigate();
  const loggedIn = (netlifyIdentity && netlifyIdentity.currentUser());
  const [newSnippet, setNewSnippet] = useState<CodeSnippet>();

  useEffect(() => {
    if (!loggedIn) {
      console.log("NOT LOGGED IN");
      navigate("/");
    }

    const test = async () =>{
      const res = await fetch('/api/test');
      const resJSON = await res.json();
      console.log(res)
      console.log(resJSON)
    }

    test();
  }, [loggedIn, navigate]);

  return (
    <><div className='test'>
      <h1 className='font-mono'>Snippey</h1>
      <div className="card">
      <StickyNote title="TEST" body="TEST" tags={["test","beans"]} />
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="fixed bottom-4 right-4 z-50">
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300"
            >
              <PlusIcon className="h-14 w-14 fill-black" />
              <span className="sr-only">Add</span>
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className='flex items-center justify-center'>Add Sticky Note</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <Input className="mb-2" placeholder='Title' id="codeSnippetTitle"></Input>
              <Textarea placeholder='Copy & Paste or enter in manually' id="codeSnippetBody"></Textarea>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button type='submit' onClick={() => {
                  const titleVal = (document.getElementById("codeSnippetTitle") as HTMLInputElement).value;
                  const bodyVal = (document.getElementById("codeSnippetBody") as HTMLInputElement).value;
                  const tempy = { title: titleVal, body: bodyVal, tags: [""] } as CodeSnippet;
                  setNewSnippet(tempy); //might not even be needed tbh
                }}>Submit</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>

    </>
  )
}

export default App
