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
  name: string;
  body: string;
  tags: string[]; //its going to be empty for now
  user: string;
}


function App() {
  const navigate = useNavigate();
  const loggedIn = (netlifyIdentity && netlifyIdentity.currentUser());
  const [newSnippet, setNewSnippet] = useState<CodeSnippet>();
  const [curSnippets, setCurrSnippets] = useState<CodeSnippet[]>([]);
  const addSticky = async () => {

    const titleVal = (document.getElementById("codeSnippetTitle") as HTMLInputElement).value;
    const bodyVal = (document.getElementById("codeSnippetBody") as HTMLInputElement).value;
    const tempy = { name: titleVal, body: bodyVal, tags: [""], user: netlifyIdentity.currentUser()?.email } as CodeSnippet;

    const checkBefore = await fetch('/api/checkExist', {
      method: 'POST',
      body: JSON.stringify(tempy)
    })
    const checkBeforeRes = await checkBefore.json();
    console.log(checkBeforeRes)
    if (checkBeforeRes.body.exist) {
      console.log("ERROR HANDLING + IT ALREADY EXIST");
    } else{
      console.log("HUH?");
      const res = await fetch('/api/add', {
        method: 'POST',
        body: JSON.stringify(tempy)
      })
      const resReturn = await res;
      setNewSnippet(tempy);
      console.log("HI MEEEEE");
      console.log(resReturn);
      console.log(newSnippet);
    }
  };

  const test = async () => {
    const testJSON = {
      author_id: netlifyIdentity.currentUser()?.email
    }
    const res = await fetch('/api/getAll', {
      method: 'POST',
      body: JSON.stringify(testJSON)
    });
    const resJSON = await res.json();
    setCurrSnippets(resJSON.body);
    console.log(curSnippets);
  }

  //Only once
  useEffect(() => {
    if (!loggedIn) {
      console.log("NOT LOGGED IN");
      navigate("/");
    } else {
      console.log(netlifyIdentity.currentUser())
    }

    console.log("RUN ONCE");



    test();

  }, []);


  //every time a new snippet is added this should update the front end hopefully
  useEffect(() => {
    console.log("RAN IT???");
    test();
  }, [newSnippet])





  return (
    <><div className='test'>
      <h1 className='font-mono'>Snippey</h1>
      <div className="grid grid-cols-4 p-24 place-items-center">
        {curSnippets.map((snippet,i) =>
            <StickyNote title={snippet.name} body={snippet.body} tags={snippet.tags}  key={`stickynote-${i}`} />
        )}
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
                <Button type='submit' onClick={addSticky}>Submit</Button>
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
