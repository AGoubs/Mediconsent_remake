import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Question from "./components/Question/Question";


// components
import PageTitle from "../../components/PageTitle/PageTitle";

//axios for API
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))


export default function Scanner() {

    var classes = useStyles();
    var [scanner, setScanner] = useState("");
    var [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_QUESTION_SCANNER)
            .then(res => {
                const scanner_data = res.data;
                setScanner(scanner_data);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return (<CircularProgress size={26} className={classes.loginLoader} />)
    }
    else {
        return (
            <>
                <PageTitle title="Questionnaire Scanner" />
                <Grid container spacing={4}>
                    {scanner.map((scan, index) => {
                        return <Question key={index} id={scan.id_question} question= { scan.libelle_question } />
                    })
                    }
                </Grid>
            </>
        );
    }
}


