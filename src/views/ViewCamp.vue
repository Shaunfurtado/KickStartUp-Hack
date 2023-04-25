<template>
  <div class="post-view" v-if="currentCamp">
    <div class="container quillWrapper">
      <h1>{{ this.currentCamp[0].campTitle }}</h1>
      <h4>by {{ this.currentCamp[0].orgTitle }}</h4>
      <h4>Posted on: {{ new Date(this.currentCamp[0].campDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="this.currentCamp[0].campCoverPhoto" alt="" />
      <h6>Campaign Goal: Rs.{{ this.currentCamp[0].campGoal }}</h6>
      <h6>Campaign Closes on: {{ this.currentCamp[0].endDate }}</h6>
      <h1>Description:</h1>
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
  h1{
    margin-bottom: 40px;
    margin-top: auto;
    font-weight: 800;
  }
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
  h6 {
    font-weight: 900;
    font-size: 20px;
    margin-bottom:18px;
    margin-top: 30px;
    .camp-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }
    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .camp-content {
      order: 2;
    }
    .camp-photo {
      order: 1;
    }
  }
  }
}
</style>