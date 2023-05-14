import { useState, useEffect } from "react";
import axios from "axios";

function VideoPlayer() {
  const [videoURL, setVideoURL] = useState("");
  const SAS_token = "?sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupyx&se=2023-05-12T01:29:09Z&st=2023-05-11T17:29:09Z&spr=https&sig=GefmB0LLTuPHpG9aRKsRcZ6m7Q2XX2zkrcnBK8JySio%3D"

  useEffect(() => {
    axios.get("http://localhost:4000/routes/get_post_video", {
    responseType: 'blob',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Authorization": `SharedAccessSignature ${SAS_token}` // Replace with the actual origin of your frontend application
    }
  })
    .then(response => {
      const blobURL = URL.createObjectURL(response.data);
      setVideoURL(blobURL);
    })
    .catch(error => console.error(error));
  }, []);

  console.log(videoURL);

  return (
    <div>
      <video controls>
        <source src={videoURL} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoPlayer;
