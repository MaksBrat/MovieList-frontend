import {Profile} from './Profile'
import { AnimeList } from './AnimeList';

export class ProfileWithAnimeList{
    constructor(
        public profile: Profile,
        public animeList: AnimeList[]
    ){}
}
