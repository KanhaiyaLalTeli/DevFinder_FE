import Body from './componants/Body'
import Login from './componants/Login'
import Profile from './componants/Profile'
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from './componants/Feed';
import Connections from './componants/Connections';
import Request from './componants/Request';
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/profile" element={<Profile/>}></Route>
           <Route path="/connections" element={<Connections/>}></Route>
           <Route path="/request" element={<Request/>}></Route>
        </Route>
        
      </Routes>
      
      </BrowserRouter>
      </Provider>
      
    </>
  )
}

export default App
