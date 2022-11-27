import Layout from "components/Layout";
import Toggle from "components/Toggle";
import fs from 'fs';
import path from "path"
import { useState } from "react";
// const path = window.require('path');
// const fs = window.require('fs');
type Props = {
    data: string[]
}

// const load = () => {
//     const jsonDirectory = path.join(path.parse(process.cwd()).root, 'Users/siggelabor/Downloads');
//     const dir = path.resolve(jsonDirectory);
//     const filenames = fs.readdirSync(dir);
//     console.log(filenames)
// }


const categories = [
    {
        name: 'Images',
        active: true,
        files: ["png", "jpg", "jpeg"]
    },
    {
        name: 'Videos',
        active: true,
        files: ["mp4", "mkv", "avi"]
    },
    {
        name: 'Documents',
        active: true,
        files: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf", "odt", "ods", "odp", "odg", "odf", "odb", "csv", "tsv", "xml", "html", "htm", "xhtml", "mht", "epub", "md", "yml", "yaml", "json", "ics", "vcf"]
    }
]




export default function DownloadManager() {

    const [sorting, setSorting] = useState(false);
    // console.log(JSON.parse(data)())
    // return <p>S</p>

    return (
        <Layout>
            <div className="flex items-center space-x-3 mt-4">
                <p>Sort Downlaods</p>
                <Toggle value={sorting} onChange={setSorting} />
            </div>
            <div className="mt-6 space-y-2">
                {categories.map(({ name, active, files }) => (
                    <div className="p-2 border rounded-lg" key={name}>

                        <p >{name}</p>
                    </div>
                ))}
            </div>
        </Layout >
    )
}

