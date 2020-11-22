const path = require("path");
const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require("date-fns");

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const { id, slug = {}, publishedAt } = edge.node;
      const dateSegment = format(publishedAt, "YYYY/MM");
      const path = `/blog/${dateSegment}/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.js"),
        context: { id },
      });
    });
}

async function turnCategoryIntoPages(graphql, actions) {
  // 1. get the template
  const categoryTemplate = path.resolve("./src/pages/category.js");
  // 2. query all the category
  const { data } = await graphql(`
    query {
      categories: allSanityCategory {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. createPage for that category
  data.categories.nodes.forEach((category) => {
    actions.createPage({
      path: `${category.slug.current}`,
      component: categoryTemplate,
      context: {
        activeTag: "",
        categoryTitle: category.title,
        categorySlug: category.slug.current,
        allPost: [],
      },
    });
  });
}

async function turnTagsIntoPages(graphql, actions) {
  // 1. get the template
  const template = path.resolve("./src/pages/category.js");
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      tags: allSanityTags {
        nodes {
          name
          id
        }
      }
      categories: allSanityCategory {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
      allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);
  // 3. createPage for that tag
  data.categories.nodes.forEach(async (category) => {
    data.tags.nodes.forEach((tag) => {
      actions.createPage({
        path: `${category.slug.current}/${tag.name}`,
        component: template,
        context: {
          activeTag: tag.name,
          categoryTitle: category.title,
          categorySlug: category.slug.current,
        },
      });
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createBlogPostPages(graphql, actions),
    turnCategoryIntoPages(graphql, actions),
    turnTagsIntoPages(graphql, actions),
  ]);
};
