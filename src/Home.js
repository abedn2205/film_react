import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Card, Icon, Image, Grid, Header } from "semantic-ui-react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCarousel: [],
      loading: true,
      dataSchedule: [],
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
            loading: false
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
          this.setState({
            dataSchedule: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
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
                    <p className="legend">{data.name} ({data.premiered})</p>
                  </div>
                );
              })}
            </Carousel>
            <Header size="large">Films Schedule</Header>
            <Grid columns={4} divided>
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
    ActiveItem: "home",
  };
};

export default connect(null, mapDispatchToProps)(Home);
