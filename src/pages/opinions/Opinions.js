import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";

//Dropzone for import
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Typography } from "../../components/Wrappers/Wrappers";

//axios for API
import axios from 'axios';

const getUploadParams = ({ meta }) => { return { url: 'https://localhost/mediconsent' } }


// called every time a file's `status` changes
const handleChangeStatus = ({ meta, file }, status) => { }
// test
// receives array of files that are done uploading when submit button is clicked
const handleSubmit = (files, allFiles) => {
  console.log(files);
  // success({
  //     title: 'Succès !',s
  //     text: 'Importation réussie'
  // });
  allFiles.forEach(f => f.remove())
}

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))


export default function Opinions() {

  var classes = useStyles();
  var [opinions, setOpinions] = useState("");
  var [isLoading, setIsLoading] = useState(true);
  var [opinionsArray, setOpinionsArray] = useState([]);

  useEffect(() => {
    axios.get(`http://194.183.220.233:9095/Mediconsent/rest/avis`)
      .then(res => {
        const opinions_data = res.data
        setOpinions(opinions_data);
        setIsLoading(false)
        var array= [];
        opinions_data.map((opinion) => {
          array.push([opinion.id_avis,opinion.notes, opinion.commentaire])
        })
        setOpinionsArray(array);
      })
  }, []);

  if (isLoading) {
    return (<CircularProgress size={26} className={classes.loginLoader} />)
  }
  else {
    return (
      <>
        <PageTitle title="Rendez-vous" />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Liste des avis"
              data={opinionsArray}
              columns={["#", "Notes", "Commentaire"]}
              options={{
                filterType: "checkbox",
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
