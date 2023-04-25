<template>
  <div class="home">
    <CampPost v-if="!user" :post="welcomeScreen" />
    <CampPost :post="post" v-for="(post, index) in campPostsFeed" :key="index" />
    <div class="camp-card-wrap">
      <div class="container">
        <h3>View More Recent Projects</h3>
        <div class="camp-cards">
          <CampCard :post="post" v-for="(post, index) in campPostsCards" :key="index" />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a Opportunity. Register for your free account today!</h2>
        <router-link class="router-button" to="#"> Register for KickStartUp <Arrow class="arrow arrow-light" /> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CampPost from "../components/CampPost";
import CampCard from "../components/CampCard";
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
  name: "Home",
  components: { CampPost, CampCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome! Crowdfunding has never been so easy",
        campPost:
          "KickStartUp is a platform that allows you to create a crowdfunding campaign for your project in minutes. We provide you with the tools to create a campaign that will attract the attention of potential investors and donors.",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },
  computed: {
    campPostsFeed() {
      return this.$store.getters.campPostsFeed;
    },
    campPostsCards() {
      return this.$store.getters.campPostsCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.camp-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 200px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>