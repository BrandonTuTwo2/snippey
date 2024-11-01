import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import netlifyIdentity from 'netlify-identity-widget';
import { Button } from "@/components/ui/button"
import { PlusIcon } from './components/plusicon';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import './App.css'
import React from 'react';

//JUST SCAFFOLODING
const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]


function App() {
  const navigate = useNavigate();
  const loggedIn = (netlifyIdentity && netlifyIdentity.currentUser());


  //SCAFFOLDING
  const [goal, setGoal] = React.useState(350)
  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }
  useEffect(() => {
    if (!loggedIn) {
      console.log("NOT LOGGED IN");
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <><div className='test'>
      <h1 className='font-mono'>Snippey</h1>
      <div className="card">
        <p>
          snippy bookmarks go here
        </p>
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
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-10)}
                  disabled={goal <= 200}
                >
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {goal}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Calories/day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(10)}
                  disabled={goal >= 400}
                >
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="mt-3 h-[120px]">
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
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
