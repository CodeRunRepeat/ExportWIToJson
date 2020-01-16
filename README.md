# Export work items to JSON in Azure DevOps

This Azure DevOps extension adds a new menu item to the context menu in queries that exports
selected work items to JSON format.


# How to build and install
* If you don't already have a publisher for the Azure DevOps Marketplace set up, [create a publisher](https://docs.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops#package-and-publish-your-extension).
* Install prerequisites listed in https://docs.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops
  (Node.js and the extension packaging tool)
* Clone the repo
* Edit vss-extension.json and change `publisher` to your own publisher ID
* Create the extension: in your shell, go to the root directory of the code and run `tfx extension create`. This should
  create the vsix file in the same directory
* Publish, share, and install the extension using the instructions [here](https://docs.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops).
