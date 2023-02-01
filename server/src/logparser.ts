import fs from 'fs';
import path from 'path';
import util from 'util';

const FileReadAsync  = util.promisify(fs.readFile);
const FileWriteAsync = util.promisify(fs.writeFile);

interface ParsedData{
     timestamp: number,
     logLevel: string,
     transactionId: string,
     err: string; 
}

export default class LogParser{

private rawData:string[] = [];
private parsedData:ParsedData[] = [];

async readDataFile(fileName:string){
    try {
         const filePath = `${path.resolve()}/public/data/upload/${fileName}`;
         const data = await FileReadAsync(filePath,'utf-8');
         this.rawData = data.split("\n");
         return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
 async convertData():Promise<ParsedData[]>{
    try {
        this.rawData.forEach(async element => {
            const parsed_line = await this.parseLine(element);
            if(parsed_line!==null){
                this.parsedData.push(parsed_line);
            }
        });
        return this.parsedData;
    } catch (error) {
        console.error(error);
        return;
    }
 }   

 async parseLine(logLine: string): Promise<ParsedData> {
  
  // regex pattern match for log line with error as log level
    const pattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s-\s(error)\s-\s(\{.*\})$/;
    const match = logLine.match(pattern);

  if (match) {
    const isoDate = match[1]; // retrieve ISO date
    const logLevel = match[2]; // retrieve log level
    let logData = JSON.parse(match[3]); // retrieve log data
    logData = {
      "timestamp": new Date(isoDate).getTime(),
      "logLevel": logLevel,
      "transactionId": logData.transactionId,
      "err": logData.err || ""
    };
    return logData;
  } else {
    return null;
  }
}

async generateOutputFile(fileName:string){
    try {
         const filePath = `${path.resolve()}/public/data/download/${fileName}`;
         if(fs.existsSync(filePath)){
            // if file already exists then overwrite it
            await FileWriteAsync(filePath,JSON.stringify(this.parsedData),{encoding:'utf-8',flag:'w'}); 
         }else{
            // create and write in file
            await FileWriteAsync(filePath,JSON.stringify(this.parsedData),{encoding:'utf-8'}); 
         }
         
         console.log("File written successfully")
    } catch (error) {
        console.error(error);
    }
}
}

