import $ from 'jquery'

const apiKey = "hBVO7d2gvoriQK1BOJQ11sVOdzW0FMbl"
const queryButton = $('#query')
const imagesPlaceholder = $('#imagesPlaceholder')
const url = (query) =>
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25&offset=0&rating=G&lang=en`
const body = $('body')

let query
let timer

$(document).ready(_ => {
    console.log('program start')

    queryButton.keyup(function () {
        query = $(this).val()

        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            httpCall();
        }, 500)
    })

})

function httpCall() {

    console.log('fetching...')

    let p = fetch(url(query))
        .then(response => response.json())
        .then(result => result.data)
        .then(images => images.map(x => ({ id: x.id, title: x.title, url: x.images.downsized.url })))
        .then(images => {

            imagesPlaceholder.empty()

            images.forEach(image => {
                imagesPlaceholder.append(`
                <div>
                    <h4>${image.title}</h4>
                    <img src=${image.url} />
                    <div>
                        <small>${image.id}</small>
                    </div>
                </div>
                `)
            })
        }
        )
        .catch(err => console.log({ err }))
}