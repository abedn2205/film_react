import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Image,
  Header,
  Card,
  Icon,
  Button,
  Input,
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFilms: [],
      loading: true,
    };
  }

  getDataFilm = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/search/shows?q=marvels`, {
          crossDomain: true,
        })
        .then((res) => {
          console.log(res.data);
          let dataRes = res.data;
          this.setState({
            dataFilms: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  getDataSearch = async (e) => {
    if (e.target.value === "") {
      this.getDataFilm();
    } else {
      try {
        await axios
          .get(`https://api.tvmaze.com/search/shows?q=${e.target.value}`, {
            crossDomain: true,
          })
          .then((res) => {
            // console.log(res.data);
            let dataRes = res.data;
            this.setState({
              dataFilms: dataRes,
            });
          });
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    }
  };

  componentDidMount = async () => {
    await this.getDataFilm();
  };

  render() {
    return (
      <>
        <div>
          <Header size="large">Database Films</Header>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image src="https://static.tvmaze.com/uploads/images/medium_landscape/1/4389.jpg" />
                <Image
                  style={{ marginTop: 20 }}
                  src="https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg"
                />
                <Image
                  style={{ marginTop: 20 }}
                  src="https://static.tvmaze.com/uploads/images/medium_landscape/1/4389.jpg"
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <div style={{ marginBottom: "20px", marginTop: "5px" }}>
                  <Input
                    icon="search"
                    placeholder="Search Films..."
                    onChange={(e) => {
                      this.getDataSearch(e);
                    }}
                  />
                </div>

                <Grid columns={3} divided>
                  {this.state.dataFilms.map((data, index) => {
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
                        <Link to={`/detail/${data.show.id}`}>
                          <Card>
                            <Image src={gambar} wrapped ui={false} />
                            <Card.Content>
                              <Card.Header>
                                {data.show.name} - ({data.show.premiered})
                              </Card.Header>
                              <Card.Description>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: data.show.summary,
                                  }}
                                ></div>
                              </Card.Description>
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
                            <Card.Content extra>
                              <div className="ui two buttons">
                                <Button basic color="green">
                                  Watch
                                </Button>
                                <Button basic color="red">
                                  Trailer
                                </Button>
                              </div>
                            </Card.Content>
                          </Card>
                        </Link>
                      </Grid.Column>
                    );
                  })}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "film",
  };
};

export default connect(null, mapDispatchToProps)(Film);
