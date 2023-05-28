import { LightningElement, wire, api, track} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOpps from '@salesforce/apex/AssignmentListController.getAssigments';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

// import PopupModal from "c/popupModal";

const columns = [
  {
    type: "text",
    fieldName: "Status__c",
    label: "Status",
  },
  {
    type: "text",
    fieldName: "Title__c",
    label: "Title",
  },
  {
    type: "text",
    fieldName: "Description__c",
    label: "Description",
  },
  {
    type: "text",
    fieldName: "DueDate__c",
    label: "Due Date",
    sortable: true
  },
  {
    type: "text",
    fieldName: "Priority__c",
    label: "Priority",
  } 
];

export default class AssignmentList extends LightningElement {
  @track error;
  @api sortedDirection = 'asc';
  @api searchKey = '';
  result;
  @track page = 1; 
  @track items = []; 
  @api assignmentData = []; 
  @track columns; 
  @track startingRecord = 1;
  @track endingRecord = 0; 
  @track pageSize = 5; 
  @track totalRecountCount = 0;
  @track totalPage = 0;
  isPageChanged = false;
  showModal = false;
  modalHeaderName;
  recordId;
  selectedRows;

  @wire(getOpps, {searchKey: '$searchKey',sortDirection: '$sortedDirection'})
  wiredAssignments({ error, data }) {
      if (data) {
        this.processRecords(data);
        this.error = undefined;
      } else if (error) {
          this.error = error;
          this.assignmentData = undefined;
      }
  }

  processRecords(data){
      this.items = data;
      this.totalRecountCount = data.length; 
      this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
      
      this.assignmentData = this.items.slice(0,this.pageSize); 
      this.endingRecord = this.pageSize;
      this.columns = columns;
  }
  //clicking on previous button this method will be called
  previousHandler() {
    this.isPageChanged = true;
    if (this.page > 1) {
        this.page = this.page - 1; //decrease page by 1
        this.displayRecordPerPage(this.page);
    }
  }

  //clicking on next button this method will be called
  nextHandler() {
    this.isPageChanged = true;
    if((this.page<this.totalPage) && this.page !== this.totalPage){
        this.page = this.page + 1; //increase page by 1
        this.displayRecordPerPage(this.page);            
    }
  }

  //this method displays records page by page
  displayRecordPerPage(page) {

      this.startingRecord = ((page -1) * this.pageSize) ;
      this.endingRecord = (this.pageSize * page);

      this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                          ? this.totalRecountCount : this.endingRecord; 

      this.assignmentData = this.items.slice(this.startingRecord, this.endingRecord);
      this.startingRecord = this.startingRecord + 1;
  }    
  
  sortColumns( event ) {
    this.sortedDirection = event.detail.sortDirection;
    return refreshApex(this.result);
      
  }
  
  handleKeyChange( event ) {
      this.searchKey = event.target.value;
      var data = [];
      for(var i=0; i<this.items.length;i++){
          if(this.items[i]!= undefined && this.items[i].Name.includes(this.searchKey)){
              data.push(this.items[i]);
          }
      }
      this.processRecords(data);
  }

  // onRowSelection( event ) {
  //     this.recordId = event.detail.selectedRows[0].Id;
  // }

  newRecord() {
    this.showModal = true;
    this.recordId = '';
    this.modalHeaderName = '';
  }

  editRecord() {
    let selectedRows = this.template.querySelector("lightning-datatable").getSelectedRows();
    if(selectedRows.length < 1) {
      this.showToastMessage('Please select one record to edit.');
    } else if(selectedRows.length > 1) {
      this.showToastMessage('Please Select single record to edit');
      return;
    } else {
      this.recordId = this.template.querySelector("lightning-datatable").getSelectedRows()[0].Id;
      this.showModal = true;
      this.modalHeaderName = 'Edit';
      this.template.querySelector("lightning-datatable").selectedRows = [];
      this.wiredAssignments();
    }
  }

  hideModal(event) {
    if(event.detail.isNew) {
      this.showModal = false;
      this.recordId = '';
    }
  }

  async showSuccessToast(recordId, title) {
    const evt = new ShowToastEvent({
      title: title,
      message: "Record ID: " + recordId,
      variant: "success"
    });
    this.dispatchEvent(evt);
  }

  async showToastMessage(ErrorMessage) {
    const evt = new ShowToastEvent({
      title: 'Error Message',
      message: ErrorMessage,
      variant: "Error"
    });
    this.dispatchEvent(evt);
  }

  
}