// Target all 
const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video-container video');

  // Sounds
  const sounds = document.querySelectorAll('.sound-picker button');

  // Time Display
  const timeDisplay = document.querySelector('.time-display');

  const timeSelect = document.querySelectorAll('.time-select button');


  // Get the length of the outline
  const outlineLength = outline.getTotalLength();
  // console.log(outlineLength);

  // Duration
  let fakeDuration = 600;


  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds
  sounds.forEach(sound => sound.addEventListener('click', function () {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  }))

  // Play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // Select sound
  timeSelect.forEach(button => button.addEventListener('click', function () {
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}${Math.floor(fakeDuration % 60)}`

  }

  ))






  // Function to play and stop song
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg'
    }
  };

  // animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    // Elapse time
    let elapsed = fakeDuration - currentTime;
    // Seconds and minutes to animate text
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate progress circle bar
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate text
    timeDisplay.textContent = `${minutes}:${seconds}`;


    // Resets the song back to zero when finished
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  }

}

app();