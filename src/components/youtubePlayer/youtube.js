import { render } from '@testing-library/react';
import YouTube from 'react-youtube';



function getYoutubeVideoId(youtubeLink) {
    // Regular expression to match the video ID
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|[^\/]+\?v=|[^\/]+\?vi=|youtu\.be\/|user\/[^\/]+\/live\/|youtube\.com\/user\/[^\/]+#p\/[^\/]+\/|youtube\.com\/embed\/|youtube\.com\/v\/)|youtu\.be\/|youtube\.com\/user\/[^\/]+#p\/[^\/]+\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^#\&\?\/]{11})/;
    
    // Extract the video ID using the regular expression
    const match = youtubeLink.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      // Return an empty string or handle the case when the video ID is not found
      return '';
    }
  }



const YoutubePlayer = (youtubeLink) => {


    const videoId = getYoutubeVideoId(youtubeLink);





    return(


        <div>
            <YouTube videoId={videoId} />
        </div>



    )
}