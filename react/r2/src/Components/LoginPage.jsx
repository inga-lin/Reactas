import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { login } from '../Functions/auth';
//900 reikalingas admino paskyrai su slaptazodziu
function LoginPage() {
    const navigate = useNavigate();
  
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
  
    const doLogin = () => {
      axios.post('http://localhost:3003/login', { user, pass })
        .then(res => {
          console.log(res.data);
          if ('ok' === res.data.msg) {
            login(res.data.key);
            navigate('/admin/', { replace: true });
          }
        })
    }
    return (
      <div>
        <div>name: <input type="text" value={user} onChange={e => setUser(e.target.value)}></input></div>
        <div>password: <input type="password" value={pass} onChange={e => setPass(e.target.value)}></input></div>
        <button onClick={doLogin}>Login</button>
      </div>
    );
  }

  export default LoginPage;