import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate("/Kanbas/Account/Profile");
    } catch(err: any) {
      setError(err.response.data.message);
    }
  };
  return (

    <div className="container mt-5"> 
  <div className="row justify-content-center"> 
    <div className="col-md-6">
      <h1 className="mb-3 text-center">Signin</h1> 
      {error && <div>{error}</div>}
      <form>
        <div className="mb-3"> 
          <input 
            type="text" 
            className="form-control" 
            placeholder="Username" 
            value={credentials.username} 
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input 
            type="password" 
            className="form-control" 
            placeholder="Password" 
            value={credentials.password} 
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <div className="d-grid gap-2"> 
          <button 
            className="btn btn-primary" 
            type="button" 
            onClick={signin}
          >
            Signin
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

    
  );
}
