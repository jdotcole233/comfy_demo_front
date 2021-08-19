import React from "react";
import styled from "styled-components";
import { version } from "../../package.json";
const Card = styled.div`
  display: flex;
  flex-direction: row;
  padding: 75px 15px 25px 15px
  width: 500px
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LogoSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0px 15px;
  // width: 200px;
`;

const Appname = styled.div`
  font-weight: bolder;
  font-size: 1.9em;
  color: #000;
`;

const OtherText = styled.h2`
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
`;

export const Tagline = styled.div`
  background-color: #04f06a;
  color: white;
  position: absolute;
  letter-spacing: 2px;
  top: 10px;
  right: 10px;
  padding: 2px;
  border-radius: 5px;
`;

export const TagSection = styled.div`
  background-color: #04f06a;
  color: white;
  letter-spacing: 2px;
  padding: 4px;
  border-radius: 5px;
  height: 25px;
`;

const VersionBox = () => {
  return (
    <Card className="">
      <Tagline>Premium</Tagline>
      <LogoSide>
        <span
          style={{
            border: "1px solid black",
            padding: 10,
            overflow: "hidden",
            height: 120,
            width: 120,
            backgroundPosition: "center",
            objectFit: "contain",
            // backgrroundImage: `url(${require("../assets/visal-sm-logo.png")}`,
          }}
          className="avatar-title logo-img-bg rounded-circle bg-white"
        >
          {/* <img
            src={require("../assets/visal-sm-logo.png")}
            alt="KEK RE BROKER APP"
            height="120"
            width="120"
          /> */}
        </span>
      </LogoSide>
      <div className="d-flex flex-column pt-5 pb-4 align-items-center justify-content-center">
        <Appname>KEK RE BROKER SYSTEM</Appname>
        <OtherText>version: {version}</OtherText>
        <OtherText>
          Protected By: Positive SSL, BitNinja, Advance DDoS Protecttion
        </OtherText>
        <div className="mt-4">
          <OtherText>Developed By: Comfy Technology</OtherText>
        </div>
      </div>
    </Card>
  );
};

export default VersionBox;
