class MobileMenu {
    constructor() {
        this.menuIcon = document.querySelector(".main-header__menu-icon")
        this.menuContent = document.querySelector(".main-header__menu-content")
        this.mainHeader = document.querySelector(".main-header")
        this.mainLogo = document.querySelector(".main-header__logo")

        this.events()
    }
    events() {
        this.menuIcon.addEventListener("click", () => this.toggleTheMenu())
    }
    toggleTheMenu() {
        this.menuContent.classList.toggle("main-header__menu-content--is-visible")
        this.mainHeader.classList.toggle("main-header--is-expanded")
        this.mainLogo.classList.toggle("main-header__logo--scale-down")
        this.menuIcon.classList.toggle("main-header__menu-icon--close-x")
    }
}
export default MobileMenu;