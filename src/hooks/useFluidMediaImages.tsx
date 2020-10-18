import { graphql, useStaticQuery } from "gatsby";

const useFluidImage = () => {
  return useStaticQuery(graphql`
    query MediaPicts {
      allFile(filter: { relativeDirectory: { eq: "media-pictures" } }) {
        edges {
          node {
            base
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);
};

export default useFluidImage;
