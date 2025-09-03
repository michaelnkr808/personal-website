let sections = Array.from(document.querySelectorAll("section[id]"))
const headerOffset = 0;

function currentSectionByTop(offset = 0){
    for(let i =0; i<sections.length; i++){
        if(sections[i].getBoundingClientRect().top >= -offset) return i;
    }
    return sections.length - 1;
}

function scrollToNextSection(){
    const currentSection = currentSectionByTop(headerOffset);
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start"});

}

document.getElementById("intro-next-button").addEventListener("click", scrollToNextSection)