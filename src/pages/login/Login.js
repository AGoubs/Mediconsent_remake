import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();
  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("112282443695924");
  var [passwordValue, setPasswordValue] = useState("1");


  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}></Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Connexion
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Numéro de sécurité social"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                      disabled={
                        loginValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={() =>
                        loginUser(
                          userDispatch,
                          loginValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError,
                        )
                      }
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Connexion
                    </Button>
                  )}
              </div>
            </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2020-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="#" rel="noopener noreferrer" target="_blank">Mediconsent</a>, LLC. Tous droits réservés.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
