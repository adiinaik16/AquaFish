import styled from "styled-components";
import { Link } from "react-router-dom";
import { devices } from "../../styles/theme";
import { RouteNames } from "../../types/RouteNames";
import LandingImage from '../../img/landing-image.png'

const Hero: React.FC = () => (
  <HeroContainer>
    <HeroHeading>
    AQUARIUM<StyledSpan> FISH </StyledSpan> 
    </HeroHeading>
    <StyledParagraph>
      Welcome to our Aquarium Fish Website, your ultimate resource for everything related to freshwater and saltwater aquarium fish.
    </StyledParagraph>
    <Link to={`./${RouteNames.SHOP}`} aria-label="Shop button">
      <StyledButton>EXPLORE</StyledButton>
    </Link>
  </HeroContainer>
);

export default Hero;

const HeroContainer = styled.div`
  color:white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 600px;
  padding: 2em;
  background-image: url(${LandingImage});
  // background: url("flat-lay-monstera-other-leaves.webp") no-repeat;
  background-size: cover;
  background-position: 10%;
  text-align: center;

`;

const HeroHeading = styled.h1`
  font-weight:800;
  font-size: 2.7rem;
  @media ${devices.mobileS} {
    font-size: 2.1rem;
  }
`;

const StyledSpan = styled.span`
  color: white // Dark purple/pink color
  font-weight:300;
  text-shadow: 1px 1px 2px ${({ theme }) => theme.colors.black};
`;

const StyledParagraph = styled.p`
 
  font-size: 1.1rem;
  line-height: 1.4;
  @media ${devices.mobileS} {
    font-size: 0.8rem;
  }
`;

const StyledButton = styled.button`
  border: none;
  margin-top: 1em;
  padding: 1.125rem 3rem;
  width: fit-content;
  background-color:rgb(137, 137, 233); // Dark purple/pink color
  cursor: pointer;
  border-radius:40px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.offWhite};
  &:hover {
    background-color: #9c2f80; // Slightly darker shade for hover effect
  }
  @media ${devices.mobileS} {
    padding: 0.75rem 1.875rem;
    font-size: 0.9rem;
  }
  @media ${devices.tabletM} {
    margin-bottom: 4em;
  }
`;