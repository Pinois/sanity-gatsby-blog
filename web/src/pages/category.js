import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

import { responsiveTitle1 } from "../components/typography.module.css";
import TagsFilter from "../components/TagFilter";
import post from "../../../studio/schemas/documents/post";

const CategoryPage = (props) => {
  const { data, errors, pageContext } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  let postNodes = data && data.posts && mapEdgesToNodes(data.posts);
  const fullPostNodes = [...postNodes];

  if (pageContext?.activeTag) {
    postNodes = postNodes.filter((post) =>
      post.tags.some((tag) => tag.name === pageContext.activeTag)
    );
    console.log(postNodes);
  }

  return (
    <Layout>
      <SEO title={pageContext.categoryTitle ? pageContext.categoryTitle : "Tout les posts"} />
      <Container>
        <h1 className={responsiveTitle1}>{pageContext.categoryTitle}</h1>
        <TagsFilter
          activeTag={pageContext.activeTag}
          posts={fullPostNodes}
          activeCategorySlug={pageContext.categorySlug}
        />
        {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
        {postNodes && postNodes.length === 0 && "Il n'y a pas encore de contenu dans la catégorie."}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query CategoryPageQuery($categoryTitle: [String]) {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { categories: { elemMatch: { title: { in: $categoryTitle } } } }
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
          slug {
            current
          }
          tags {
            name
            id
          }
        }
      }
    }
  }
`;

export default CategoryPage;
