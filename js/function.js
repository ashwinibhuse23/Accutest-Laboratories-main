(function ($) {
    "use strict";

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect */
    $window.on('load', function () {
        $(".preloader").fadeOut(600);
    });

    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function () {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.main-header").css("height", $('header .header-sticky').outerHeight());
        }

        $window.on("scroll", function () {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header .header-sticky').outerHeight()
            $("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }

    /* Slick Menu JS */
    $('#menu').slicknav({
        label: '',
        prependTo: '.responsive-menu'
    });

    if ($("a[href='#top']").length) {
        $(document).on("click", "a[href='#top']", function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    }

    /* Hero Slider Layout JS */
    const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
        effect: 'fade',
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
    });

    /* testimonial Slider JS */
    if ($('.testimonial-slider').length) {
        const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 1,
                }
            }
        });
    }

    /* Skill Bar */
    if ($('.skills-progress-bar').length) {
        $('.skills-progress-bar').waypoint(function () {
            $('.skillbar').each(function () {
                $(this).find('.count-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        }, {
            offset: '70%'
        });
    }

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 6,
            duration: 3000
        });
    }

    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

    /* Text Effect Animation */
    if ($('.text-anime-style-1').length) {
        let staggerAmount = 0.05,
            translateXValue = 0,
            delayValue = 0.5,
            animatedTextElements = document.querySelectorAll('.text-anime-style-1');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.words, {
                duration: 1,
                delay: delayValue,
                x: 20,
                autoAlpha: 0,
                stagger: staggerAmount,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-2').length) {
        let staggerAmount = 0.03,
            translateXValue = 20,
            delayValue = 0.1,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll('.text-anime-style-2');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValue,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-3').length) {
        let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

        animatedTextElements.forEach((element) => {
            //Reset if needed
            if (element.animation) {
                element.animation.progress(1).kill();
                element.split.revert();
            }

            element.split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });
            gsap.set(element, {
                perspective: 400
            });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%"
                },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: 0.02,
            });
        });
    }

    /* Parallaxie js */
    var $parallaxie = $('.parallaxie');
    if ($parallaxie.length && ($window.width() > 991)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }

    /* Zoom Gallery screenshot */
    $('.gallery-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({
        focus: false
    }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: $contactform.serialize(),
            success: function (text) {
                if (text === "success") {
                    formSuccess();
                } else {
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Message Sent Successfully!")
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */

    /* Animated Wow Js */
    new WOW().init();

    /* Popup Video */
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

    /* Services Item Active Start */
    var $service_list = $('.service-list');
    if ($service_list.length) {
        var $service_item = $service_list.find('.service-item');

        if ($service_item.length) {
            $service_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Services Item Active End */

})(jQuery);
const milestones = [
    { year: "2005", text: "Ahmedabad and Vadodara operations were started." },
    { year: "2009", text: "Successfully cleared first 2 USFDA inspections." },
    { year: "2014", text: "Started CDS Services and expanded operations." },
    { year: "2017", text: "Added 125 beds at Gandhinagar facility." },
    { year: "2019", text: "Biologics Laboratory initiated in 2013." },
    { year: "2023", text: "Started Pre-clinical Services at new facility." },
    { year: "2025", text: "Completed 140+ global regulatory inspections." }
];

let currentIndex = 0;

// DOM ELEMENTS
const yearEl = document.getElementById("year");
const textEl = document.getElementById("text");
const contentBox = document.getElementById("contentBox");
const yearList = document.querySelectorAll("#yearList div");

/* --- UPDATE CONTENT WITH ANIMATION --- */
function updateContent(index) {
    if (!contentBox) return; // Guard clause

    contentBox.classList.add("fadeSlide");

    setTimeout(() => {
        if (yearEl) yearEl.textContent = milestones[index].year;
        if (textEl) textEl.textContent = milestones[index].text;

        yearList.forEach(y => y.classList.remove("active"));
        if (yearList[index]) yearList[index].classList.add("active");

        contentBox.classList.remove("fadeSlide");
    }, 300);
}

/* --- SCROLL TO CHANGE YEAR --- */
if (contentBox) {
    window.addEventListener("wheel", function (event) {
        if (event.deltaY > 0) currentIndex++;
        else currentIndex--;

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > milestones.length - 1) currentIndex = milestones.length - 1;

        updateContent(currentIndex);
    });
}

/* --- CLICK RIGHT SIDE YEARS --- */
if (yearList.length > 0) {
    yearList.forEach(item => {
        item.onclick = () => {
            let index = item.getAttribute("data-index");
            currentIndex = Number(index);
            updateContent(currentIndex);
        };
    });
}
/* Scrolling Ticker Section --*/
const items = document.querySelectorAll(".timeline-item");

function checkTimeline() {
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            item.classList.add("show");
        }
    });
}


window.addEventListener("scroll", checkTimeline);
checkTimeline();
/* Scrolling Ticker Section End --*/

/*BA/BE services in numbers--*/

/*BA/BE services in numbers--*/

const numbers = document.querySelectorAll(".value");

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const num = entry.target;
            const animate = () => {
                const target = +num.getAttribute("data-target");
                let count = +num.innerText.replace(/,/g, ''); // Handle existing commas if any

                const speed = 40;
                const increment = Math.ceil(target / 100);

                if (count < target) {
                    num.innerText = count + increment;
                    setTimeout(animate, speed);
                } else {
                    // Final formatting
                    if (target === 3500) num.innerText = "3,500+";
                    else if (target === 45000) num.innerText = "45,000+";
                    else num.innerText = target.toLocaleString();
                }
            };
            animate();
            observer.unobserve(num);
        }
    });
}, {
    threshold: 0.5
});

numbers.forEach(num => {
    counterObserver.observe(num);
});




//05. Scrolling Ticker


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".zigzag-timeline .timeline-item");

    items.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? "left" : "right");
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
});



document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        
        // Optional: Close other open items (Accordion effect)
        /*
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        */

        item.classList.toggle('active');
        
        // Toggle the icon text
        const icon = header.querySelector('.icon-toggle');
        if (item.classList.contains('active')) {
            icon.textContent = '−';
        } else {
            icon.textContent = '+';
        }
    });
});