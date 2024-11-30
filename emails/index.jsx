import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://your-app-domain.com";
  
  export const Email = ({
    userFirstName,
    duration,
    meetingTime,
    date,
    meetingUrl,
    businessName,
  }) => {
    return (
      <Html>
        <Head />
        <Preview>Meeting Details</Preview>
        <Body style={main}>
          <Container>
           
  
            <Section style={content}>
              <Row>
                <div style={centeredImage}>
                  <Img
                    style={image}
                    width={300}
                    src="https://github.com/KristinAlex1/MeetEasy/blob/main/logo3.png?raw=true"
                  />
                </div>
              </Row>
  
              <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Hi {userFirstName},
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Thank you for scheduling a meeting with {businessName},
                  </Heading>
                  <Text>Please find the meeting details:</Text>
                  <Text style={paragraph}>
                    <b>Time: </b>
                    {meetingTime}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Date: </b>
                    {date}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Location: </b>
                    {meetingUrl}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Duration: </b>
                    {duration}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(0,0,0, 0.5)",
                      fontSize: 14,
                      marginTop: -5,
                    }}
                  >
                    *Please join the meeting using the details above: {meetingUrl}
                  </Text>
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: "0" }}>
                <Column style={containerButton} colSpan={2}>
                  <Button style={button}>Join Now</Button>
                </Column>
              </Row>
            </Section>
  
            <Section style={containerImageFooter}>
              <Img
                style={image}
                width={320}
                src="https://github.com/KristinAlex1/MeetEasy/blob/main/logo3.png?raw=true"
              />
            </Section>
  
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
              U.S.A. | www.yelp.com
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default Email;
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const centeredImage = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#007BFF", // Blue color
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  };
  
  const image = {
    maxWidth: "100%",
  };
  
  const boxInfos = {
    padding: "20px",
  };
  
  const containerImageFooter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "45px 0 0 0",
  };
  