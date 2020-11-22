export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the category',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'showInMenu',
      title: 'Show in Menu?',
      type: 'boolean',
      description: 'Veux tu afficher la catégorie dans le menu principal?',
      options: {
        layout: 'checkbox'
      }
    }
  ]
}
