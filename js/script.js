export default (function () {
    var index = 0;
    const images = []

    // Gets external images and radio button creation
    function REQUEST(request, img_element, pointer_element) {
        axios.request(request).then(function (response) {
            for (let i = 0; i < response.data.results.length - 16; i++) {
                images.push(`https://image.tmdb.org/t/p/original/${response.data.results[i].poster_path}`)

                if (i == 0) {
                    img_element.src = images[0];
                }

                // creates mini pictures under the big picture
                const smallIMG = document.createElement('img')
                smallIMG.height = '75'
                smallIMG.width = '50'
                smallIMG.src = images[i]

                smallIMG.addEventListener('click', function () {
                    let currentIndex = index;

                    index = i;

                    if (currentIndex > index) {
                        img_element.classList.add('animate__fadeOutLeft')
                    } else {
                        img_element.classList.add('animate__fadeOutRight')
                    }

                    img_element.src = smallIMG.src;
                })

                // RADIO.addEventListener('click', function () {
                //     let currentIndex = index;
                //     index = i;

                //     if (currentIndex > index) {
                //         getElement(img_element).classList.add('animate__fadeOutLeft')
                //     } else {
                //         getElement(img_element).classList.add('animate__fadeOutRight')
                //     }
                // })

                // if (i == 0) { RADIO.checked = true }

                pointer_element.appendChild(smallIMG)
            }
        })
    }

    // Slider forward button
    function BTN_FORWARD(btn_forward, img_element, input_elements) {
        getElement(btn_forward).addEventListener('click', function () {
            index++;

            if (index > images.length - 1) { index = 0; }

            getElement(img_element).classList.add('animate__fadeOutRight')

            const radioList = getAllElements(input_elements)
            radioList[index].checked = true;
        })
    }

    // Slider back button
    function BTN_BACK(btn_Back, img_element, input_elements) {
        getElement(btn_Back).addEventListener('click', function () {
            index--;

            if (index < 0) { index = images.length - 1 }

            getElement(img_element).classList.add('animate__fadeOutLeft')

            const radioList = getAllElements(input_elements)
            radioList[index].checked = true;
        })
    }

    // Animationstart
    function animationStart(img_element, btn_forward, btn_Back) {
        getElement(img_element).addEventListener('animationstart', function () {
            getElement(btn_forward).disable = true;
            getElement(btn_Back).disable = true;
        })
    }

    // Animationend
    function animationEnd(img_element, btn_forward, btn_Back) {
        let img = getElement(img_element)
        img.addEventListener('animationend', function (anim) {
            if (img.classList.contains(img.classList[2])) { img.classList.remove(img.classList[2]); }
            if (img.classList.contains(img.classList[1])) { img.classList.remove(img.classList[1]); }

            getElement(img_element).src = images[index]

            switch (anim.animationName) {
                case 'fadeOutRight':
                    img.classList.add('animate__fadeInLeft')
                    break;
                case 'fadeOutLeft':
                    img.classList.add('animate__fadeInRight')
                    break;
            }

            btn_forward.disable = false;
            btn_Back.disable = false;
        })
    }

    // Press key for slider movement
    function keyPress(forward, back) {
        document.addEventListener('keyup', function (event) {
            if (event.key == 'ArrowRight') {
                getElement(forward).click();
            } else if (event.key == 'ArrowLeft') {
                getElement(back).click();
            }
        })
    }

    return {
        REQUEST,
        BTN_FORWARD,
        BTN_BACK,
        animationStart,
        animationEnd,
        keyPress
    };
})()