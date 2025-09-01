const faceOffSetX = 0.5;
const faceOffSetY = 0.2;

const arrow = document.querySelector("#arrow-wrapper img")
const target = document.querySelector("#greeting-photo")

function pointArrow(){
    const arrowRect = arrow.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    //arrow center
    const arrowX = arrowRect.left + arrowRect.width / 2;
    const arrowY = arrowRect.top + arrowRect.height / 2;

    //face center
    const targetX = targetRect.left + targetRect.width * faceOffSetX;
    const targetY = targetRect.top + targetRect.height * faceOffSetY;

    //calculate angle
    const dx = targetX - arrowX;
    const dy = targetY - arrowY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    arrow.style.transform = `rotate(${angle}deg)`
}

    window.addEventListener('resize', pointArrow);
    window.addEventListener('load', pointArrow);
