import { useNavigate } from "react-router-dom";

import netlifyIdentity from 'netlify-identity-widget';

export const Login = () => {
  const navigate = useNavigate();
  netlifyIdentity.on('login', () => {navigate("/home"); netlifyIdentity.close()});
  netlifyIdentity.on('logout', () => {navigate("/"); netlifyIdentity.close()});

  const handleLogin = () => {
    if (netlifyIdentity && netlifyIdentity.currentUser()) {
      netlifyIdentity.open();
    } else {
      netlifyIdentity.open();
      
    }
  }



  return (
    <div id="login" className="w-full relative bg-no-repeat bg-cover h-[500px] z-0 overflow-hidden bg-login">
      <div className="relative top-0 left-0 w-full h-full z-10 bg-black/50 flex items-center justify-center flex-col gap-5 pt-32">
        <h2 className="text-4xl font-bold font-manrope text-white">Snippey</h2>
        <h6 className="text-xl font-bold font-manrope text-white">A code snippet tool</h6>
        <button type='button' className='py-2.5 px-6 text-sm rounded-lg bg-transparent border border-white  text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-white/25 hover:text-white' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
