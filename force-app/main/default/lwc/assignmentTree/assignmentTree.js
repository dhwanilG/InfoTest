import { LightningElement, wire, track } from "lwc";
import getAssignmentGroupList from "@salesforce/apex/AssignmentTreeController.getAssignmentGroupList";


const columns = [
  {
    type: "text",
    fieldName: "GroupName__c",
    label: "Group Name"
  },
  {
    type: "text",
    fieldName: "GroupDescription__c",
    label: "Group Description"
  },
  {
    type: "text",
    fieldName: "Description__c",
    label: "Description"
  },
  {
    type: "text",
    fieldName: "DueDate__c",
    label: "Due Date"
  },
  {
    type: "text",
    fieldName: "Priority__c",
    label: "Priority"
  },
  {
    type: "text",
    fieldName: "Status__c",
    label: "Status"
  },
  {
    type: "text",
    fieldName: "Title__c",
    label: "Title"
  }
  /*,

  { type: "action", typeAttributes: { rowActions: this.getRowActions } }*/
];

export default class AssignmentTree extends LightningElement {
  assginmentGroupData;
  error;
  @track expandedRows = [];
  @track columns; 

  @wire(getAssignmentGroupList)
  wiredAccounts({ error, data }) {
    if (data) {
      let parseData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < parseData.length; i++) {
        parseData[i]._children = parseData[i]["Assignments__r"];
      }
      this.assginmentGroupData = parseData;
      this.columns = columns;
    } else if (error) {
      this.error = error;
      this.assginmentGroupData = undefined;
    }
  }
 
  get expandedRowItems() {
    return this.expandedRows;
  }
/*  getRowActions(row, doneCallback) {
    const actions = [];
    actions.push({
      label: "Edit",
      name: "edit"
    });
    actions.push({
      label: "Delete",
      name: "delete"
    });
    doneCallback(actions);
  }
*/
}