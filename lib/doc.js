import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


// to get folder path using nodejs path api
const postsDirectory = path.join(process.cwd(), 'docs')

export function getDocuments(){
    console.log(postsDirectory);

    // to get all filename from folder using nodejs fs api and readdirSync()
    const filesName = fs.readdirSync(postsDirectory)

    // get required data using map() method
    const allDocuments = filesName.map(fileName => {
        // used filename as id by replacing file extension
        const id = fileName.replace(".md", "")

        const fullPath = path.join(postsDirectory, fileName)

        // to get file content from folder using nodejs fs api and readFileSync()
        const fileContent = fs.readFileSync(fullPath, 'utf-8')

        // to parse content using gray-matter
        const matterResults = matter(fileContent)

        console.log(matterResults);

        return {
            id,
            ...matterResults.data
        }
    })

    return allDocuments.sort((a,b) => {
        if(a.order < b.order){
            return -1;
        }
        if(a.order > b.order){
            return 1;
        }
        return 0;
    })
}