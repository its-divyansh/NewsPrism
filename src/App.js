import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export class App extends Component {
  country = "in";
  pageSize = 15;
  apiKey=process.env.REACT_APP_API_KEY;

  state = {
    progress: 0,
  };

  // here use arrow function otherwise this will not be available
  setProgress = (progresss) => {
    this.setState({ progress: progresss });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <LoadingBar
          height={3}
            color="#ff00ff"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News apiKey={this.apiKey} 
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News apiKey={this.apiKey} 
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News apiKey={this.apiKey} 
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News apiKey={this.apiKey} 
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News apiKey={this.apiKey} 
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News apiKey={this.apiKey} 
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News apiKey={this.apiKey} 
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="technology"
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

// key is used to make the routes uniques, otherwise react will not mount news second time if it has not unique props
// exact is used to make react check exact paths

export default App;
