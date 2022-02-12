import React, { Component } from "react";
import axios from "axios";
import { Grid, Image, Header, Icon, Card } from "semantic-ui-react";

class DetailFilm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetail: [],
      loading: true,
    };
  }

  getDataDetail = async () => {
    try {
        let id = this.props.location.pathname.split('/')[2];
        console.log(id)
      await axios
        .get(`https://api.tvmaze.com/shows/${id}?embed=cast`, { crossDomain: true })
        .then((res) => {
          this.setState({
            dataDetail: res.data,
            loading: false,
          });
        });
    } catch (err) {
      alert(JSON.stringify(err.message));
    }
  };

  componentDidMount = async () => {
    await this.getDataDetail();
  };

  render() {
    // console.log(this.state.dataDetail);
    return (
      <div>
        {this.state.loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div style={{ padding: "10px 20px" }}>
            <Header as="h1">{this.state.dataDetail.name}</Header>
            <div>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Image
                      src={
                        this.state.dataDetail.image
                          ? this.state.dataDetail.image.original
                          : "https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg"
                      }
                      alt={this.state.dataDetail.name}
                    />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Header as="h2">Description</Header>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.dataDetail.summary,
                      }}
                    ></div>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header as="h4">Ratings</Header>
                    <div>
                      <Icon disabled name="star outline" />
                      {this.state.dataDetail.rating.average
                        ? this.state.dataDetail.rating.average
                        : "0"}
                    </div>
                    <Header as="h4">Genre</Header>
                    <div>
                      {this.state.dataDetail.genres.map((genre, id) => {
                        return <span key={id}>{genre}, </span>;
                      })}
                    </div>
                    <Header as="h4">Language</Header>
                    <div>
                      {this.state.dataDetail.language
                        ? this.state.dataDetail.language
                        : "No Data"}
                    </div>
                    <Header as="h4">Durations</Header>
                    <div>
                      {this.state.dataDetail.weight
                        ? this.state.dataDetail.weight
                        : "-"}{" "}
                      Mins
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Header as="h2">Model Actor Films</Header>
                <Grid.Row columns={3}>
                  {this.state.dataDetail._embedded.cast.map((data, key) => {
                    return (
                      <Grid.Column style={{ padding: "20px 10px" }}>
                        <Card key={key} >
                          <Image
                            src={data.person.image.medium}
                            wrapped
                            ui={false}
                          />
                          <Card.Content>
                            <Card.Header>{data.person.name}</Card.Header>
                          </Card.Content>
                          <Card.Content extra></Card.Content>
                        </Card>
                      </Grid.Column>
                    );
                  })}
                </Grid.Row>
              </Grid>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DetailFilm;
