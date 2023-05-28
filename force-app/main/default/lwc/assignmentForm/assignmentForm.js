import { LightningElement,api } from 'lwc';
import ASSIGNMENT_OBJECT from "@salesforce/schema/Assignment__c"; // import object
import DESCRIPTION from "@salesforce/schema/Assignment__c.Description__c"; // import fields
import DUEDATE from "@salesforce/schema/Assignment__c.DueDate__c";
import PRIORITY from "@salesforce/schema/Assignment__c.Priority__c";
import STATUS from "@salesforce/schema/Assignment__c.Status__c";
import TITLE from "@salesforce/schema/Assignment__c.Title__c"; 
import ASSIGNMENTGROUP from "@salesforce/schema/Assignment__c.AssignmentGroup__c"; 
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class AssignmentForm extends LightningElement {
    @api recordId;
    @api showModal;
    @api modalHeader;
    objectApiName = ASSIGNMENT_OBJECT;
    title = TITLE;
    assignmentGroup = ASSIGNMENTGROUP;
    dueDate = DUEDATE;
    priority = PRIORITY;
    status = STATUS;
    description = DESCRIPTION;
    errors;

    createAssignment() {
        this.isNewRecord = true;
        this.template.querySelector('lightning-record-edit-form').submit();
    }

    handleSuccess(event) {
        // const closeEvent = new CustomEvent('closePopup',{detail:event.detail.id});
        // this.dispatchEvent(closeEvent);
        const evt = new ShowToastEvent({
            title: 'Assignment Updated',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
        this.hideModal();
    }

    hideModal() {
        this.dispatchEvent(new CustomEvent(
            "hidenew", {
                "detail" : {'isNew' : true}
            }
        ));
    }
}