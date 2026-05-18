/*
    Formula Drift Fan Project, (C) 2026 Nyoman Raden
    This webpage is "free software": you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This webpage is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this webpage source. If not, see <https://www.gnu.org/licenses/>.

    External media (images, videos) are courtesy of Formula Drift Holdings LLC
    and remain their property. All rights reserved.
*/
const is_touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

document.addEventListener("DOMContentLoaded", () => {
    /* Section fade-in/out logic */
    const sections = document.querySelectorAll("div");

    const observer_in = new IntersectionObserver((entries) => { // show sections when they are scrolled into view
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } 
        });
    }, { threshold: 0.3 }); // triggers when 30% of section is visible

    const observer_out = new IntersectionObserver((entries) => { // hide sections when they are scrolled out of view
        entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.classList.remove("visible");
        }
        });
    }, { threshold: 0.1 }); // triggers when less than 10% of section is visible

    sections.forEach(section => observer_in.observe(section));
    sections.forEach(section => observer_out.observe(section));

    /* Navbar hide/show logic */
    const header = document.querySelector("header");
    const btn_toggle = document.getElementById("menu-toggle");

    // Toggle navbar visibility when menu button is clicked
    btn_toggle.addEventListener("click", () => {
        if (header.classList.contains("hidden")) { header.classList.remove("hidden"); }
        else { header.classList.add("hidden"); }
    });

    // Hide navbar after 10 seconds
    setTimeout(() => {
        header.classList.add("hidden");
    }, 10000);

    // Hide navbar when scrolling down, show when scrolling up
    let last_scroll = window.scrollY;
    window.addEventListener("scroll", () => {
        const current_scroll = window.scrollY;

        if (current_scroll > last_scroll) { header.classList.add("hidden"); }
        else { header.classList.remove("hidden");}

        last_scroll = current_scroll;
    });
});

function do_redirect(href) {
    event.preventDefault(); // prevent default link behavior
    document.body.style.opacity = 0; // fade out effect
    setTimeout(() => {
        window.location.href = href; // navigate after fade out
    }, 500); // match the CSS transition duration
}

function show_overlay(driver_id, event) {
    if (is_touch) { return; } // disable overlay on touchscreen devices
    const overlay = document.getElementById(driver_id);

    // Show overlay
    overlay.style.display = "block";

    // Position overlay near cursor
    overlay.style.top = event.clientY + 5 + "px"; // 5px offset to avoid cursor overlap
    overlay.style.left = event.clientX + 5 + "px";

    // Update position while moving
    event.currentTarget.addEventListener("mousemove", e => {
        overlay.style.top = e.clientY + 5 + "px";
        overlay.style.left = e.clientX + 5 + "px";
    });
}

function hide_overlay(driver_id) {
    if (is_touch) { return; } // disable overlay on touchscreen devices
    const overlay = document.getElementById(driver_id);

    // Hide overlay
    overlay.style.display = "none";

    // Remove mousemove listener when leaving
    overlay.parentElement.removeEventListener("mousemove", () => {});
}