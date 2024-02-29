togglebutton();
// switch from dark to light mode
function togglebutton() {
    const toggle = document.getElementById('mode-toggle');
    toggle.addEventListener('click', function () {
        const body = document.body;
        body.classList.toggle('light-mode');
        toggle.innerText = body.classList.contains('light-mode') ? '🌜' : '🌞';
        console.log('Dark mode toggled');

    });
}
