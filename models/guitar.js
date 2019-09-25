class Guitar {
    constructor( owner, guitarMake, guitarModel, guitarSerial, guitarYear, guitarColour, serviceRecords ) {
        this.owner = owner;
        this.guitarMake = guitarMake;
        this.guitarModel = guitarModel;
        this.guitarSerial = guitarSerial;
        this.guitarYear = guitarYear;
        this.guitarColour = guitarColour;
        this.serviceRecords = serviceRecords;
    }
}

module.exports = Guitar;