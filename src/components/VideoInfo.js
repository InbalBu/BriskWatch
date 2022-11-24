import React from 'react'

const VideoInfo = ({videoKey}) => {
  return (
    <div>
        <iframe className='aspect-video w-full focus:outline-none' src={`https://www.youtube.com/embed/${videoKey}`} allowFullScreen title='Youtube Video' frameborder="0"></iframe>
    </div>
  )
}

export default VideoInfo