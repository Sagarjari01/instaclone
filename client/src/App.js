import React,{createContext,useReducer,useEffect,useContext} from "react";
import './App.css'
import NavBar from "./components/NavBar";
import {BrowserRouter, Route,Switch,useHistory} from "react-router-dom"
import Home from "./components/screens/home";
import Signup from "./components/screens/signup";
import Signin from "./components/screens/signin"
import Profile from "./components/screens/profile";
import CreatePost from './components/screens/createPost'
import {reducer,intialState} from './reducer/userReducer'
import UserProfile from './components/screens/UserProfile'
import MyFollowingPost from "./components/screens/Myfollowingpost";
import Reset from './components/screens/Reset'
import Newpassword from './components/screens/Newpassword'
export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith('/reset')){
        history.push('/signin')

      }
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <MyFollowingPost />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <Newpassword />
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,intialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
