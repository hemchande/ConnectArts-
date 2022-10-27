
function SignIn(){
    return (
        <div>
            <h2>Sign in</h2>
            <label>Username : </label>   
            <input type="text" placeholder="Enter Username" name="username" required/>  
            <br></br>

            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" required/> 

            <button type="submit">Login</button>
            <br></br>
   
            <div class="container"> <div class="container-child">Forgot <a href="#"> password? </a> </div><div class="container-child">Sign up</div>  </div>
        </div>
    )
}
export default SignIn;
