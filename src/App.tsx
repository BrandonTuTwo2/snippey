import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import netlifyIdentity from 'netlify-identity-widget';
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
    <>
      <h1>Snippey</h1>
      <div className="card">
        <p>
          snippy bookmarks go here
        </p>
      </div>
    </>
  )
}

export default App
