const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children)
const nextButton = document.querySelector(".carousel-button--right");
const prevButton = document.querySelector(".carousel-button--left");
const navDots = document.querySelector(".carousel-nav");
const dotsArr = Array.from(navDots.children);
const slideWidth = slides[0].getBoundingClientRect().width;
const projectText = document.querySelector(".project-text");

const projDescriptions = [
  {
    title: "Python Remote Access Tool",
    body: `Developed a lightweight client–server application in Python to explore network programming and socket-based communication. 

    - Implemented socket programming for persistent connections between server and clients.
    - Built a command-line interface to manage client sessions
    - Designed basic functionality for file transfer and remote command execution.

    This project deepened my understanding of network security concepts, client–server architecture, and Python’s standard library for networking.
    (Click the image to learn more)`
  },
  {
    title: "Python Chat App",
    body: `Built a server-client chatroom where multiple clients can connect simultaneously and exchange messages in real time.

    - Implemented threading on the server to handle multiple active connections concurrently.
    - Added broadcasting functionality so that messages from one client are relayed to all connected clients, simulating a shared group chatroom.
    - Gained experience with socket programming, concurrent programming (threads), and network communication protocols.
    
    This project strengthened my understanding of socket programming, TCP/IP communication, and real-time client-server architecture.
    It also gave me practical experience with concurrent programming using threads, implementing broadcasting systems for multi-client messaging, and applying error handling techniques to ensure stable connections and clean shutdowns.
    (Click the image to learn more)`
  },
  {
    title: "project 3",
    body: `Details coming soon.`
  }
];



const updateText = function(projectText, slideIndex,){ 
    const item = projDescriptions[slideIndex] || { title: "", body: ""};
    projectText.dataset.title = item.title || "";
    projectText.textContent = item.body || "";
}

const setStylePosition = function(slide, index){
    slide.style.left = slideWidth * index + "px";
};
slides.forEach(setStylePosition);
updateText(projectText, 0);


const moveToSlide = function(track, currentSlide, targetSlide){

    track.style.transform = "translateX(-" + targetSlide.style.left + ")"
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

const updateDots = function(currentDot, targetDot){
    currentDot.classList.remove("current-slide");
    targetDot.classList.add('current-slide');
}

const displayArrows = function(slides, prevButton, nextButton, targetIndex){
    if(targetIndex === 0){
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove('is-hidden');
    }else if(targetIndex === slides.length - 1){
        prevButton.classList.remove("is-hidden");
        nextButton.classList.add("is-hidden");
    }else{
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
}

prevButton.addEventListener('click', function(){
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navDots.querySelector('.current-slide');
    const previoustDot = currentDot.previousElementSibling
    const slideIndex = slides.findIndex(function(slide){ 
        return slide === prevSlide;
    });

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, previoustDot)
    displayArrows(slides, prevButton, nextButton, slideIndex)
    updateText(projectText, slideIndex)

})

nextButton.addEventListener('click', function(){
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navDots.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling
    const slideIndex = slides.findIndex(function(slide){ 
        return slide === nextSlide;
    });

    
    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot)
    displayArrows(slides, prevButton, nextButton, slideIndex)
    updateText(projectText, slideIndex)
})

navDots.addEventListener('click', function(e){
    const targetDot = e.target.closest("button");
    
    if(!targetDot) return;

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = navDots.querySelector(".current-slide");
    const targetIndex = dotsArr.findIndex(function(dot){ 
        return dot === targetDot;
    });
    const targetSlide = slides[targetIndex]

    
    moveToSlide(track, currentSlide, targetSlide)
    updateDots(currentDot, targetDot)
    displayArrows(slides, prevButton, nextButton, targetIndex)
    updateText(projectText, targetIndex)
})