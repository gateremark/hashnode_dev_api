`ExampleQuery:`


```JavaScript
query ExampleQuery {
  publication(host: "gateremark.hashnode.dev") {
            isTeam
            title
            about {
                markdown
            }
    posts {
      edges {
        node {
          title
          coverImage {
            url
          }
          brief
          url
          views
        }
      }
    }
  }
}


```
