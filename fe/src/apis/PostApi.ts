class PostApi {
  async getPost(id: string) {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    return data.data;
  }

  async getPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();

    return data.data;
  }
}

export const postApi = new PostApi();
