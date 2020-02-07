const uuid = require('uuid/v4')

const bookmarks = [
    { 
        id: uuid(),
        title: 'Fakebook',
        url: 'https://www.Facebook.com',
        description: 'Join us...',
        rating: 2
    },

    {
        id: uuid(),
        title: 'CodeWars',
        url: 'https://www.codewars.com',
        description: 'Fight! Code! Win!',
        rating: 5
        
    },

    {
        id: uuid(),
        title: 'Amazon',
        url: 'https://www.amazon.com',
        description: 'Whatever you need shipped in a day',
        rating: 3
        
    }
]

module.exports = {bookmarks}