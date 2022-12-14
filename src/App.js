import './App.css';
import {BrowserRouter,Routes , Route} from 'react-router-dom'
import Chat from './pages/chat/Chat';
import Login from './pages/chat/login/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
