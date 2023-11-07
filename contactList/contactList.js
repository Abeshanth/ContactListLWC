import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';


export default class ContactList extends LightningElement {
    @track contacts;
    @track error;
    @track displayedContacts = [];

    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
			this.displayedContacts = data;
            this.error = undefined;
        } else if (error) {
            this.contacts = undefined;
            this.error = 'Error loading contacts: ' + error.body.message;
        }
    }
	refreshContacts() {
		this.displayedContacts=undefined;
        getContacts()
            .then(result => {
				this.displayedContacts = result;
                this.error = undefined; // Reset error message
            })
            .catch(error => {
                this.error = 'Error refreshing contacts: ' + error.body.message;
            });
    }
}
