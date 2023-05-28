public with sharing class AssignmentListController {

    @AuraEnabled(cacheable=true)
    public static List<Assignment__c> getAssigments( String searchKey, String sortDirection) {
        String query = 'select id,Name,AssignmentGroup__r.Id,AssignmentGroup__r.GroupName__c, Description__c, DueDate__c, Priority__c, Status__c, Title__c from Assignment__c ';
        system.debug('query---'+query);
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            query += ' WHERE Title__c LIKE :key Or Priority__c LIKE :key';
        }
        if (sortDirection != null ) {
            query += ' ORDER BY DueDate__c ' + sortDirection;
        }
        return Database.query( query );
    }

}