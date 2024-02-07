export class HashnodeUserDataSource {
  constructor() {
    this.apiUrl = "https://gql.hashnode.com/"; // Hashnode GraphQL API endpoint
  }

  async getUserByUsername(username) {
    if (!username) {
      throw new Error("Username is required");
    }
    try {
      // Use the post method to send a request to the Hashnode API.
      const response = await this.post({
        query: {
          username,
        },
      });
      return response.data.user;
    } catch (error) {
      throw new Error(`Server Error: ${error}`);
    }
  }
}
