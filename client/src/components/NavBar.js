import React,{ useContext,useRef,useEffect,useState } from "react"
import { Link , useHistory } from "react-router-dom"
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar = () => {
    const history = useHistory()
    const userModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setuserDetails] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(()=>{
        M.Modal.init(userModal.current)
    },[])
    const searchUser = (query) => {
        setSearch(query)
        fetch('/search-users',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(result=>{
            setuserDetails(result.user)
        })
    }
    const renderList = () => {
        if(state){
            return[
                <li key="1"><i data-target="modal1" className="modal-trigger large material-icons" style={{color:"black",cursor:"pointer"}}>search</i></li>,
                <li key="2"><Link to="/profile">Profile</Link></li>,
                <li key="3"><Link to="/createpost">Create Post</Link></li>,
                <li key="4"><Link to="/myfollowingpost">My Following Posts</Link></li>,
                <li key="5">
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
                <li key="6"><Link to="/signin">Signin</Link></li>,
                <li key="7"><Link to="/signup">Signup</Link></li>
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
            <div id="modal1" className="modal" ref={userModal} style={{color:"black"}}>
                <div className="modal-content">
                <input 
                type="text" 
                placeholder="search Users"
                value={search}
                onChange={(e)=>searchUser(e.target.value)} />
                <ul className="collection">
                    {
                    userDetails.map(item=>{
                    return <Link id={item._id} to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                    M.Modal.getInstance(userModal.current).close()
                    setSearch('')
                    }}><li className="collection-item">{item.email}</li></Link> 
                    })}
                </ul>
                </div>
                <div className="modal-footer">
                <a className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</a>
                </div>
            </div>
      </nav>
    )
}

export default NavBar