import React,{ useContext } from "react"
import { Link , useHistory } from "react-router-dom"
import { UserContext } from '../App'
const NavBar = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        if(state){
            return[
                <li key="llkjflsdlkjlk"><Link to="/profile">Profile</Link></li>,
                <li key="llkjfl1213sdf"><Link to="/createpost">Create Post</Link></li>,
                <li key="lkjlkureouljljldvl54"><Link to="/myfollowingpost">My Following Posts</Link></li>,
                <li key="llkjf87813sdf">
                    <button className="waves-effect waves-light btn #d32f2f red darken-2" 
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}>Logout</button>
                </li>
            ]
        }
        else{
            return[
                <li key="ureuredf213sdf"><Link to="/signin">Signin</Link></li>,
                <li key="iuiueroerr654+df4df"><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
       <nav>
            <div className="nav-wrapper white">
            <Link to="/" className="brand-logo">Instagram</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
            </div>
      </nav>
    )
}

export default NavBar