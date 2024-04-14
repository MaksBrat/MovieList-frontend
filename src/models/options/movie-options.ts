export class MovieOptions{
    //checkboxes
    genres = [
        {id: 1, name: 'Romance',  checked: false},
        {id: 2, name: 'Action',  checked: false},
        {id: 3, name: 'Drama',  checked: false},
        {id: 4, name: 'Military',  checked: false},
        {id: 5, name: 'Magic',  checked: false},
        {id: 6, name: 'Comedy',  checked: false},
        {id: 7, name: 'History',  checked: false},
        {id: 8, name: 'Psychological',  checked: false},
        {id: 9, name: 'Crime',  checked: false},
        {id: 10, name: 'Adventure',  checked: false},
        {id: 11, name: 'Sci-Fi',  checked: false},
        {id: 12, name: 'Fantasy',  checked: false},
        {id: 13, name: 'Thriller',  checked: false},
        {id: 14, name: 'Animation',  checked: false},
        {id: 15, name: 'Horror',  checked: false},
        {id: 16, name: 'Documentary',  checked: false},
      ];

    //dropdown lists
    movieTypes = [
        {name: 'Movie'},
        {name: 'Tv'},
        {name: 'Special'},
    ];

    movieStatus = [
        {name: 'Finished'},
        {name: 'Ongoing'},
        {name: 'Upcoming'}
    ];

    moieStatusInUserList = [
        {name: 'Watched'},
        {name: 'Watching'},
        {name: 'WantToWatch'},
        {name: 'Stalled'},
        {name: 'Dropped'},
    ]

    //radio btn
    orderBy = [
        {name: 'ReleaseDate'},
        {name: 'Title'},
        {name: 'Rating'},
    ]
}