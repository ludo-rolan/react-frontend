'use client';

import 
{ 
    ContainerClient, 
    BlobServiceClient, 
    ContainerItem, 
    BlobItem 
} from "@azure/storage-blob";

const accountName = "datacollectoraccount";
const blobSasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D"
const containerName = "pesthotel-images-container"
const connectionString = `BlobEndpoint=https://${accountName}.blob.core.windows.net/;QueueEndpoint=https://${accountName}.queue.core.windows.net/;FileEndpoint=https://${accountName}.file.core.windows.net/;TableEndpoint=https://${accountName}.table.core.windows.net/;SharedAccessSignature=${blobSasToken}`;
// const subfolderName: string = "2024/3/21/14";
// const blobName: string = "10.jpg";
// const blobFullPath: string = `${subfolderName}/${blobName}`;
// download the file
// const blobSasUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${subfolderName}/${blobName}?${blobSasToken}`
const blobSasUrlString = `https://datacollectoraccount.blob.core.windows.net/pesthotel-images-container?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2024-09-24T23:37:41Z&st=2024-03-24T16:37:41Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=6vZ8VuKQTSGy5OccSJyUx1nAvTAVrEePGEPwRY454FY%3D`


const blobServiceClient: BlobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);


export async function listContainers () : Promise<Array<ContainerItem>>
{
    const containersList: Array<ContainerItem> = [];
    const containers = blobServiceClient.listContainers();
    for await (const container of containers) {
        containersList.push(container);
    }

    return containersList;
}


export async function listBlobs (): Promise<string[]>
{
    const blobs: string[] = [];

    // List blobs in the specified subfolder
    for await (const blob of containerClient.listBlobsFlat({ prefix: "" })) {
        const  blobName: string = await getBlob (blob.name) as string;
        blobs.push(blobName);
    }

    return blobs;
}

export async function getBlob (blobName: string) : Promise<unknown>
{
    const blobClient = containerClient.getBlobClient(blobName);
    // Get blob content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
    // console.log("Downloaded blob content", typeof(downloaded));

    return blobClient.url;
}

export async function deleteBlob (blobName: string)
{
    const blobClient = containerClient.getBlobClient(blobName);

    return await blobClient.deleteIfExists();
}

export async function deleteContainer ()
{
    return await containerClient.deleteIfExists();
}

async function blobToString (blob: any) : Promise<any>
{
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
            resolve(ev ? ev.target ? ev.target.result ? ev.target.result : ev.target : ev : null );
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
    })
}