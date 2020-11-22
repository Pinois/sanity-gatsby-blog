import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import PortableText from "../components/portableText";

import { responsiveTitle1 } from "../components/typography.module.css";

const AboutPage = (props) => {
  const { data, errors } = props;
  const { title, _rawBody } = data.sanityPage;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={title} />
      <Container>
        <h1 className={responsiveTitle1}>{title}</h1>
        {_rawBody && <PortableText blocks={_rawBody} />}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query AboutPageQuery {
    sanityPage(slug: { current: { eq: "about" } }) {
      title
      _rawBody
    }
  }
`;

export default AboutPage;
