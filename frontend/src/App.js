import React from 'react';
//import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import ManagerPage from './pages/ManagerPage';


function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home />} />
      <Route path='/HomePage' element={<HomePage />} />
		<Route path='/POSPage' element={<POSPage/>} />
		<Route path='/ManagerPage' element={<ManagerPage/>} />
	</Routes>
	</Router>
);
}

export default App;


/*function CreateMenuItemForm() {
   const [name, setName] = useState('');

   function handleSubmit(e) {
      e.preventDefault();

      fetch("http://localhost:3001/api/v1/pos", {
         method: 'POST',
         body: JSON.stringify({ name })
      })
   }
   return (
      <form onSubmit={handleSubmit}>
         <input 
         type="text" 
         name="name" 
         value={name}
         onChange={(e) => setName(e.target.value)}
         />
      </form>
   )
}*/