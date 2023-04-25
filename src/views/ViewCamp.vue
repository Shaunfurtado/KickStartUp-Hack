<template>
  <div class="post-view" v-if="currentCamp">
    <div class="container quillWrapper">
      <h1>{{ this.currentCamp[0].campTitle }}</h1>
      <h4>by {{ this.currentCamp[0].orgTitle }}</h4>
      <h4>Posted on: {{ new Date(this.currentCamp[0].campDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="this.currentCamp[0].campCoverPhoto" alt="" />
      <h6>Campaign Goal: Rs.{{ this.currentCamp[0].campGoal }}</h6>
      <h6>Campaign Closes on: {{ this.currentCamp[0].endDate }}</h6>
      <div class="card w-96 glass">
  <div class="card-body">
    <h2 class="card-title">{{ this.currentCamp[0].campTitle }}</h2>
    <p>Valuation : Rs. </p>
    //calculate the percentage of the goal Completed
    <p>Goal : Rs.{{ this.currentCamp[0].campGoal }}</p>

    <progress class="progress progress-success w-56" value="10" max="100"></progress>
    <p>Rs. {{ this.currentCamp[0].campFund }} of Rs. {{ this.currentCamp[0].campGoal }} Completed</p>
    <div class="form-control">
  <label class="label">
    <span class="label-text">Enter amount : </span>
  </label>
  <label class="input-group">
    <span>Price (in Rs.) : </span>
    <input type="text" placeholder=" Amount" class="input input-bordered" v-model="campFund" />
  </label>
</div>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" >Invest Now </button>
    </div>
  </div>
</div>
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
    font-size: 18px;
    margin-bottom:15px;
    margin-top: 10px;
    
  }
  .card {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 100%;
    max-width: 600px;
    background: #000000;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    card-body{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 34px;
    }
    .card-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #ffffff;
    }
    p{
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #ffffff;
    }
    .form-control {
      margin-bottom: 12px;
      color: #ffffff;
    }
    .label {
      display: block;
      margin-bottom: 14px;
      font-size: 16px;
      font-weight: 500;
      color: #fffdfd;
    }
    .input-group {
      display: flexbox;
      align-items: center;
      border: 2px solid #ffffff;
      border-radius: 1px;
      padding: 8px 16px;
      input {
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 100;
        flex: 1;
        color: #000000;

      }
      span {
        font-size: 14px;
        font-weight: 700;
      }
    }
    .card-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
    }
    .btn-primary {
      background: #525252;
      color: #ffffff;
      &:hover {
        background: #7b7c7b;
      }
    }

  }
}
</style>