import { Friends } from './Friends/index';
import { GameService } from '..';

export class Social {
    constructor(public superThis: GameService) {
        this.Friends = new Friends(superThis);
    }

    public Friends: Friends
}