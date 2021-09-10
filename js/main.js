let navbar = document.getElementById('navbar');
let menu = document.querySelector('.menu');
// Start working with the Navbar 

// the background-color Function
let changeBackground = function () {
    let logoLight = document.getElementById('logo-light');
    let logoDark = document.getElementById('logo-dark');
    if (window.scrollY >= 80) {
        navbar.classList.add('light-background', 'shadow');
        navbar.querySelectorAll('.line').forEach(line => {
            line.style.background = '#555';
        });
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
    } else {
        navbar.classList.remove('light-background', 'shadow');
        navbar.querySelectorAll('.line').forEach(line => {
            line.style.background = '#fff';
        });
        logoLight.style.display = 'block';
        logoDark.style.display = 'none';
    }
}

changeBackground();

document.addEventListener('scroll', () => changeBackground())

// End of the background-color Function


let navbarFun = function (anchor, element) {
    let ele = document.getElementById(anchor.getAttribute('href').replace('#', ''));
    // Scroll to section with click event and change the color of the anchor link
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (element == menu) {
            if (document.querySelector('.menu').classList.value.includes('open')) {
                document.querySelector('.menu').classList.remove('open');
                document.querySelector('.mobile').classList.remove('open');
            }
        }
        element.querySelector(".active").classList.remove('active')
        anchor.classList.add('active');
        window.scrollTo({
            top: ele.offsetTop - navbar.clientHeight,
            behavior: 'smooth',
        });
    });
    // End scroll to section with click event and change the color of the anchor link


    // Change the color of the anchor link with scroll event 
    document.addEventListener('scroll', () => {
        if (window.pageYOffset >= ele.offsetTop - navbar.clientHeight) {
            element.querySelector(".active").classList.remove('active')
            anchor.classList.add('active');
        }
    });
    // End change the color of the anchor link with scroll event 
}

navbar.querySelectorAll('a').forEach(anchor => navbarFun(anchor, navbar));

menu.querySelectorAll('a').forEach(anchor => navbarFun(anchor, menu));


// Start responsive navbar
navbar.querySelector('.mobile').addEventListener('click', function () {
    this.classList.toggle('open')
    menu.classList.toggle('open')
})
// End responsive navbar
// End working with the Navbar 

// to make the header centered
document.querySelector('.header h1').style.paddingTop = (navbar.clientHeight - 10) + 'px';


// Start working with the Work-cards 
let workCards = document.querySelector('.work-cards');
let cardContainer = workCards.querySelectorAll('.card-container');
let spanEle = workCards.querySelectorAll('span');
let actions = spanEle.forEach(spn => {
    spn.addEventListener('click', function () {
        spanEle.forEach(spans => spans.style.color = '#888')
        spn.style.color = '#f5af00';
        if (spn.classList.contains('all')) {
            cardContainer.forEach(card => card.classList.remove('hide'));
        } else {
            cardContainer.forEach(card => {
                card.classList.add('hide')
                if (card.classList.contains(spn.classList.value)) {
                    card.classList.remove('hide');
                }
            });
        }
    });
});

let images = [];
let imagePreview = document.querySelector('.image-preview');
let imgElePreview = imagePreview.querySelector('img');
let imgIndx;
cardContainer.forEach(card => {
    let img = card.querySelector('img');
    images.push(img.src)
    card.querySelectorAll('.preview').forEach(preview => {
        preview.addEventListener('click', () => {
            imgElePreview.src = img.src;
            imgIndx = images.indexOf(img.src) + 1;
            imagePreview.querySelector('.imgIndx').innerHTML = imgIndx + ' of ' + images.length;
            imagePreview.style.display = 'block';
        });
    })
});

imagePreview.querySelector('.content').addEventListener('click', (e) => e.stopPropagation())
imagePreview.addEventListener('click', (e) => imagePreview.style.display = 'none')

let setIndex = function () {
    imgElePreview.src = images[imgIndx - 1];
    imagePreview.querySelector('.imgIndx').innerHTML = imgIndx + ' of ' + images.length;
}

let next = function () {
    imgIndx = imgIndx < images.length ? imgIndx + 1 : 1;
    setIndex();
}

let prev = function () {
    imgIndx = imgIndx > 1 ? imgIndx - 1 : images.length;
    setIndex()
}

document.addEventListener('keyup', (e) => {
    if (imagePreview.style.display === 'block') {
        if (e.keyCode === 27) {
            imagePreview.style.display = 'none';
        } else if (e.keyCode === 37) {
            prev();
        } else if (e.keyCode === 39) {
            next()
        }
    }

});

imagePreview.querySelector('.prev-right').addEventListener('click', () => {
    next();
});

imagePreview.querySelector('.prev-left').addEventListener('click', () => {
    prev()
});
// End working with the Work-cards 



// Start working with the skills progress bar
let skills = document.querySelector('.skills');
document.addEventListener('scroll', () => {
    if (window.scrollY >= skills.offsetTop - (navbar.clientHeight + 150)) {
        skills.querySelectorAll('.skill').forEach(skill => {
            let percentage = skill.querySelector('.percentage').innerHTML;
            skill.querySelector('.progress').style.width = percentage
        });
    }
})
// End working with the skills progress bar
