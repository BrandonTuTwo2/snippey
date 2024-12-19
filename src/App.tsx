import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import netlifyIdentity from 'netlify-identity-widget';
import { Button } from "@/components/ui/button"
import { PlusIcon } from './components/plusicon';
import { StickyNote } from './components/stickynote';
import {
  Drawer,
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
  const [titleBoxStyling, setTitleBoxStyling] = useState("mb-2") // mb-2 outline outline-red-600
  const [titlePlaceHolderText, setTitlePlaceHolderText] = useState("Title");
  const [isOpen, setIsOpen] = useState(false);
  const addSticky = async () => {

    const titleVal = (document.getElementById("codeSnippetTitle") as HTMLInputElement).value;
    const bodyVal = (document.getElementById("codeSnippetBody") as HTMLInputElement).value;
    const tagVal = (document.getElementById("codeSnippetTags") as HTMLInputElement).value.replace(/\s/g, "").split(","); //removes spaces too
    const tempy = { name: titleVal, body: bodyVal, tags: tagVal, user: netlifyIdentity.currentUser()?.email } as CodeSnippet;

    const checkBefore = await fetch('/api/checkExist', {
      method: 'POST',
      body: JSON.stringify(tempy)
    })
    const checkBeforeRes = await checkBefore.json();
    console.log(checkBeforeRes)

    if (!titleVal || checkBeforeRes.body.exist) {
      const input = document.getElementById("codeSnippetTitle") as HTMLInputElement
      console.log("ERROR HANDLING + IT ALREADY EXIST");
      setTitleBoxStyling("outline outline-red-600");
      setTitlePlaceHolderText("This title doesn't exist or you forgot to input a title");
      input.value = "";
    } else {
      setTitleBoxStyling("");
      setTitlePlaceHolderText("Title");
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
      setIsOpen(false);
    }
  };


  const refreshSticky = async (filters: string[]) => {
    const refreshStickyJSON = {
      author_id: netlifyIdentity.currentUser()?.email,
      tags: filters
    }
    const res = await fetch('/api/getAll', {
      method: 'POST',
      body: JSON.stringify(refreshStickyJSON)
    });
    const resJSON = await res.json();
    setCurrSnippets(resJSON.body);
    console.log(curSnippets);
  }

  const refreshWFilters = () =>{ //This could mayhaps just be inside the button, a bit too bare to be its own function
    const tagFilters =(document.getElementById("tagFilters") as HTMLInputElement).value.replace(/\s/g, "").split(",");
    refreshSticky(tagFilters);
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



    refreshSticky([]);

  }, []);


  //every time a new snippet is added this should update the front end hopefully
  useEffect(() => {
    console.log("RAN IT???");
    refreshSticky([]);
  }, [newSnippet])





  return (
    <><div className='refreshSticky'>
      <h1 className='font-mono'>Snippey</h1>
      <div className="mx-auto flex w-full max-w-sm  items-center justify-center  space-x-2 pt-2">
        <Input className="" placeholder="enter,tags,separated,by,comma" id="tagFilters"></Input>
        <Button className="text-black" onClick={refreshWFilters}>Filter</Button>
        <Button variant="destructive" className="text-black" onClick={() =>{refreshSticky([])}}>Reset</Button>
      </div>

      <div className="grid grid-cols-4 p-24 place-items-center">
        {curSnippets.map((snippet, i) =>
          <StickyNote title={snippet.name} body={snippet.body} tags={snippet.tags} key={`stickynote-${i}`} />
        )}
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
              <Input className={titleBoxStyling} placeholder={titlePlaceHolderText} id="codeSnippetTitle"></Input>
              <Textarea className="mb-2 mt-2" placeholder='Copy & Paste or enter in manually' id="codeSnippetBody"></Textarea>
              <Input placeholder="enter,tags,separated,by,comma" id="codeSnippetTags"></Input>
            </div>
            <DrawerFooter id="refreshStickyMachine">
              <Button className="text-black" type='submit' onClick={addSticky}>Submit</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>

    </>
  )
}

export default App
