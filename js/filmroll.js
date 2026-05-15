

document.addEventListener('DOMContentLoaded', () => {

    // rough.js — canister
    const canisterSvg = document.querySelector('.filmcanister')
    const rcCanister = rough.svg(canisterSvg)
  
    Array.from(canisterSvg.querySelectorAll('path')).forEach((p) => {
        const d = p.getAttribute('d')
        const originalFill = p.getAttribute('fill')
        const roughNode = rcCanister.path(d, {
            roughness: 0.6,
            stroke: '#111',
            strokeWidth: 1,
            fill: originalFill,
            fillStyle: originalFill === 'white' ? 'solid' : 'zigzag',
            fillWeight: 2,
            hachureGap: 4
        })
        canisterSvg.appendChild(roughNode)
        p.remove()
    })
    
    // rough.js — film roll
    const rollSvg = document.querySelector('.filmroll')
    const rcRoll = rough.svg(rollSvg)
    
    Array.from(rollSvg.querySelectorAll('path')).forEach((p) => {
        const d = p.getAttribute('d')
        const originalFill = p.getAttribute('fill')
        const isRoundedRect = p.getAttribute('stroke-width') === '3'
        const roughNode = rcRoll.path(d, {
            roughness: 0.6,
            stroke: '#111',
            strokeWidth: isRoundedRect ? 3 : 1,
            fill: originalFill,
            fillStyle: isRoundedRect ? 'solid' : 'zigzag',
            fillWeight: 2,
            hachureGap: 4
        })
        rollSvg.appendChild(roughNode)
        p.remove()
    })

    // elements
    const target = document.querySelector('.filmroll-container')
    const filmContainer = document.querySelector('.film-container')
    const filmWrapper = document.querySelector('.film-wrapper')
    const canister = document.querySelector('.filmcanister-container')
    const bioChunks = document.querySelectorAll('.bio-chunk')

    const totalFrames = bioChunks.length
    const startX = -580
    const endX = 0
    let currentX = startX

    // phase split — wrapper stops moving at this percent of the drag
    const splitPercent = 0.7

    gsap.set(target, { x: startX })
    let wrapperRange = getWrapperRange()

    let initialWrapperX = getInitialWrapperX()

function getInitialWrapperX() {
    return -startX / 2  // or whatever your centering logic should be
}

function getWrapperRange() {
    const aboutRect = document.querySelector('#about').getBoundingClientRect()
    const wrapperRect = filmWrapper.getBoundingClientRect()
    return -(wrapperRect.left - aboutRect.left)
}
    gsap.set(filmWrapper, { x: initialWrapperX })   

    function getWrapperRange() {
        const aboutRect = document.querySelector('#about').getBoundingClientRect()
        const wrapperRect = filmWrapper.getBoundingClientRect()
        return -(wrapperRect.left - aboutRect.left)
    }


    let filmRect = filmContainer.getBoundingClientRect()
    let canisterWidth = canister.getBoundingClientRect().width

    window.addEventListener('resize', () => {
        filmRect = filmContainer.getBoundingClientRect()
        canisterWidth = canister.getBoundingClientRect().width
        wrapperRange = getWrapperRange()
        initialWrapperX = getInitialWrapperX()
        
        updateWrapper(currentX)
    })

    function updateText(x) {
        bioChunks.forEach((chunk, i) => {
            const frameProgress = i / (totalFrames - 1)
            const frameX = startX + frameProgress * (endX - startX)
            const delta = x - frameX
            chunk.style.transform = `translate(-50%, -50%) translateX(${-delta}px)`
            const normalized = Math.abs(delta) / (endX - startX)
            chunk.style.opacity = 1 - Math.min(normalized * 3, 1)
        })
    }

    function updateWrapper(x) {
        const percent = (x - startX) / (endX - startX)
        const wrapperPercent = Math.min(percent, splitPercent) / splitPercent
        gsap.set(filmWrapper, { x: initialWrapperX + wrapperPercent * wrapperRange })
    }

    updateText(currentX)
    updateWrapper(currentX)

    filmContainer.addEventListener('mousemove', (e) => {
        const scrollHint = document.querySelector('.scroll-hint')
        if (scrollHint) scrollHint.classList.add('hidden')
        
        filmRect = filmContainer.getBoundingClientRect()
        canisterWidth = canister.getBoundingClientRect().width
    
        const rollStart = filmRect.left + canisterWidth
        const rollWidth = filmRect.width - canisterWidth
        const percent = Math.max(0, Math.min(1, (e.clientX - rollStart) / rollWidth))
        const targetX = startX + percent * (endX - startX)
        gsap.set(target, { x: targetX })
        currentX = targetX
        updateText(currentX)
        updateWrapper(currentX)
    })

    function resetFilm() {
        if (scrollHint) scrollHint.classList.remove('hidden')

        gsap.killTweensOf(target)
        gsap.killTweensOf(filmWrapper)
        gsap.to(target, {
            x: startX,
            duration: 0.6,
            ease: "power3.inOut",
            onUpdate: () => {
                currentX = gsap.getProperty(target, "x")
                updateText(currentX)
                updateWrapper(currentX)
            },
            onComplete: () => {
                gsap.set(target, { x: startX })
                gsap.set(filmWrapper, { x: initialWrapperX })
                currentX = startX
                updateText(currentX)
                updateWrapper(currentX)
            }
        })
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", () => resetFilm())
    })
})
