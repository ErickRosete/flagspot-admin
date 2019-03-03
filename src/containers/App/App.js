import React, { Component } from "react";

//theme
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

//Providers and context
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import AuthContext from "../../context/auth-context";
import fetch from 'isomorphic-fetch';


const client = new ApolloClient({
  uri: `${process.env.SERVER_URL}/graphql`,
  fetch,
});

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  constructor(props) {
    super(props);
    const data = JSON.parse(localStorage.getItem("jwtToken"));
    if (data) {
      this.state = {
        ...data
      };
    }
  }

  login = (token, userId, tokenExpiration, role) => {
    console.log(`tokenExpiration: ${tokenExpiration}`)
    console.log(`role: ${role}`)

    let authObject = {
      token,
      userId
    };

    if (role === "Admin") {
      this.setState(authObject);
      authObject = JSON.stringify(authObject);
      localStorage.setItem("jwtToken", authObject);
    }
  };

  logout = () => {
    this.setState({ token: null, userId: null });
    localStorage.setItem("jwtToken", null);
  };

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: green,
        secondary: orange
      },
      typography: {
        useNextVariants: true
      }
    });

    return (
      <AuthContext.Provider
        value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout
        }}
      >
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {this.props.children}
          </MuiThemeProvider>
        </ApolloProvider>
      </AuthContext.Provider>
    );
  }
}

export default App;
