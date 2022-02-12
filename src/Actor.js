import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { Header, Card, Image, Input } from "semantic-ui-react";

class Actor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataActor: [],
      loading: true,
    };
  }

  getDataActor = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/search/people?q=lauren`, {
          crossDomain: true,
        })
        .then((res) => {
          console.log(res.data);
          let dataRes = res.data;
          this.setState({
            dataActor: dataRes,
            loading: false,
          });
        });
    } catch (err) {
      alert(JSON.stringify(err.message));
    }
  };

  getDataSearch = async (e) => {
    if (e.target.value === "") {
      this.getDataActor();
    } else {
      try {
        await axios
          .get(`https://api.tvmaze.com/search/people?q=${e.target.value}`, {
            crossDomain: true,
          })
          .then((res) => {
            // console.log(res.data);
            let dataRes = res.data;
            this.setState({
              dataActor: dataRes,
            });
          });
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    }
  };

  componentDidMount = async () => {
    await this.getDataActor();
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div>
            <div>
              <Carousel
                autoPlay
                centerMode
                centerSlidePercentage={40}
                showStatus="false"
              >
                {this.state.dataActor.map((data, index) => {
                  var gambar = { ...data.person.image };
                  if (data.person.image === null) {
                    gambar =
                      "https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg";
                  } else {
                    gambar = gambar.medium;
                  }
                  return (
                    <div key={index}>
                      <img
                        style={{ height: "auto", width: "60%" }}
                        src={gambar}
                        alt={data.person.name}
                      />
                      <p className="legend">{data.person.name}</p>
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div>
              <Input
                style={{ marginBottom: "25px", marginLeft: "25px" }}
                size="big"
                icon="search"
                placeholder="Search Data Actors..."
                onChange={(e)=>{this.getDataSearch(e)}}
              />
              <Card.Group>
                {this.state.dataActor.map((data, index) => {
                  var gambar = { ...data.person.image };
                  return (
                    <Card key={index}>
                      <Card.Content>
                        <Image
                          floated="left"
                          size="small"
                          src={
                            gambar.medium
                              ? gambar.medium
                              : "https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg"
                          }
                        />
                        <Card.Header>{data.person.name}</Card.Header>
                        <Card.Meta>{data.person.birthday}</Card.Meta>
                        <Card.Meta>{data.person.gender}</Card.Meta>
                        <Card.Description>
                          <Header as="h3">
                            <a href={data.person.url}>Link Bio</a>
                          </Header>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "actor",
  };
};

export default connect(null, mapDispatchToProps)(Actor);
