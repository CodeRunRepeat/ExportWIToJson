VSS.init();

var exportWorkItems = function(workItems) {
    var data = JSON.stringify(workItems);
 
    // https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
    var filename = 'export.json';
    var type = 'application/json';

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
};

var menuContributionHandler = (function () {
    "use strict";
    return {
        // This is a callback that gets invoked when a user clicks the newly contributed menu item
        // The actionContext parameter contains context data surrounding the circumstances of this
        // action getting invoked.
        execute: function (actionContext) {

            VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient", "TFS/WorkItemTracking/Contracts"], 
                function (VSS_Service, TFS_Wit_WebApi, VSS_Contracts) {
                    var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
                    
                    // Get the first 200 items until I learn how to implement properly with promises.
                    if (actionContext.workItemIds.length > 200)
                        actionContext.workItemIds = actionContext.workItemIds.slice(0, 200);

                    witClient
                        .getWorkItems(actionContext.workItemIds, null, null, VSS_Contracts.WorkItemExpand.Fields)
                        .then(exportWorkItems);
                });
        }
    };
}());

// Associate the menuContributionHandler object with the "exportToJson" menu contribution from the manifest.
VSS.register("exportToJson", menuContributionHandler);