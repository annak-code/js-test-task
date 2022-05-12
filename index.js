const moviesJson = require('./movies.json');


class MovieAPI {
    constructor(movies) {
        if (!MovieAPI.validateArray(movies)) {
            throw new Error('Input data is empty or incorrect. Please check your data');
        }
        this.movies = movies.map((el, index) => ({
            ...el,
            id: index + 1,
            rating: MovieAPI.getRandomRating(1, 5)
        }));

        this.properties = Object.keys(this.movies[0]);
    }

    static getRandomRating(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static validateArray(arr) {
        return Array.isArray(arr) && arr.length !== 0;
      }

    validateProperty(property) {
        if (!this.properties.includes(property)) {
            throw new Error('Not exist Property');
        }
    }

    /**
     *
     * @param propertyValues
     * [
     *   {
     *     property: 'property_1',
     *     value: 'value_1'
     *   },
     *   {
     *     property: 'property_2',
     *     value: 'value_2'
     *   }
     * ]
     */

    filterByProperty(propertyValues) {
        /* Validation */
        propertyValues.forEach((item) => {
            const property = item['property'];
            this.validateProperty(property);
        })

        /* Filtering */
        let result = this.movies;

        propertyValues.forEach((item) => {
            const property = item['property'];
            const filteredValue = item['value'];

            result = result.filter((movie) => movie[property] === filteredValue)
        })

        return result;
    }

    /**
     *
     * @param {string} genre
     */

    filterByGenre(genre) {
        return this.filterByProperty([
            {
                'property': 'genre',
                'value': genre,
            }
        ]);
    }

    /**
     *
     * @param {string} subtitle
     * @param {string} thumb
     */

    filterBySubtitleAndThumb(subtitle, thumb) {
        return this.filterByProperty([
            {
                'property': 'subtitle',
                'value': subtitle,
            },
            {
                'property': 'thumb',
                'value': thumb,
            }
        ])
    }

    /**
     *
     * @param {string} title
     */

    filterByTitle(title) {
        return this.filterByProperty([
            {
                'property': 'title',
                'value': title,
            }
        ]);
    }

    /**
     *
     * @param {number} id
     */

    filterById(id) {
        return this.filterByProperty([
            {
                'property': 'id',
                'value': id,
            }
        ]);
    }

    sortByProperty(property) {
        this.validateProperty(property)
        return this.movies.sort((a, b) => a[property] - b[property])
    }

    getTwoMoviesWithBiggestAndSmallestRating() {
        const sortArr = this.sortByProperty(rating);
        const startArr = sortArr.slice(0, 2);
        const endArr = sortArr.slice(sortArr.length - 2);

        return [
            ...startArr,
            ...endArr
        ]
    }

    printThreeTopRatedMovies() {
        const sortArr = this.sortByProperty(rating);
        const result = sortArr.slice(sortArr.length - 3);

        console.log(result)
    }

    /**
     *
     * @param {number} id
     */

    deleteById(id) {
        const newMovies = this.movies.filter(el => el.id !== id);
        this.movies = newMovies;
        return newMovies;
    }

    /**
     *
     * @param {number} id
     * @param {string} newTitle
     */

    changeTitleByID(id, newTitle) {
        if (this.filterById(id).length === 0) {
            throw new Error('No element with this id')
        }
        return this.movies.map(el => el.id === id ? {...el, title: newTitle} : el )
    }

}

const API = new MovieAPI(moviesJson);

const result = API.changeTitleByID(3, 'newTitle');

console.log(result);