import React, { useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom'

const Login = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (
        <>
        <div className="body">
          <div className="login">
            <h3>Messager</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
            alt="img" className="loginimg"/>
            <div>
              <div className="container1">
              <form method="post">
                 <div className="form-control">
            <input
                        onChange={(e) => setName(e.target.value)}
                        type="text" placeholder="Username" required className="form-control form-input" />
                </div>
                <div className="form-control">
                    <input
                        onChange={(e) => setRoom(e.target.value)}
                        type="text" placeholder="Room" required className="form-control form-input" />
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null}
                    to={`/chat?name=${name}&room=${room}`}>
                    <input type="submit" className="btn btn-success form-control" value="Log In" />
                </Link>
            </form> 
              </div>
            </div>
          </div>
          </div>
      
          </>

       
    )
}

export default Login;