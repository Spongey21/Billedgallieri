export default (function () {
    const images = []

    // Gets external images and radio button creation
    function REQUEST(request, img_element, pointer_element) {

        axios.request(request).then(function (response) {
            for (let i = 0; i < response.data.results.length - 13; i++) {
                images.push(`https://image.tmdb.org/t/p/original/${response.data.results[i].poster_path}`)

        
                if (i == 0) {
                    img_element.src = images[0]
                }

                // creates mini pictures under the big picture
                const smallIMG = document.createElement('img')
                smallIMG.height = '75'
                smallIMG.width = '50'
                smallIMG.src = images[i]

                // changes big picture on mouseover event
                smallIMG.addEventListener('mouseover', function () {
                    img_element.src = smallIMG.src;
                })

                smallIMG.addEventListener('touchend', function () {
                    img_element.src = smallIMG.src;
                })

                const zoomIMG = document.querySelector('.zoom img')

                img_element.addEventListener('mouseover', function() {
                    zoomIMG.src = img_element.src;
                })

                img_element.addEventListener('mousemove', function(event) {
                    let rect = event.target.getBoundingClientRect()

                    zoomIMG.style.transformOrigin = `${event.clientX - rect.left}px ${event.clientY - rect.top}px`
                })

                img_element.addEventListener('mouseout', function() {
                    zoomIMG.src = ''
                })

                pointer_element.appendChild(smallIMG)
            }
        })
    }
    return {
        REQUEST,
    };
})()