import NavBar from "../../components/navbar";
import logo1 from "../../blank-face.jpg"
function ProfilePage(){
    return (
        <div class="profilepage">
            <NavBar />
            <img src={logo1} class="smallprofile"></img>
            <h1> User Name Uploads</h1>
            <ul class="ulclass2"> <li>Reviews</li><li>Resume</li><li>Performances</li></ul>
        </div>
    )
}

export default ProfilePage;