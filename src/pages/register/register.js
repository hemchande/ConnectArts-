
function RegisterPage() {
    return (
    <div class="registerpage">
        
    <label>First Name : </label>   
            <input type="firstname"  placeholder="Enter First Name" name="firstname" required/> 
            <br></br>
<label>Last Name : </label>   
            <input type="lastname"  placeholder="Enter Last Name" name="lastname" required/> 
            <br></br>

<label>Email : </label>   
            <input type="text"  placeholder="Enter Email" name="email" required/> 
            <br></br>

<label>Password : </label>   
            <input type="password"  placeholder="Enter Password" name="password" required/> 
            <br></br>

<label>Performance Genre : </label>   
            <select placeholder="Enter Performance Genre" required> 
                        <option value="Idk">isk</option>
            <option value="different">different</option>
            <option value="dance">dance</option>
            <option value="types">types</option>
            </select>

            </div>
            )
}

export default RegisterPage;