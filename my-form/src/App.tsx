import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./page/Home";
import Contact from "./page/Contact";
import Menu from "./page/Menu";
import AddTodo from "./page/AddTodo";
import { useState } from "react";
import { ProfileContext } from "./Context/ProfileContext";
import GlobalProfile from "./types/GlobalProfile";
import EditTodo from "./page/EditTodo";
import NavigationComponent from "./Components/NavigationComponent";
import Copyright from "./Components/Copyright";
import Register from "./page/Register";
import FormLogin from "./page/FormLogin";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
// import HeaderComponent from "./page/Logout";


function App() {
  const [profile, setProfile] = useState("anonymous");

  const changeName = (values: string) => {
    setProfile(values);
  };

  const thisContext: GlobalProfile = {
    name: profile,
    setName: changeName,
  };

  return (
    <ProfileContext.Provider value={thisContext}>
      <BrowserRouter>
        <NavigationComponent />
        <Header />


        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/HeaderComponent" element={<HeaderComponent />}></Route> */}
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/FormLogin" element={<FormLogin/>}></Route>
          <Route path="/Dashboard" element={<Dashboard/>}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/AddTodo" element={<AddTodo />}></Route>
          <Route path="/EditTodo" element={<EditTodo />}></Route>
        </Routes>
        <Copyright />
      </BrowserRouter>
    </ProfileContext.Provider>
  );
}

export default App;





// import Header from "./Components/Header";
// import Home from "./pages/Home";
// import Copyright from "./Components/Copyright";
// import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import NavigationComponent from "./Components/NavigationComponent";
// import PrivateRoute from "./route/PrivateRoute";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//           <Header/>
//           <NavigationComponent />


//           <Routes>
//               <Route path="/" element={<Home />}></Route>
//               <Route path="/Register" element={<Register />}></Route>
//               <Route path="/Login" element={<Login />}></Route>
//               <Route path="/" element={<PrivateRoute />}></Route>
//                   <Route path="/Dasboard" element={<Dashboard />}></Route>
//                   <Route path="*" element={<NotFound />}></Route>
//           </Routes>
//           <Copyright/>
//       </BrowserRouter>
//     </>
//   );
// }
// export default App;