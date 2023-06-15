import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {

 
  static defaultProps = {
    category: "general",
    country: "in",
    pageSize: 15,
  };
  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };
  capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 1,
    };
    document.title = `${this.capitalise(this.props.category)} - NewsPrism`;
  }
  async updateNews(pageNo) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedData = await data.json();
    // to convert data in json format;
    console.log(parsedData);
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      page: pageNo,
    });
    this.props.setProgress(100);
  }
  // handlePrevClick = async () => {
  //   this.updateNews(this.state.page - 1);
  //   // this.state.page-=1;
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

  //   // this.setState({loading: true});

  //   //     let data= await fetch(url);
  //   //     let parsedData= await data.json();
  //   //     // to convert data in json format;
  //   //     console.log(parsedData);
  //   //     this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false});
  // };

  // handleNextClick = async () => {
  //   this.updateNews(this.state.page + 1);
  //   // this.state.page+=1;
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

  //   // this.setState({loading: true});
  //   // let data= await fetch(url);
  //   // let parsedData= await data.json();
  //   // // to convert data in json format;
  //   // console.log(parsedData);
  //   // this.setState({articles: parsedData.articles,
  //   //   totalResults:parsedData.totalResults,
  //   // loading:false});
  // };
  // // using async we can wait
  async componentDidMount() {
    this.updateNews(this.state.page);
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // this.setState({loading: true});

    // let data= await fetch(url);
    // let parsedData= await data.json();
    // // to convert data in json format;
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false});
  }
  fetchData = async () => {
    this.state.page += 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    // to convert data in json format;
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-3">
          NewsPrism - Top {this.capitalise(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        {
          <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>
                  Yay! You have seen it all <br /> For more, browse other
                  categories.{" "}
                </b>
              </p>
            }
            // below props only if you need pull down functionality
            // refreshFunction={this.refresh}
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            // }
          >
            <div className="container">
              <div className="row container-fluid">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      {/* //unique key must be added, because each child must have unique key prop */}
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        name={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        }

        {/* <div className="d-flex justify-content-between">

       <button type="button"disabled={this.state.page==1} onClick={this.handlePrevClick} className="btn btn-dark">&larr;Previous</button>

       <button type="button" disabled={Math.ceil(this.state.totalResults/this.props.pageSize)<=this.state.page} onClick={this.handleNextClick} className="btn btn-dark">Next&rarr;</button>
       </div> */}
      </>
    );
  }
}
export default News;

// Note - props ko change nahi kr sakte, state ko change kr sakte hai
