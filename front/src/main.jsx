import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render( // Inyecta toda nuestra aplicación en el root.
  <Provider store={store}>
  <BrowserRouter>    
  <App />               
  </BrowserRouter>
  </Provider>
);


// No se deberia tocar.


//App => Es la raiz de nuestro proyecto. El index renderiza en App.