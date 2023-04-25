<template>
  <div class="post-view" v-if="currentCamp">
    <div class="container quillWrapper">
      <h1>{{ this.currentCamp[0].campTitle }}</h1>
      <h4>by {{ this.currentCamp[0].orgTitle }}</h4>
      <h4>Posted on: {{ new Date(this.currentCamp[0].campDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="this.currentCamp[0].campCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="this.currentCamp[0].campHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCamp",
  data() {
    return {
      currentCamp: null,
    };
  },
  async mounted() {
    this.currentCamp = await this.$store.state.campPosts.filter((post) => {
      return post.campID === this.$route.params.campid;
    });
  },
};
</script>

<style lang="scss">
.post-view {
  h2{
      margin-bottom: 32px;
      font-weight: 500;
      font-size: 32px;

    }
    h3{
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 24px;
    }
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>