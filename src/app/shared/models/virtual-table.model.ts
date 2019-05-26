import { Image } from './image.model';
import { PayMethod } from './pay-method.model';
export class VirtualTable {
    id: string;
    title: string;
    extraInformation: string;
    imageFood: Image;
    price: number;
    dinersId: string[];
    maxEating: number;
    paymentMethods: PayMethod[];
    acceptAutomatically: boolean;
    deadlineForEntering: Date;
    deliveryTime: Date;
    tags: string[];
    latitude: any;
    longitude: any;
    chefUid: string;

    constructor(
        id: string,
        title: string,
        extraInformation: string,
        imageFood: Image,
        price: number,
        dinersId: string[],
        maxEating: number,
        paymentMethods: PayMethod[],
        deadlineForEntering: Date,
        deliveryTime: Date,
        tags: string[],
        latitude: any,
        longitude: any,
        chefUid: string
    ) {
        this.id = id;
        this.title = title;
        this.extraInformation = extraInformation;
        this.imageFood = imageFood;
        this.price = price;
        this.dinersId = dinersId;
        this.maxEating = maxEating;
        this.paymentMethods = paymentMethods;
        this.deadlineForEntering = deadlineForEntering;
        this.deliveryTime = deliveryTime;
        this.tags = tags;
        this.latitude = latitude;
        this.longitude = longitude;
        this.chefUid = chefUid;
    }
}
