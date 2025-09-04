let sections = Array.from(document.querySelectorAll("section[id]"))

function getOwnerSection(clickedElement){
    return clickedElement.closest("section")
}

function scrollToNextSection(event){
    const button = event.currentTarget
    const ownerSection = getOwnerSection(button)
    let currentSection = sections.indexOf(ownerSection)

    let nextSection = Math.min(currentSection + 1, sections.length - 1);
    sections[nextSection].scrollIntoView({ behavior: "smooth", block: "start"});

}

let nextBtn = document.getElementsByClassName("next-button")
for(let element of nextBtn){
    element.addEventListener("click", scrollToNextSection)
}
    