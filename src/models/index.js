import fs from 'fs';
import path from 'path';

const initializeModel = () => {
    fs
        .readdirSync(__dirname)
        .forEach(file => {
            require(path.join(__dirname, file));
        });
}

export default initializeModel;