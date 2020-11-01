import React from "react";
import Container from "../components/container";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <Container>
      <SEO title="404: Not found" />
      <h1>Erreur 404, page non trouvée.</h1>
      <p>Il n'y a pas de page à cette adresse.</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
