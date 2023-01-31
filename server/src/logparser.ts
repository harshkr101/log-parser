import fs from 'fs';
import path from 'path';
import util from 'util';

const FileReadAsync  = util.promisify(fs.readFile);

export default class LogParser{

private data:string[] = [];

async readDataFile(fileName:string){
    try {
         const filePath = `${path.resolve()}/public/data/upload/${fileName}`;
         const data = await FileReadAsync(filePath,'utf-8');
         this.data = data.split("\n");
         return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

getData(){
    return this.data;
}

async filterData(){
    console.log("filtering");
}

async generateOutputFile(){
    console.log('Generating output file')
}

}