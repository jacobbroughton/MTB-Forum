

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <form action="http://localhost:5000/login" method="POST">
                
                <label for="name">Name</label>
                <input name="name" type="text"/>

                <label for="email">Email</label>
                <input name="email" type="email"/>

                <label for="password">Password</label>
                <input name="password" type="password"/>

                <button type="submit">Submit</button>
            </form>
            <a href="/login">Login</a>
        </div>
        
    )
}

export default Login;