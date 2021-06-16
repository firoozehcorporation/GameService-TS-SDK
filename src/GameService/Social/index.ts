import { Friends } from './Friends/index';
import { GameService } from '..';

export class Social {
    constructor() {
        this.Friends = new Friends();
    }

    public Friends: Friends
}