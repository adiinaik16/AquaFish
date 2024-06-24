import styled from "styled-components";
import { Link } from "react-router-dom";
import Img4 from "../../img/beginner-plants.webp";
import hero_image2 from "../../../public/Hero_images/fish.jpg"
import Button from "./Button";
import { RouteNames } from "../../types/RouteNames";
import { devices } from "../../styles/theme";
import { SectionHeading } from "../../pages/Home";

const BeginnerSection: React.FC = () => (
  <IntroContainer>
  <StyledImage src={hero_image2} alt="Beautiful flower bouquets" />
  <IntroWrapper>
    <SectionHeading>Unique Aquarium Fish</SectionHeading>
    <StyledParagraph>
    Adding unique fish to your aquarium can create a captivating display. 
    Betta fish, with their vibrant colors and long fins, are best kept alone 
    due to their territorial nature. Discus fish, known for their striking 
    patterns, require pristine water conditions and are suitable for experienced aquarists.
    </StyledParagraph>
    {/* <Link
      to={`./${RouteNames.SHOP + "/" + RouteNames.FLOWER_BOUQUETS_QUERY}`}
      aria-label="Shop for flower bouquets"
    >
      <Button>Shop the collection</Button>
    </Link> */}

<Link
  to="/bouquet-shop/shop"
  aria-label="Shop for pet-safe flower bouquets"
>
  <Button>Shop</Button>
</Link>
  </IntroWrapper>
</IntroContainer>
);

export default BeginnerSection;

export const IntroContainer = styled.div`
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.accentDark};

  @media ${devices.tabletS} {
    display: flex;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.sizes.containerL};
  }
`;

export const StyledImage = styled.img`
  height: 14em;
  width: 100%;
  object-fit: cover;

  @media ${devices.tabletS} {
    flex: 1;
    height: 31em;
    width: 50%;
    order: 2;
  }
`;

export const IntroWrapper = styled.div`
  padding: 0.5em 1em;
  text-align: center;

  @media ${devices.tabletS} {
    padding: 5em 2em 2em 2em;
    width: 50%;
    text-align: end;
  }
`;

export const StyledParagraph = styled.p`
  margin: 0 0 1em 0;
  font-size: 1.1rem;
  line-height: 1.4;
`;
