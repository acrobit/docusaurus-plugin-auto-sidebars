const { readFileSync, existsSync} = require('fs');
// const path = require('path');

function fileContent(fullPath) {
    if(!existsSync(fullPath))
        return null;

    return readFileSync(fullPath, 'utf8');
}

module.exports = {
    fileContent,
};

