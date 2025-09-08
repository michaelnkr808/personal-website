const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children)
const nextButton = document.querySelector(".carousel-button--right");
const prevButton = document.querySelector(".carousel-button--left");
const navDots = document.querySelector(".carousel-nav");
const dotsArr = Array.from(navDots.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setStylePosition = function(slide, index){
    slide.style.left = slideWidth * index + "px";
};
slides.forEach(setStylePosition);

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
    if (targetIndex === 0){
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

})