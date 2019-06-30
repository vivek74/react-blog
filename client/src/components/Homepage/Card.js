import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: '85%',
  },
  media: {
    height: 400,
  },
});

export const CardDetail = (props) => {
  const classes = useStyles();

  return (
    <Card style={{display:'block',margin: '0 auto'}} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imageUrl}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {props.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          {props.date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.blogContent}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          {props.children}
      </CardActions>
    </Card>
  );
}
