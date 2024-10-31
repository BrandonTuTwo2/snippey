import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import netlifyIdentity from 'netlify-identity-widget';
import { Button } from "@/components/ui/button"
import { PlusIcon } from './components/plusicon';

import './App.css'




function App() {
  const navigate = useNavigate();
  const loggedIn =  (netlifyIdentity && netlifyIdentity.currentUser());

  useEffect(() => {
    if (!loggedIn) {
      console.log("NOT LOGGED IN");
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <><div className='test bg-primary'>
            <h1>Snippey</h1>
      <div className="card">
        <p>
          snippy bookmarks go here
        </p>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      >
        <PlusIcon className="h-14 w-14"/>
        <span className="sr-only">Add</span>
      </Button>
    </div>
    </div>

    </>
  )
}

export default App
