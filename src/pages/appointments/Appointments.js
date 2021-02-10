import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";

//Dropzone for import
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }


// called every time a file's `status` changes
const handleChangeStatus = ({ meta, file }, status) => { }
// test
// receives array of files that are done uploading when submit button is clicked
const handleSubmit = (files, allFiles) => {
  console.log(files);
  toast('Fichier importé avec succès !')
  allFiles.forEach(f => f.remove())
}

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Appointments() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Rendez-vous" />
      <ToastContainer />
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
            title="Importer un rendez-vous"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={12}>
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      onSubmit={handleSubmit}
                      inputContent="Glisser ou importer votre fichier"
                      inputWithFilesContent="Ajouter un fichier"
                      submitButtonContent="Valider"
                      accept=".xlsx, .ods, .csv"
                    />
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

