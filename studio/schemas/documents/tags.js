export default {
  // Computer name
  name: 'tags',
  // visible title
  title: 'Tags',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      description: "What is the tag's name?"
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the Tag',
      options: {
        source: 'name',
        maxLength: 96
      }
    }
  ]
}
