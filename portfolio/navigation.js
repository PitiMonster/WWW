let nav_btn = document.getElementById("navi__btn")
let nav_check = document.getElementById("naw_check")

nav_btn.addEventListener("click", (event) => {
    event.stopPropagation()
    event.preventDefault();
    nav_check.checked = !nav_check.checked
})
