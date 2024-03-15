import "./login.scss"

const Login = () => {
  return (
    <div className="login">
        <div>
            <div className="card">
                <div className="left">
                    <h1>GAMEBUD</h1>
                    <span>Don't you have an account?</span>
                    <button>Register</button>
                </div>
                <div className="right">
                        <h1>Login</h1>
                        <form>
                            <input type="text" placeholder="Username" />
                            <input type="text" placeholder="Password" />
                            <button>Login</button>
                        </form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Login