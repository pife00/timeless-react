import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function CardModal(props) {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(props.modal);
  

  const closeModal = () => {
    setOpenModal(false);
    props.onCloseModal();
  };

  let listFilter = {...props.data};
  let list = []
  let deletePropierty = ['id','idUser','seconds','minutes',];
  
  for(let i = 0; i< deletePropierty.length;i++){
      delete listFilter[deletePropierty[i]]
  }

  for (let [key, value] of Object.entries(listFilter)) {
    list.push([<ListItemText key={key} primary={key} secondary={value} />]);
  }

  const body = (
    <Grid container spacing={3}>
      
      <Grid item xs={4} style={{marginTop:'4px'}}>
        <Card className={classes.root}>
          <CardContent className={classes.cardContent} >
            <Typography variant="h5" gutterBottom>
              {" "}
              Resumen{" "}
            </Typography>
            <List>{list}</List>
          </CardContent>
          <CardActions>
            <Button>Aceptar</Button>
            <Button onClick={closeModal} >Cancelar</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  );

  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

const useStyles = makeStyles({
  root: {
    width: 200,
    maxHeight:700,
    overflow: 'auto',
    borderColor:'#ccc'
    
  },
  cardContent:{
   
   
  },
  title: {
    fontSize: 24,
  },
});

