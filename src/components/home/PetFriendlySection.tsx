import styled from "styled-components";
import { Link } from "react-router-dom";
import Img5 from "../../img/pet-friendly-plants.webp";
import petFree_image from "../../../public/Hero_images/aquarium.jpg"
import Button from "./Button";
import { RouteNames } from "../../types/RouteNames";
import { devices } from "../../styles/theme";
import {
  IntroContainer,
  StyledImage,
  IntroWrapper,
  StyledParagraph,
} from "./BeginnerSection";
import { SectionHeading } from "../../pages/Home";

const PetFriendlySection: React.FC = () => (
  <PetFriendlyIntroContainer>
    <PetFriendlyStyledImage src={petFree_image} alt="Pet-safe flower bouquets" />
    <PetFriendlyIntroWrapper>
      <SectionHeading>Aquarium Plants</SectionHeading>
      <StyledParagraph>
      Aquarium plants enhance the tank’s beauty, provide natural filtration, 
      and create a habitat for fish. Foreground plants like Dwarf Baby Tears and
       Java Moss offer lush carpeting and easy growth respectively.
      </StyledParagraph>
      <Link
  to="/bouquet-shop/shop"
  aria-label="Shop for pet-safe flower bouquets"
>
  <Button>Shop</Button>
</Link>
    </PetFriendlyIntroWrapper>
  </PetFriendlyIntroContainer>
);

export default PetFriendlySection;

const PetFriendlyIntroContainer = styled(IntroContainer)`
  @media ${devices.tabletS} {
    margin: 0 auto 3em;
  }
`;

const PetFriendlyStyledImage = styled(StyledImage)`
  @media ${devices.tabletS} {
    order: 0;
  }
`;

const PetFriendlyIntroWrapper = styled(IntroWrapper)`
  @media ${devices.tabletS} {
    text-align: left;
  }
`;
