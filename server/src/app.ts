import express from 'express';
import path from 'path';
import fs from 'fs';
import LogParser from './logparser';
import multer from 'multer';
import cors from 'cors';
import helmet  from 'helmet';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rootDir = path.resolve();
const logParser = new LogParser();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${rootDir}/public/data/upload`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileStorage = multer({storage:storage}).single('file');

app.post('/api/upload', fileStorage, async (req, res) =>{
  try {
    const readFlag =  await logParser.readDataFile(req.file.originalname);
    if(readFlag){
      const data = logParser.getData();
      res.status(200).json({
          message:"Success",
          fileName:`${req.file.originalname}`,
          fileData:{data}
        })
    }
  } 
  catch (error) {
      res.status(500).end();
  }
});

app.get('/api/download',(req,res)=>{
  const fileName = req.body.fileName;
  const filePath = `${rootDir}/public/data/download/${fileName}`
  try{
  if(fs.existsSync(filePath)){
    res.download(filePath);
  }else{
    res.status(404).end();
  }
  }catch(err){
    res.send(500).end();
  }
});

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
