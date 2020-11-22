import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

import { responsiveTitle1 } from "../components/typography.module.css";

const BooksPage = (props) => {
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
      <SEO title="Livres" />
      <Container>
        <h1 className={responsiveTitle1}>Livres</h1>
        {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
        {postNodes.length === 0 && "Il n'y a pas encore de contenu dans la catégorie."}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query BooksPageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { categories: { elemMatch: { id: { eq: "16c7e267-a060-55e0-af2c-1fdd2c316dab" } } } }
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

export default BooksPage;
