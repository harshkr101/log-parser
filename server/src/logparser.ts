import fs from 'fs';
import path from 'path';
import util from 'util';
import stream from 'stream';
import es from 'event-stream';

export default class LogParser{

private data:string[] = [];

initializeData(value:string){
    this.data.push(value);
    console.log(this.data);
}

async readDataFile(fileName:string){
    try {
        const readStream = fs.createReadStream(path.resolve()+'/public/data/upload/'+fileName)
        .pipe(es.split())
        .pipe(es.mapSync(function(line:string){
            // pause the readstream
            readStream.pause();
            // process line
            this.data.push(line.toString());
            // resume the readstream, possibly from a callback
            readStream.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.')
            return this.data;
        })
);
    } catch (error) {
        console.error(error);
        return;
    }
}


async filterData(){
    console.log("filtering");
}

async generateOutputFile(){
    console.log('Generating output file')
}

}