public with sharing class ObjectInformation {
    public ObjectInformation() {

    }

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getObjectList() {
        Map<String, String> objectNames = new Map<String, String>();
        system.debug( 'Sobject keyset: ' + Schema.getGlobalDescribe().keySet());
        for ( Schema.SObjectType obj : Schema.getGlobalDescribe().values() )
        {
            Schema.DescribeSObjectResult objResult = obj.getDescribe();
            if(!objResult.isCreateable())
                continue;

            objectNames.put(objResult.getName(), objResult.getLabel());
        }

        return objectNames;
    }
}
