class Guitar {
    constructor( owner, guitarMake, guitarModel, guitarSerial, guitarColour, serviceRecords ) {
        this.owner = owner;
        this.guitarMake = guitarMake;
        this.guitarModel = guitarModel;
        this.guitarSerial = guitarSerial;
        this.guitarColour = guitarColour;
        this.serviceRecords = serviceRecords;
    }
}

module.exports = Guitar;