import profilephoto from "../blank-face.jpg"
import video1 from "../video.mp4"
function Post() {
    return (
        <div class="post">
            <div class="identifier">
            <img src={profilephoto} class="smallprofile"/>
            <p>User Name</p>
            </div>
            <video src={video1} class="feedbackvideo"></video>
            <button class="feedback">Show Feedback</button>

        </div>
    )
}

export default Post;