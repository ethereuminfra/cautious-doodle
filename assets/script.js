window.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.mwg_effect041 .item')

    items.forEach(item => {
        wrapLettersInSpan(item.querySelector('.hidden'))
        wrapLettersInSpan(item.querySelector('.visible'))

        item.addEventListener('mouseover', (e) => {
            
            if(!gsap.isTweening(item.querySelectorAll('.visible span')) && item.classList.contains('hovered')) {
                item.classList.remove('hovered')
            } 

            if(e.target.classList.contains('letter')) { // If a letter is hovered
                // Mark the item as hovered
                item.classList.add('hovered')
                // Get the index of the first hovered letter
                const indexHover = getChildIndex(e.target)

                gsap.to(item.querySelectorAll('.visible span'), {
                    yPercent: 100, // Moves each element vertically by 100% of its height
                    ease: 'back.out(2)', // Slight bounce at the end of the movement
                    duration: 0.6, // Total animation duration for each element
                    stagger: {
                        each: 0.023, // Delay between the start of each element's animation
                        from: indexHover // Sets the starting point for the stagger
                    }
                })
                gsap.to(item.querySelectorAll('.hidden span'), {
                    yPercent: 100, // Moves each element vertically by 100% of its height
                    ease: 'back.out(2)', // Slight bounce at the end of the movement
                    duration: 0.6, // Total animation duration for each element
                    stagger: {
                        each: 0.023, // Delay between the start of each element's animation
                        from: indexHover // Sets the starting point for the stagger
                    },
                    onComplete: () => {
                        // Reset items
                        gsap.set(item.querySelectorAll('.visible span'), {clearProps: 'all'})
                        gsap.set(item.querySelectorAll('.hidden span'), {clearProps: 'all'})
                    }
                })
            }
        })
    })
})

// UTIL METHODS
function wrapLettersInSpan(element) {
    const text = element.textContent;
    element.innerHTML = text
        .split('')
        .map(char => char === ' ' ? '<span>&nbsp;</span>' : `<span class="letter">${char}</span>`)
        .join('');
}
// Returns the index of the element relative to all its siblings
function getChildIndex(child) {
    return Array.from(child.parentNode.children).indexOf(child);
}



window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector('.mwg_effect030')
    const listElement = root.querySelector('.mwg_effect030 ul')
    const rows = listElement.querySelectorAll('li')
    const mediaContainer = root.querySelector('.mwg_effect030 .media-container')

    const mediasUrl = []
    root.querySelectorAll('.medias img').forEach(img => {
        mediasUrl.push(img.getAttribute('src'))
    })

    listElement.addEventListener('mouseenter', () => {
        mediaContainer.classList.add('on') // I display the container on hover of the list
    })
    listElement.addEventListener('mouseleave', () => {
        mediaContainer.classList.remove('on') // I hide the container
        Array.from(mediaContainer.children).forEach(el => {
            el.remove() // I empty the content of media-container
        })
    })
    
    gsap.set(mediaContainer, {yPercent: -50})

    // yTo is attached to the y property of media-container
    const yTo = gsap.quickTo(mediaContainer, 'y', {
        duration: 0.5, // Duration of the update of the y value
        ease: 'power4' // Non-linear update
    })
    
    listElement.addEventListener('mousemove', (e) => {
        yTo(e.clientY + window.scrollY)
    })

    rows.forEach((row, index) => {
        row.addEventListener('mouseenter', () => {
            createMedia(index)
        })
    })
    
    function createMedia(index) {
        let div = document.createElement("div")
        let image = document.createElement("img")

        image.src = mediasUrl[index] // Url corresponding to the index parameter
        div.appendChild(image) // The created image becomes the child of div
        mediaContainer.appendChild(div) // The div created becomes the child of media-container

        gsap.to([div, image], {
            y: 0, // Move both elements to 0
            duration: 0.6, // During 0.6s
            ease:'expo.inOut' // With an expo ease
        })

        if(mediaContainer.children.length > 20) {
            // I target the first image in the container and remove it from the DOM
            mediaContainer.children[0].remove()
        }
    }
})


gsap.registerPlugin(Observer)

let total = 0,
    xTo,
    itemValues = []

window.addEventListener("DOMContentLoaded", () => {

    const content = document.querySelector('.mwg_effect008 .container')
    const cards = document.querySelectorAll('.mwg_effect008 .card')
    const cardsLength = cards.length / 2
    const half = content.clientWidth / 2

    const wrap = gsap.utils.wrap(-half, 0);

    xTo = gsap.quickTo(content, "x", {
        duration: 0.5, // Will transition over 0.5s
        ease: 'power3', // Non-linear
        modifiers: {
            x: gsap.utils.unitize(wrap),
        },
    });

    // Generate an array of random values between -10 and 10
    for (let i = 0; i < cardsLength; i++) {
        itemValues.push((Math.random() - 0.5) * 20);
    }

    // Create a GSAP timeline and keep it paused initially
    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
        // Rotate each card using a precomputed random value
        rotate: (index) => (itemValues[index % cardsLength]),
        // Move each card horizontally based on the same random value
        xPercent: (index) => (itemValues[index % cardsLength]),
        // Move each card vertically based on the same random value
        yPercent: (index) => (itemValues[index % cardsLength]),
        // Slightly scale down the cards
        scale: 0.95,
        duration: 0.5,
        ease: 'back.inOut(3)', // Non-linear
    })

    Observer.create({
        target: content,
        type: "pointer,touch", // Detect both pointer and touch events
        onPress: () => tl.play(), // Play the timeline when pressing down
        onDrag: (self) => { // Update the horizontal position while dragging
            total += self.deltaX
            xTo(total)
        },
        onRelease: () => { // Reverse the timeline when releasing the pointer
            tl.reverse()
        },
        onStop: () => { // Reverse the timeline when the interaction stops
            tl.reverse()
        },
    })

    gsap.ticker.add(tick);

    // TO GO FURTHER: You can add an offscreen check and kill Observer when necessary
});

function tick(time, deltaTime) {
    total -= deltaTime / 10  // Adjust the speed of automatic scrolling    
    xTo(total)
}


window.addEventListener("DOMContentLoaded", () => {
    // Modifies the CSS variable --xpercent
    const xTo = gsap.quickTo('.mwg_effect044 .duplicate', '--xpercent', {
        duration: 0.4, // Changes over 0.4s
        ease: "back" // With a slight bounce at the end of the movement
    })

    // Modifies the CSS variable --ypercent
    const yTo = gsap.quickTo('.mwg_effect044 .duplicate', '--ypercent', {
        duration: 0.4, // Changes over 0.4s
        ease: "back" // With a slight bounce at the end of the movement
    })

    document.querySelector('.mwg_effect044').addEventListener("mousemove", (e) => {  
        // Maps the mouse's X position from the window width range (0 to innerWidth)  
        // to a normalized range (0 to 100)  
        const mRangeX = gsap.utils.mapRange(0, window.innerWidth, 0, 100, e.clientX)  
    
        // Update the X position smoothly  
        xTo(mRangeX)
    
        // Maps the mouse's Y position relative to the element’s bounding box  
        // to a normalized range (0 to 100)  
        const bound = e.target.getBoundingClientRect()  
        const mRangeY = gsap.utils.mapRange(bound.top, bound.top + bound.height, 0, 100, e.clientY)  
    
        // Update the Y position smoothly  
        yTo(mRangeY)
    })
})