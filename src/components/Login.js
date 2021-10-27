import { Component } from "react";
import styled from "styled-components";

const Login = (props) => {
  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt=""></CTALogoOne>
          <Signup>GET ALL THERE</Signup>
          <Description>
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $1.
          </Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt=""></CTALogoTwo>
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

const BgImage = styled.div`
  height: 100%;
  background-image: url("/images/login-background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  transition-timing-function: ease-out;
  transition: opacity 0.2s;
`;

const CTALogoOne = styled.img`
  max-width: 600px;
  width: 100%;
  min-height: 1px;
  display: block;
  margin-bottom: 24px;
`;

const Signup = styled.a`
  width: 100%;
  margin-bottom: 24px;
  padding: 16.5px 0;
  color: #f9f9f9;
  background-color: #0063e5;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1.5px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  margin: 0 0 24px;
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  width: 100%;
  max-width: 600px;
  min-height: 1px;
  display: inline-block;
  vertical-align: bottom;
`;

export default Login;
