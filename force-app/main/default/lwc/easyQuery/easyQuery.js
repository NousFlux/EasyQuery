import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import GetObjectList from '@salesforce/apex/ObjectInformation.getObjectList';

export default class EasyQuery extends LightningElement {
    error;
    objectOptions;
    selectedObjectApiName;

    fieldOptions;
    selectedFieldApiName;

    @wire( GetObjectList )
    getAllObjects({data, error}) {
        if(data){
            this.setupListBox(data);
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.objectOptions = undefined;
        }
    }

    setupListBox(objectMap) {
        const items = [];
        Object.entries(objectMap).forEach(([apiName, label]) => {
            items.push({
                label: `${label + ' - ' + apiName}`,
                value: `${apiName}`,
            });
        });

        this.objectOptions = items;
    }

    handleObjectChange(event) {
        this.selectedFieldApiName = null;
        this.selectedObjectApiName = event.detail.value;
    }

    @wire(getObjectInfo, { objectApiName: '$selectedObjectApiName' })
    objectInfo({data, error}) {
        if(data){
            this.setupObjectFields(data.fields);
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.fieldOptions = undefined;
        }
    };

    setupObjectFields(fieldMap) {
        const items = [];
        Object.entries(fieldMap).forEach(([apiName, fieldInfo]) => {
            items.push({
                label: `${fieldInfo.label + ' - ' + apiName}`,
                value: `${apiName}`,
            });
        });

        this.fieldOptions = items;
    }

    get hasFieldOptions() {
        return this.fieldOptions && this.fieldOptions.length > 0;
    }

    handleFieldChange(event) {
        this.selectedFieldApiName = event.detail.value;
    }
}