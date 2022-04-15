
export class Card {

    constructor(number,type, add) {
        this.number = number;
        this.type = type;
        this.additional_action = add; // Some cards are dynamic, and require more acction before using them (like +4 and change color) 
    }

    get_number(){
        return this.number;
    }

    get_type(){
        return this.type;
    }

    get_additional_action(){

        return this.additional_action;

    }
}

