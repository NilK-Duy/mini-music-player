const songList = [
  {
    name: "Some Thing Just Like This",
    artist: "The Chainsmokers & Coldplay",
    src: "assets/songs/something-just-like-this.mp3",
    cover: "assets/images/something-just-like-this.png"
  },
  {
    name: "Reality",
    artist: "Lost Frequencies",
    src: "assets/songs/reality.mp3",
    cover: "assets/images/reality.png"
  },
  {
    name: "There's Nothing Holdin' Me Back",
    artist: "Shawn Mendes",
    src: "assets/songs/there-nothing-holding-me-back.mp3",
    cover: "assets/images/there-nothing-holding-me-back.png"
  },
  {
    name: "Summertime",
    artist: "K-391",
    src: "assets/songs/summertime.mp3",
    cover: "assets/images/summertime.png"
  },
  {
    name: "That's Girl",
    artist: "Olly Murs",
    src: "assets/songs/that-girl.mp3",
    cover: "assets/images/that-girl.png"
  },
  {
    name: "Shape Of You",
    artist: "Ed Sheeran",
    src: "assets/songs/shape-of-you.mp3",
    cover: "assets/images/shape-of-you.png"
  }
]

const artistName = document.querySelector('.artist-name')
const musicName = document.querySelector('.song-name')
const fillBar = document.querySelector('.fill-bar')
const time = document.querySelector('.time')
const prog = document.querySelector('.progress-bar')

const cover = document.getElementById('cover')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const randomBtn = document.getElementById('random')
const repeatBtn = document.getElementById('repeat')

let song = new Audio()
let currentSong = 0
let playing = false
let isRandom = false
let isRepeat = false

document.addEventListener('DOMContentLoaded', () => {
  loadSong(currentSong)
  randomBtn.addEventListener('click', toggleRandomSong)
  repeatBtn.addEventListener('click', toggleRepeatSong)
  song.addEventListener('timeupdate', updateProgress)
  if (isRepeat) {
    song.addEventListener('ended', playMusic)
  } else {
    song.addEventListener('ended', nextSong)
  }
  prevBtn.addEventListener('click', prevSong)
  nextBtn.addEventListener('click', nextSong)
  playBtn.addEventListener('click', togglePlayPause)
  prog.addEventListener('click', seek)
})

function loadSong(index) {
  const { name, artist, src, cover: thumb } = songList[index]
  artistName.innerText = artist
  musicName.innerText = name
  song.src = src
  cover.style.backgroundImage = `url(${thumb})`
}

function updateProgress() {
  if(song.duration) {
    const pos = (song.currentTime / song.duration) * 100
    fillBar.style.width = `${pos}%`

    const duration = formatTime(song.duration)
    const currentTime = formatTime(song.currentTime)
    time.innerText = `${currentTime} - ${duration}`
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

function togglePlayPause() {
  if (playing) {
    song.pause()
  } else {
    song.play()
  }
  playing = !playing
  playBtn.classList.toggle('fa-pause', playing)
  playBtn.classList.toggle('fa-play', !playing)
  cover.classList.toggle('active', playing)
}

function nextSong() {
  currentSong = (currentSong + 1) % songList.length
  playMusic()
}

function prevSong() {
  currentSong = (currentSong - 1 + songList.length) % songList.length
  playMusic()
}

function playMusic() {
  loadSong(currentSong)
  song.play()
  playing = true
  playBtn.classList.add('fa-pause')
  playBtn.classList.remove('fa-play')
  cover.classList.add('active')
}

function toggleRandomSong() {
  isRandom = !isRandom
  randomBtn.classList.toggle('active', isRandom)
}

function toggleRepeatSong() {
  isRepeat = !isRepeat
  repeatBtn.classList.toggle('active', isRepeat)
}

function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration
  song.currentTime = pos
}

function playRandomSong() {
  let newIndex
  do {
    newIndex = Math.floor(Math.random() * songList.length)
  } while (newIndex === currentSong)
  currentSong = newIndex
  playMusic()
}
