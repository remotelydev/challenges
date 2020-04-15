<template>
  <section data-cy="comments">
    <h2>Comments</h2>
    <p v-if="!comments.length" data-cy="no-comments">
      There are no comments yet. You can write one below.
    </p>
    <div v-else>
      <div
        class="comment"
        v-for="(comment, i) in comments"
        :key="`comment-${i}`"
        data-cy="comment"
      >
        <h4>{{ comment.name }}</h4>
        <p>{{ comment.text }}</p>
      </div>
    </div>
    <form @submit.prevent="addComment()">
      <input
        type="text"
        name="name"
        placeholder="Name"
        v-model="newComment.name"
        required
        data-cy="input-name"
      />
      <textarea
        name="comment"
        id="comment"
        rows="4"
        placeholder="Comment"
        v-model="newComment.text"
        required
        data-cy="input-comment"
      ></textarea>
      <button class="button" type="submit" data-cy="add-comment">
        Add comment
      </button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      newComment: {
        name: undefined,
        text: undefined
      }
    };
  },
  methods: {
    addComment() {
      const { name, text } = this.newComment;
      this.comments.push({
        name,
        text
      });
      this.newComment = {
        name: undefined,
        text: undefined
      };
    }
  }
};
</script>

<style lang="scss" scoped>
textarea,
input {
  width: 100%;
  padding: 1rem;
  border: 1px solid $yellow;
  border-radius: 1rem;
  font-size: 1.5rem;
  resize: vertical;
  margin-bottom: 0.5rem;
}

input {
  margin-bottom: 1rem;
}
</style>
