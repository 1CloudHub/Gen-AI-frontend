import { Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const Login = (props) => {
  return (
    <>
      <div className="login-bg">
        <div>
          {/* <img src={loginImg} alt="left-img" className="left-img" /> */}

          <div className="left-text">
            <p className="para-text-1">
              Making your multi cloud operation more
            </p>
            <p className="para-text-2">
              <span>visible, efficient and simple.</span>
            </p>
          </div>
        </div>
        <div>
          {/* <img src={yellowBg} alt="yellow-bg" className="yellow-background" /> */}
          <Container>
            <div className="plat-home-page">
              <div className="plat-home-logo"></div>
              <Row>
                <Col lg="8" md="7">
                  <Row>
                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="d-flex justify-content-center align-items-start"
                    ></Col>
                  </Row>
                </Col>
                <Col lg="4" md="5" style={{ "z-index": "1" }}></Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;
