public with sharing class AssignmentTreeController {

    @AuraEnabled(Cacheable=true)
    public static List <AssignmentGroup__c> getAssignmentGroupList() {
        List<AssignmentGroup__c> assignmentGroupList = new List<AssignmentGroup__c>();
        assignmentGroupList = [select id,GroupName__c, GroupDescription__c,(select id,Name, Description__c, DueDate__c, Priority__c, Status__c, Title__c from Assignments__r)  
                    from AssignmentGroup__c];
        return assignmentGroupList;
    }
}