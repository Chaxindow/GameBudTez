import { Link } from "react-router-dom"
import "./register.scss"

const Register = () => {
  return (
    <div className="register">
        <div>
            <div className="card">
                <div className="left">
                    <h1>GAMEBUD</h1>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
                    
                </div>
                <div className="right">
                        <h1>Register</h1>
                        <form>
                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <input type="text" placeholder="Name" />
                            <button>Register</button>
                        </form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Register