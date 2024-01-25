`ExampleQuery:`


```JavaScript
query User($username: String!) {
        user(username: $username) {
            username
            name
            profilePicture
            bio {
                markdown
                html
                text
            }
            socialMediaLinks {
                website
                github
                twitter
                instagram
                facebook
                stackoverflow
                linkedin
                youtube
            }
            badges {
                id
                name
                description
                image
                dateAssigned
                infoURL
                suppressed
            }
            followersCount
            followingsCount
            dateJoined
            isPro
        }
    }
```
