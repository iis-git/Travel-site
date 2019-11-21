import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
    constructor() {
        this.mainHeader = document.querySelector(".main-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.browserHeight = window.innerHeight
        this.previousScrollY = window.scrollY
        this.events()
    }

    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight
        }, 330))
    }

    runOnScroll() {

        this.determineScrollDirection()

        if (window.scrollY > 60) {
            this.mainHeader.classList.add("main-header--dark")
        } else {
            this.mainHeader.classList.remove("main-header--dark")
        }

        this.pageSections.forEach(el => this.calcSection(el))
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down'
        } else {
            this.scrollDirection = 'up'
        }
        this.previousScrollY = window.scrollY
    }

    calcSection(el) {
        if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100
            if (scrollPercent < 50 && scrollPercent > -0.1 && this.scrollDirection =='down' || scrollPercent < 50 && this.scrollDirection == 'up') {
                let matchingLink = el.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
                document.querySelector(matchingLink).classList.add("is-current-link")

            } else {
                if (window.scrollY < 1000 && this.scrollDirection == 'up') {
                    document.querySelectorAll(`.primary-nav a`).forEach(el => el.classList.remove("is-current-link"))
                }
            }
        }
    }
}

export default StickyHeader