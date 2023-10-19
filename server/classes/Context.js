class Context{


}

class PrivateSingleton {
    user;
    company;


    constructor(user, company) {
        this.user = user;
        this.company = company;
    }
}
export default class Singleton {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }
    static createInstance(user, company) {
        if (!Singleton.instance) {
            Singleton.instance = new PrivateSingleton(user, company);
        }
    }
    static getInstance() {
        if (!Singleton.instance) {
            throw new Error('No instance created');
        }
        return Singleton.instance;
    }
}