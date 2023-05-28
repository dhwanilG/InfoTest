import { LightningElement,api } from 'lwc';
import ASSIGNMENT_OBJECT from "@salesforce/schema/Assignment__c"; // import object
import DESCRIPTION from "@salesforce/schema/Assignment__c.Description__c"; // import fields
import DUEDATE from "@salesforce/schema/Assignment__c.DueDate__c";
import PRIORITY from "@salesforce/schema/Assignment__c.Priority__c";
import STATUS from "@salesforce/schema/Assignment__c.Status__c";
import TITLE from "@salesforce/schema/Assignment__c.Title__c"; 
import ASSIGNMENTGROUP from "@salesforce/schema/Assignment__c.AssignmentGroup__c"; 
// import createAssignmentRecord from "@salesforce/apex/AssignmentFormController.createAssignmentRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import LightningModal from "lightning/modal";

export default class PopupModal extends LightningModal {
  
  @api recordId;
  objectApiName = ASSIGNMENT_OBJECT;
  title = TITLE;
  assignmentGroup = ASSIGNMENTGROUP;
  dueDate = DUEDATE;
  priority = PRIORITY;
  status = STATUS;
  description = DESCRIPTION;
  errors;

  // closePopupSuccess(event) {
  //   this.close(event.detail.id);
  // }

  // closePopup() {
  //   this.close();
  // }

  createAssignment() {
    this.template.querySelector('lightning-record-edit-form').submit();
    this.dispatchEvent(new ShowToastEvent({
      title: 'Assignment Updated',
      message: 'Record ID:',
      variant: 'success',
    }));
  }

  // handleSuccess() {
  //   // const closeEvent = new CustomEvent('closePopup',{detail:event.detail.id});
  //   // this.dispatchEvent(closeEvent);
  //   // const createdRecord = event.detail.id;
  //   // console.log('***id****',createdRecord);
  //   // this.close(createdRecord);
  // }

}