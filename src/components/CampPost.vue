<template>
  <div class="camp-wrapper" :class="{ 'no-user': !user }">
    <div class="camp-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.campTitle }}</h2>
        <h4 v-if="post.welcomeScreen">{{ post.orgTitle }}</h4>
        <h4 v-else>by {{ post.orgTitle }}</h4>
        <p v-if="post.welcomeScreen">{{ post.campPost }}</p>
        <p class="content-preview" v-else v-html="post.campHTML"></p>
        <router-link class="link link-light" v-if="post.welcomeScreen" to="Login">
          Login/Register<Arrow class="arrow arrow-light" />
        </router-link>
        <router-link class="link" v-else :to="{ name: 'ViewCamp', params: { campid: this.post.campID } }">
          View The Project<Arrow class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="camp-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/campPhotos/${post.photo}.jpg`)" alt="" />
      <img v-else :src="post.campCoverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
  name: "campPost",
  props: ["post"],
  components: {
    Arrow,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.camp-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .camp-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;
      @media (min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }
      h4{
        font-size: 24px;
        font-weight: 300;
        margin-bottom: 32px;
        @media (min-width: 700px) {
          font-size: 32px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #ffff;
        }
      }
    }
  }

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

.no-user:first-child {
  .camp-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>