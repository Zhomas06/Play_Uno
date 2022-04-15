
export class Card {

    constructor(number,type, add) {
        this.number = number;
        this.type = type;
        this.additional_action = add; // Some cards are dynamic, and require more acction before using them (like +4 and change color) 
    }

    number(){
        return this.number;
    }

    type(){
        return this.type;
    }
}

