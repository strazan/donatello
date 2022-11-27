import DownloadManager from "components/pages/DownloadManager";
// import fs from 'fs';
// import path from "path"

// const interval = setInterval(() => {
//     console.log('interval')
// }, 1000)

// const func = () => {
//     console.log('func')
// }
// export async function getServerSideProps(context: any) {

//     const jsonDirectory = path.join(path.parse(process.cwd()).root, 'Users/siggelabor/Downloads');
//     const dir = path.resolve(jsonDirectory);
//     const filenames = fs.readdirSync(dir);



//     return { props: { data: JSON.stringify(func.toString()) } }
// }
export default DownloadManager