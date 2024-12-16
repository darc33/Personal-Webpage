import fs from 'fs';
import path from 'path';

const readJSONFile = (filePath) => {
    try{
        const __dirname = path.resolve();
        const data = fs.readFileSync(path.join(__dirname, 'data', filePath), 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        throw new Error(`Error reading file: ${err.message}`);
    }
};

export default readJSONFile;