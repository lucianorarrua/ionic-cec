export class Image {
    created: string;
    url: string;
    fullPath: string;
    contentType: string;
    constructor(
        created: string,
        url: string,
        fullPath: string,
        contentType: string
    ) {
        this.created = created;
        this.url = url;
        this.fullPath = fullPath;
        this.contentType = contentType;
    }
}
