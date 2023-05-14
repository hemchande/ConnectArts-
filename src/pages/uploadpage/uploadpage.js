import NavBar from "../../components/navbar";
import CreatePost from "../uploadPost/createPost";


function UploadPage(){
    return (
        <div class="uploadpage">
            <NavBar/>
        <form action="/action_page.php" class="submissionform">
       
        <br></br>
        <CreatePost/>
       
        </form>

        </div>
    )
}

export default UploadPage;