import { Image } from './image.model';

export class User {
    uid: string;
    name: string;
    surname: string;
    score: number;
    profilePhoto: Image;
    urlBanner: Image;


    constructor(
        uid: string,
        name: string,
        surname: string,
        score: number,
        profilePhoto: Image,
    ) {
        this.uid = uid;
        this.name = name;
        this.surname = surname;
        this.score = score;
        this.profilePhoto = profilePhoto;

    }
}
