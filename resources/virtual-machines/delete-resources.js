const { ClientSecretCredential, DefaultAzureCredential } = require("@azure/identity");
const { ResourceManagementClient } = require("@azure/arm-resources");

// Azure authentication in environment variables for DefaultAzureCredential
let credentials = null;
const tenantId = process.env["AZURE_TENANT_ID"] || "REPLACE-WITH-YOUR-TENANT-ID"; 
const clientId = process.env["AZURE_CLIENT_ID"] || "REPLACE-WITH-YOUR-CLIENT-ID"; 
const secret = process.env["AZURE_CLIENT_SECRET"] || "REPLACE-WITH-YOUR-CLIENT-SECRET";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"] || "REPLACE-WITH-YOUR-SUBSCRIPTION_ID";

const resourceGroupName = "REPLACE-WITH-YOUR-RESOURCE_GROUP-NAME";

if(process.env.production){

  // production
  credentials = new DefaultAzureCredential();

}else{

  // development
  credentials = new ClientSecretCredential(tenantId, clientId, secret);
  console.log("development");
}

const deleteResourceGroup = async () => {

    const resourceClient = new ResourceManagementClient(
        credentials,
        subscriptionId
    );
    const result = await resourceClient.resourceGroups.deleteMethod(resourceGroupName);
    console.log(JSON.stringify(result));
}

deleteResourceGroup().then((result)=>{
    console.log(result);
}).catch(ex => {
    console.log(ex);
});