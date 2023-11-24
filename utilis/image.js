export function getFilePath(file){
    const filePath = file.path;
    let fileSplit = '';
 
    if(filePath.includes('\\')){
        fileSplit = filePath.split('\\');
    }
    else{
        fileSplit = filePath.split('/');
    }
 
    return `${fileSplit[1]}/${fileSplit[2]}`;
}