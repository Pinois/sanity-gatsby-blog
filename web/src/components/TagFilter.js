import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const TagsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 5px;
    align-items: center;
    justify-items: center;
    padding: 5px 20px;
    background: #f2f2f2;
    border-radius: 50px;
    text-decoration: none;
    color: #202123;
    .count {
      padding: 2px 5px;
    }
    &:hover {
      background: #f5cc3280;
    }
    &[aria-current="page"] {
      background: #f5cc32;
    }
  }
`;

function countPostsInTags(elements) {
  // return  the pizzas with counts
  const counts = elements
    .map((post) => post.tags)
    .flat()
    .reduce((acc, tag) => {
      // check if this is an existing tag
      const existingTag = acc[tag.id];
      if (existingTag) {
        // if it is, increment by 1
        existingTag.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to one
        acc[tag.id] = {
          id: tag.id,
          name: tag.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  const sortedTags = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedTags;
}

export default function TagsFilter({ posts, activeTag, activeCategorySlug }) {
  // count how many pizzas are in each topping
  //   console.log(activeCategorySlug);
  const tagsWithCounts = countPostsInTags(posts);
  // loop over the list of toppings and display the topping and the count of pizzas in that toppings
  // link it up
  return (
    <TagsStyles>
      <Link to={`/${activeCategorySlug}`}>
        <span className="name">Tous</span>
        <span className="count">{posts.length}</span>
      </Link>
      {tagsWithCounts.map((tag) => (
        <Link
          to={`/${activeCategorySlug}/${tag.name}`}
          key={tag.id}
          className={tag.name === activeTag ? "active" : ""}
        >
          <span className="name">{tag.name}</span>
          <span className="count">{tag.count}</span>
        </Link>
      ))}
    </TagsStyles>
  );
}
