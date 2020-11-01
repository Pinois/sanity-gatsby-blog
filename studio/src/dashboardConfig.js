export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f9e93c36185f19a05794f2f',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-blog-studio-77btajnt',
                  apiId: 'ca4cb6e6-1a2b-4486-8cbc-85a57d3ff6e4'
                },
                {
                  buildHookId: '5f9e93c30df55d4c51155c43',
                  title: 'Blog Website',
                  name: 'sanity-gatsby-blog-web-d4btgu5i',
                  apiId: 'd616f0ba-748d-4406-a5e5-d088c07c826f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/Pinois/sanity-gatsby-blog',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://sanity-gatsby-blog-web-d4btgu5i.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
