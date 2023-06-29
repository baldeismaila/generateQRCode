/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import archiver from "archiver";
import { generationQr } from "backend";
//import { each, get } from "jquery";
import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "../styles.css"

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

function Dashboard() {
  const [size, setSize] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [msg, setMsg] = useState("");
  //const [imageUrls, setImageUrls] = useState([]);
  
  // function ImageGallery(zipFolder) {
  //   const zip = new JSZip();
  //   const zipData = new Blob([zipFolder], { type: 'application/zip' });
    
  //   zip.loadAsync(zipData).then((zipFiles) => {
  //     const urls = [];

  //     Object.keys(zipFiles.files).forEach((fileName) => {
  //       const file = zipFiles.files[fileName];

  //       if (file.mime.includes('image')) {
  //         file.async('blob').then((blob) => {
  //           const imageUrl = URL.createObjectURL(blob);

  //           urls.push(imageUrl);

  //           setImageUrls(urls);
  //         });
  //       }
  //     });
  //   });
  // } 

  function downloadZipFolder(zipFolder) {
    // Convertir le dossier zippé en un objet Blob
    const zipData = new Blob([zipFolder], { type: 'application/zip' });

    saveAs(zipData, "compressed.zip");
    //ImageGallery(zipFolder);
  }
  
  const genererQr = async () =>{ 
    const blobData = await generationQr(size, width, height);

    downloadZipFolder(blobData);
    setMsg("Vous avez générer "+ size +" Qr Code(s)");
  
  };


  return (
    <>
      <div className="content">
      <table className="tableQr">
              <tr>
                <td>
                  <label>Taille:</label>
                </td>
                <td>
                    <input type="number" name="size" className="form-control" value={size}
                      onChange={(evt) => setSize(evt.target.value)} />
                </td>
                <td>
                  <label>Largeur:</label>
                </td>
                <td>
                  <input type="number" name="width" className="form-control" value={width}
                    onChange={(evt) => setWidth(evt.target.value)} />
                </td>
                <td>
                  <label>Hauteur:</label>
                </td>
                <td>
                  <input type="number" name="height" className="form-control" value={height}
                    onChange={(evt) => setHeight(evt.target.value)} />
                </td>
                <td rowspan="2">
                  <button onClick={genererQr} className="btn btn-sm btn-primary">Generer</button>
                </td>
              </tr>
              <tr>
                <td colspan = "7">
                {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                </td>
              </tr>
              {/* <tr>

                <div>
                  
                  {imageUrls.map((imageUrl, index) => (
                    
                    <td><img key={index} src={""+imageUrl+""} alt={`Image ${index}`} /></td>
                  ))}
                </div>

              </tr> */}
          </table>
      </div>
    </>
  );
}

export default Dashboard;
