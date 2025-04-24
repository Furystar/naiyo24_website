// document.addEventListener('DOMContentLoaded', () => {
//     const dropdowns = document.querySelectorAll('.dropdown');

//     dropdowns.forEach(dropdown => {
//         dropdown.addEventListener('click', () => {
//             dropdown.classList.toggle('active');
//         });
//     });

//     const hamburger = document.getElementById('hamburger');
//     const navLinks = document.getElementById('nav-links');

//     hamburger.addEventListener('click', () => {
//         navLinks.classList.toggle('active');
//         hamburger.classList.toggle('active');
//     });

//     // Close the navbar when a link is clicked (for mobile)
//     const navMenuLinks = document.querySelectorAll('.nav-menu a');
//     navMenuLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             if (navLinks.classList.contains('active')) {
//                 navLinks.classList.remove('active');
//                 hamburger.classList.remove('active');
//             }
//         });
//     });
// });