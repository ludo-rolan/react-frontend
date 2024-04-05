'use client';
import { BlobServiceClient, CorsRule } from "@azure/storage-blob";
import { TableServiceClient, TableClient, AzureSASCredential, AzureNamedKeyCredential } from "@azure/data-tables";


const accountName = "datacollectoraccount";
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D";
const tableName = "PesthotelInstructions";
const workingUrlForBrowser = `https://datacollectoraccount.table.core.windows.net/PesthotelInstructions?${sasToken}`;


const connectionString = "BlobEndpoint=https://datacollectoraccount.blob.core.windows.net/;QueueEndpoint=https://datacollectoraccount.queue.core.windows.net/;FileEndpoint=https://datacollectoraccount.file.core.windows.net/;TableEndpoint=https://datacollectoraccount.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D";
const blobServiceSasUrl = "https://datacollectoraccount.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D";
const fileServiceSasUrl = "https://datacollectoraccount.file.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D";
const queueServiceSasUrl = "https://datacollectoraccount.queue.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D";
const tableServiceSasUrl = "https://datacollectoraccount.table.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D";


const serviceClientWithSAS = new TableServiceClient(
    `https://${accountName}.table.core.windows.net`,
    new AzureSASCredential(sasToken)
);

const tableClientWithSAS = new TableClient(
    `https://${accountName}.table.core.windows.net?${sasToken}`,
    tableName
);


// Use tableClient to interact with the Azure Data Table
export async function fetchTables() {
    const tables = [];
    const response = serviceClientWithSAS.listTables();
    for await (const table of response) {
        tables.push(table.name);
    }
    return tables;
}

export async function fetchDataFromTable() {
    const entities = [];
    const queryOptions = { }; // Ajoutez des options de requête si nécessaire
    
    for await (const entity of tableClientWithSAS.listEntities(queryOptions)) {
        entities.push(entity);
    }
    
    return entities;
}