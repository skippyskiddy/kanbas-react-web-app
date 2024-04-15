import { Link } from "react-router-dom";

export default function Landing() {
    return (
    <div className="w-100 d-flex flex-column align-items-center pt-4">
        <h1>Welcome! Sign up or Sign in</h1>
        <Link to="/Kanbas/Account/Signin" className="text-white w-100 d-flex flex-column align-items-center">
            <button 
                className="btn btn-primary w-50 mb-2" 
                type="button" 
            >
                Signin
            </button>
        </Link>
        <Link to="/Kanbas/Account/Signup" className="text-white w-100  d-flex flex-column align-items-center">
            <button 
                className="btn btn-primary w-50" 
                type="button" 
            >
                Signup
            </button>
        </Link>
      </div>
    );
}