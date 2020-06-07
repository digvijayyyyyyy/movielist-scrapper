const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const { Parser } = require('json2csv');
const fs = require('fs');


async function main() {
    const url = 'https://www.imdb.com/search/title/?genres=drama&groups=top_250&sort=user_rating,desc';
    const res = await axios.get(url);
    const dom = new JSDOM(res.data);
    const movieEls = dom.window.document.getElementsByClassName('lister-item mode-advanced');
    let movies = [];
    for (movieEl of movieEls) {
        const Title = movieEl.getElementsByClassName('lister-item-header')[0].textContent;
        const ReleaseDate = movieEl.getElementsByClassName('lister-item-year text-muted unbold')[0].textContent;
        const Genre = movieEl.getElementsByClassName('genre')[0].textContent;
        const Rating = movieEl.getElementsByClassName('inline-block ratings-imdb-rating')[0].textContent;
        movies.push({
            Title: Title.replace(/\n/g,'').replace(/  /g,''),
            ReleaseDate: ReleaseDate.replace(/\n/g,'').replace(/  /g,''),
            Rating: Rating.replace(/\n/g,'').replace(/  /g,''),
            Genre: Genre.replace(/\n/g,'').replace(/  /g,''),
        });
        // const parser = new Parser({fields: ['Title','ReleaseDate','Genre','Rating']});
        // const csv = parser.parse(movies);
        // fs.writeFileSync('./movie.csv',csv);
        console.log(movies)
    }
}


main()