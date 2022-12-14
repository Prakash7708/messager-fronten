import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
//import './Chat.css';
import '../../App.css'
import login from "../../icones/User.png";
import msg from "../../icones/msg.png";

let socket;
const Chat = () => {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socketUrl = 'https://messageapp-server.onrender.com/'

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const user = params.get('name');
        const room = params.get('room');

        setUser(user)
        setRoom(room)

        socket = io(socketUrl);



        socket.emit('join', { user, room }, (err) => {
            if (err) {
                // alert(err)
            }
        })

        return () => {
            // User leaves room
            socket.disconnect();

            socket.off()
        }

    }, [socketUrl,window.location.search])

    useEffect(() => {
        socket.on('message', msg => {
            setMessages(prevMsg => [...prevMsg, msg])

            setTimeout(() => {

                var div = document.getElementById("chat_body");
                div.scrollTop = div.scrollHeight - div.clientWidth;
            }, 10)
        })

        socket.on('roomMembers', usrs => {
            setUsers(usrs)
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
       
        socket.emit('sendMessage', message, () => setMessage(""))
        setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight ;
        }, 100)
    }

    return (
        <div className="row">
        <div className="col-lg-4 left">
          <div>
            <div className="admin">
              <img src={login} alt="img" className="homeimg" />
              <h4>{user}</h4>
              <img src={msg} alt="img" className="msgicon" />
              <h6>
                <b>⋮</b>
              </h6>
            </div>
            <input
              type={"search"}
              className="form-control"
              placeholder="Search"
            ></input>
          </div>
          <p>Members online <b>{users.length}</b></p>
          {
              users.map((e, i) => (
  
                  <div className='user'
          //  onClick={()=>props.getMsg(props.data)}
          >
              <div key={i} className='d-flex align-items-center'>
           <img src={login} alt='img' className='userimg'/>
            <h6>{e.user}</h6>
            </div>
            <h6><b>⋮</b></h6>
            </div>
              ))
          }
          
          {/* {receivers.map((input) => {
            return <Usersleft data={input} getMsg={getMsg} />;
          })} */}
        </div>
        <div className="col-lg-8 right">
           
       {/* {
        msgs.map((input)=>{
          
          return <Messages data={input} setMsgsend={setMsgsend} sendData={sendData}/>
        })
       } */}
  
  
  
        <div className="rightnav">
            <h6>Room Name:{room}</h6>
            <b></b>
          </div>
           <div className="msgdiv">
            
              {
                   messages.map((e, i) => (
                      e.user === user?.toLowerCase() ? 
                      <p key={i}> <p className="h6">
  
                      <p className='back'>{e.text} <p className='time back'>{e.user}</p></p>
  
                  </p></p>: <p key={i}> <p className="">
  
  <p className='back'>{e.text} <p className='time back'>{e.user}</p></p>
  
  </p></p>))
              }
          
            
          </div>
          <div className="rightdown">
            <div className="searchdown">
              <input
                type={"text"}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Send Messages......"
                className="form-control"
              />
            </div>
          </div> 
        </div>
      </div>
        // <div className="container mt-4 ">
        //     <div className="row chat-window" id="chat_window_1" >
        //         <div className="col-xs-4 col-md-4">
        //             <p>Active Users</p>
        //             <ul>
        //                 {
        //                     users.map((e, i) => (
        //                         <li key={i}>{e.user}</li>
        //                     ))
        //                 }
        //             </ul>
        //         </div>
        //         <div className="col-xs-8 col-md-8">
        //             <div className="panel panel-default">
        //                 <div className="panel-heading top-bar">
        //                     <div className="col-md-12 col-xs-8">
        //                         <h3 className="panel-title"><span className="glyphicon glyphicon-comment"></span>{room}</h3>
        //                     </div>

        //                 </div>
        //                 <div className="panel-body msg_container_base" id="chat_body">
        //                     {
        //                         messages.map((e, i) => (
        //                             e.user === user?.toLowerCase() ? <>
        //                                 <div key={i} className="row msg_container base_receive">
        //                                     <div className="col-xs-10 col-md-10">
        //                                         <div className="messages msg_receive">
        //                                             <p>{e.text}</p>
        //                                             <time>{e.user}</time>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </> : <>
        //                                 <div key={i} className="row msg_container base_sent">
        //                                     <div className="col-xs-10 col-md-10">
        //                                         <div className="messages msg_sent">
        //                                             <p>{e.text}</p>
        //                                             <time>{e.user}</time>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </>
        //                         ))
        //                     }

        //                 </div>
        //                 <div className="panel-footer">
        //                     <div className="input-group">
        //                         <input id="btn-input" type="text"
        //                             value={message}
        //                             onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        //                             onChange={(event) => setMessage(event.target.value)}
        //                             className="form-control input-sm chat_input" placeholder="Write your message here..." />

        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Chat;