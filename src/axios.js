import axios from "axios";

let instance=axios.create({
    //baseURL:"http://localhost:3001"
     baseURL:"https://messageapp-server.onrender.com/"
})

export default instance;