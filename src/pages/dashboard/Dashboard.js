import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

import {
  Grid,
  LinearProgress,
  CircularProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import { useUserState } from "../../context/UserContext";


export default function Dashboard(props) {

  var classes = useStyles();
  var theme = useTheme();
  var UserState = useUserState();
  var [etablissement, setEtablissement] = useState("");
  var [examens, setExamens] = useState("{}");
  var [nbExamens, setNbExamens] = useState("");
  var [isLoading, setIsLoading] = useState(true);
  var [nbNotes, setNbNotes] = useState("");

  useLayoutEffect(() => {
    axios.get(`http://194.183.220.233:9095/Mediconsent/rest/etablissement/utilisateur/${UserState.id_utilisateur}`)
      .then(res => {
        const etablissement_data = res.data
        setEtablissement(etablissement_data);

        axios.get(`http://194.183.220.233:9095/Mediconsent/rest/examens/etablissement/${etablissement_data.id_etablissement}`)
          .then(res => {
            const examens_data = res.data
            setExamens(examens_data);
            setNbExamens(examens_data.length)

            let total_notes = 0;
            examens_data.map((examens, index) => {
              total_notes++;
            })
            setNbNotes(total_notes);
          
            setIsLoading(false);

          })
      })
  }, []);

  if (isLoading) {
    return (<CircularProgress size={26} className={classes.loginLoader} />)
  }
  else {

    return (
      <>
        <PageTitle title="Dashboard" />
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Widget
              title="Etablissement"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Grid container item alignItems={"center"}>
                  <Grid item xs={6}>
                    <Typography size="xl" weight="medium" noWrap>
                      {etablissement.nom_etablissement}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Widget>
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Widget
              title="Nombre d'examens"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Grid container item alignItems={"center"}>
                  <Grid item xs={6}>
                    <Typography size="xl" weight="medium" noWrap>
                      {nbExamens}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Widget>
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Widget
              title="Nombre d'avis"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Grid container item alignItems={"center"}>
                  <Grid item xs={6}>
                    <Typography size="xl" weight="medium" noWrap>
                      {nbNotes}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Widget>
          </Grid>

          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Widget
              title="Téléphone de l'établissement"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Grid container item alignItems={"center"}>
                  <Grid item xs={6}>
                    <Typography size="xl" weight="medium" noWrap>
                      {etablissement.telephone_etablissement}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Widget>
          </Grid>

          <Grid item xs={12}>
            <Widget
              bodyClass={classes.mainChartBody}
              header={
                <div className={classes.mainChartHeader}>
                  <Typography
                    variant="h5"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Résumé des avis
                </Typography>
                  <div className={classes.mainChartHeaderLabels}>
                    <div className={classes.mainChartHeaderLabel}>
                      <Dot color="warning" />
                      <Typography className={classes.mainChartLegentElement}>
                        Avis
                    </Typography>
                    </div>
                  </div>
                </div>
              }
            >
              <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <ComposedChart
                  margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                  data={getMainChartData(examens)}
                >
                  <YAxis
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                  />
                  <XAxis
                    tickFormatter={i => i + 1}
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                  />
                  <Area
                    type="natural"
                    dataKey="desktop"
                    fill={theme.palette.background.light}
                    strokeWidth={0}
                    activeDot={false}
                  />
                  <Line
                    type="natural"
                    dataKey="mobile"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                  />
                  <Line
                    type="linear"
                    dataKey="tablet"
                    stroke={theme.palette.warning.main}
                    strokeWidth={2}
                    dot={{
                      stroke: theme.palette.warning.dark,
                      strokeWidth: 2,
                      fill: theme.palette.warning.main,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>

          <Grid item xs={12}>
            <Widget
              title="Examens"
              upperTitle
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <Table data={examens} />
            </Widget>
          </Grid>
        </Grid>
      </>
    );
  }
}
// #######################################################################
function getRandomData(length, min, max, multiplier = 1, maxDiff = 0) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData(examens) {

var resultArray = [];

examens.map((examen, index) => {
  resultArray.push({
    tablet: examen.avis.notes,
  });
})

  return resultArray;
}
