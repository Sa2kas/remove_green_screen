      let video,video2,c1,ctx1,c_tmp,ctx_tmp; 
      function init() {
        video = document.getElementById('video');
        video.playbackRate = 2;
        video2 = document.createElement('video');
        video2.src = "park.mp4"
        video2.muted = true;
        video2.playbackRate = 0.5;
        video2.play();
        //video2.autoplay = true;
        video2.loop = true;

        c1 = document.getElementById('output-canvas');
        ctx1 = c1.getContext('2d');

        c_tmp = document.createElement('canvas');
        c_tmp.setAttribute('width', 500);
        c_tmp.setAttribute('height', 280);
        ctx_tmp = c_tmp.getContext('2d');

        video.addEventListener('play', computeFrame );
      }
   function computeFrame() {

    if (video.paused || video.ended) {
      return;
    }
    

    let coef =500/video.videoWidth;
    ctx_tmp.drawImage(video, 0, 0, video.videoWidth*coef, video.videoHeight*coef);
    let frame = ctx_tmp.getImageData(0, 0, video.videoWidth , video.videoHeight );

    ctx_tmp.drawImage(video2, 0, 0, video.videoWidth*coef, video.videoHeight*coef);
    let frame2 = ctx_tmp.getImageData(0, 0, video2.videoWidth , video2.videoHeight );

    for (let i = 0; i < frame.data.length; i+=4) {
      let r = frame.data[i]; //red
      let g = frame.data[i + 1]; //green
      let b = frame.data[i + 2]; //blue

      if (r >= 0 && r < 100 && g > 110 && g < 250 && b > 20 && b < 120) 
      {  
          frame.data[i] = frame2.data[i];
          frame.data[i + 1] = frame2.data[i + 1];
          frame.data[i + 2] = frame2.data[i + 2];
        //frame.data[i + 3] = 0; //alpha
      }
    }
    ctx1.putImageData(frame, 0, 0);
    setTimeout(computeFrame, 0);
  }

    document.addEventListener("DOMContentLoaded", () => {
      init();
    });
