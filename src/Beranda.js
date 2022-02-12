import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Card, Icon, Image, Grid, Header } from "semantic-ui-react";
import ReactPaginate from "react-paginate";
import "./style.css";

class Beranda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCarousel: [],
      loading: true,
      dataSchedule: [],
      perPage: 9,
      offset: 0,
      pageCount: 0,
    };
  }

  //ambil data top film untuk caraousel
  getDataCarousel = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/shows`, { crossDomain: true })
        .then((res) => {
          let sorted = res.data.sort(function (a, b) {
            return a.rating.average < b.rating.average
              ? 1
              : b.rating.average < a.rating.average
              ? -1
              : 0;
          });
          let dataRes = sorted.slice(0, 14);
          this.setState({
            dataCarousel: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  // ambil data schedule
  getDataSchedule = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/schedule`, { crossDomain: true })
        .then((res) => {
          // console.log(res.data);
          let dataRes = res.data;
          let dataSliced = res.data.slice(
            this.state.offset,
            this.state.perPage + this.state.offset
          );
          this.setState({
            dataSchedule: dataSliced,
            pageCount: Math.ceil(dataRes.length / this.state.perPage),
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  handlePageClick = (e) => {
    let selected = e.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState(
      {
        currentPage: selected,
        offset: offset,
      },
      () => {
        this.getDataSchedule();
      }
    );
  };

  componentDidMount = async () => {
    await this.getDataCarousel();
    await this.getDataSchedule();
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div>
            <Header size="large">Top Films</Header>
            <Carousel
              autoPlay
              centerMode
              centerSlidePercentage={40}
              showStatus="false"
            >
              {this.state.dataCarousel.map((data, index) => {
                return (
                  <div key={index}>
                    <img
                      style={{ height: "auto", width: "60%" }}
                      src={data.image.medium}
                      alt={data.name}
                    />
                    <p className="legend">
                      {data.name} ({data.premiered})
                    </p>
                  </div>
                );
              })}
            </Carousel>
            <Header size="large">Films Schedule</Header>
            <Grid columns={3} divided>
              {this.state.dataSchedule.map((data, index) => {
                var gambar = { ...data.show.image };
                var rating = { ...data.show.rating };

                if (data.show.image === null) {
                  gambar =
                    "https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg";
                } else {
                  gambar = gambar.medium;
                }

                if (rating.average === null) {
                  rating = 0;
                } else {
                  rating = rating.average;
                }

                return (
                  <Grid.Column key={index}>
                    <Card>
                      <Image src={gambar} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>
                          {data.show.name} ({data.airdate})
                        </Card.Header>
                        <Card.Meta>
                          {data.name}, {data.show.status}
                        </Card.Meta>
                        <Card.Description>
                          Durations: {data.show.weight} Mins
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <h4>
                          <Icon name="star" />
                          {rating}
                        </h4>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
              <ReactPaginate
                previousLabel="previous"
                nextLabel="next"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={this.state.pageCount}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                onPageChange={this.handlePageClick}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
              />
            </Grid>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "beranda",
  };
};

export default connect(null, mapDispatchToProps)(Beranda);
