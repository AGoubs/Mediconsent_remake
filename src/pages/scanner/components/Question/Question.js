import React from 'react';
import { Grid,  TextField, Button } from "@material-ui/core";
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

import axios from 'axios';

class Question extends React.Component {

    state = {
        libelle_question: this.props.question,
        checkbox: false,
        message_validation: '',
        message_erreur: '',
    };

    handleQuestion = (e) => {
        this.setState({
            libelle_question: e.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.put(process.env.REACT_APP_API_QESTION_SAVE,
            {
                id_question: this.props.id,
                libelle_question: this.state.libelle_question
            })
            .then(res => {
                this.setState({ message_validation: "Valeur enregistrée avec succès" })
            })
            .catch(error => {
                this.setState({ message_erreur: "Echec de l'enregistrement" })
            });
    }


    render() {
        return (
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Widget
                    title="Question"
                    upperTitle
                >
                    <div>
                        <Grid container item alignItems={"center"}>
                            <Grid item xs={12}>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        id={this.props.id.toString()}
                                        margin="normal"
                                        placeholder="Question"
                                        type="text"
                                        fullWidth
                                        value={this.state.libelle_question}
                                        onChange={this.handleQuestion}
                                    />
                                    <br />
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        type="submit"
                                    >
                                        Enregistrer</Button>
                                </form>
                                <br />
                                <Typography className="success" color="success" >{this.state.message_validation}</Typography>
                                <Typography className="danger" color="secondary" >{this.state.message_erreur}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Widget>
            </Grid>
        );
    }
}

export default Question;
