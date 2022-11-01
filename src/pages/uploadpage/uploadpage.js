import NavBar from "../../components/navbar";


function UploadPage(){
    return (
        <div class="uploadpage">
            <NavBar/>
            <h2> Please Upload your file here</h2>
        <form action="/action_page.php" class="submissionform">
        <input type="file"
       id="dance" name="dance"/>
        <br></br>
        <input type="text"
       id="specifications" name="specifications"/>
        </form>

        </div>
    )
}

export default UploadPage;