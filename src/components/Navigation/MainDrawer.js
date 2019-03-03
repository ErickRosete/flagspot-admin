import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

//mis iconos
// import Place from "@material-ui/icons/Place";
// import PersonAdd from "@material-ui/icons/PersonAdd";
// import LockOpen from "@material-ui/icons/LockOpen"

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import EventIcon from "@material-ui/icons/Event";
import ShopOrderIcon from "@material-ui/icons/ShoppingBasket"
import { Link } from "gatsby"
// import logo from "../../assets/images/logos/logo.png";

//new stuff
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const drawerWidth = 241;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    alignItems: "center",
    display: "flex",
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
  drawerTitle: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    textDecoration: 'none',
  },
  drawerPaper: {
    width: drawerWidth
  }
});

const ResponsiveDrawer = props => {
  const sideLinks = [
    { id: 1, icon: <ShopOrderIcon />, text: "Pagina 2", linkTo: "/page-2" },
    { id: 2, icon: <EventIcon />, text: "Pagina 1", linkTo: "/" },
  ];

  const { classes, theme } = props;
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Link to="/" className={classes.drawerTitle}>
          {/* <img height="50" style={{ marginRight: '1rem' }} src={logo} alt="logo" /> */}
          <Typography variant="h6" color="inherit">
            Flagspot
          </Typography>
        </Link>
      </div>

      <Divider />

      <List>
        {sideLinks.map(sideLink => (
          <ListItem
            button
            key={sideLink.id}
            component={Link}
            activeClassName="active"
            to={sideLink.linkTo}
          >
            <ListItemIcon>{sideLink.icon}</ListItemIcon>
            <ListItemText primary={sideLink.text} />
          </ListItem>
        ))}
        {/* <ExpansionPanel expanded={props.expanded === 'panel1'} onChange={props.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}
              style={{padding:'0'}}>
              <ListItem
                button
                // key={sideLink.id}
                key={1}
                component={NavLink}
                to="/register"
                style={{width:"100%"}}
              >
                <ListItemIcon><PersonAdd/></ListItemIcon>
                <ListItemText primary="Registro" />
              </ListItem>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{padding:'0'}}>
            <ListItem
                  key={2}
                  button
                  // key={sideLink.id}
                  component={NavLink}
                  to="/reset"
                  style={{width:"100%"}}
                >
                <ListItemIcon><LockOpen/></ListItemIcon>
                <ListItemText primary="reset" />
            </ListItem>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
      </List>
     

      <Divider />
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.open}
          onClose={props.toggleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
