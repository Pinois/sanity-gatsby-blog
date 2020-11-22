import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

import { responsiveTitle1 } from "../components/typography.module.css";

const MusicPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  return (
    <Layout>
      <SEO title="Musique" />
      <Container>
        <h1 className={responsiveTitle1}>Musique</h1>
        {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
        {postNodes.length === 0 && "Il n'y a pas encore de contenu dans la catégorie."}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query MusicPageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { categories: { elemMatch: { id: { eq: "c2693c97-51c0-5dd8-a820-39c1812db8df" } } } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

export default MusicPage;
