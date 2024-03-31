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
        {id: 8, name: 'Psychological',  checked: false}
      ];
    
    //dropdown lists
    movieTypes = [
        {name: 'Serial'},
        {name: 'Film'},
        {name: 'OVA'},
        {name: 'ONA'},
        {name: 'Special'},
    ];

    movieStatus = [
        {name: 'Finished'},
        {name: 'Ongoing'},
        {name: 'Upcoming'}
    ];

    //radio btn
    orderBy = [
        {name: 'ReleaseDate'},
        {name: 'Title'},
        {name: 'Rating'},
    ]
}