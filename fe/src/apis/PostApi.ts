class PostApi {
  async getPosts() {
    const res = await fetch("/api/posts")
    const data = await res.json();

    return data.data;
  }
}

export const postApi = new PostApi();