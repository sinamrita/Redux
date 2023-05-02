import React, { Component } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Booking from "./pages/book";
import Error from "./pages/error";
import Games from "./pages/home";
import Search_Booking from "./pages/search_booking";

const queryClient = new QueryClient();

class App extends Component {
  state = {};
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Games} />
                <Route exact path="/booking" component={Booking} />
                <Route exact path="/search" component={Search_Booking} />
                <Route exact path="/error" component={Error} />
              </Switch>
            </div>
          </Router>
        </div>
      </QueryClientProvider>
    );
  }
}

export default App;
