<template>
    <div class="post-view">
      <div class="container quillWrapper">
        <h2>{{ this.campTitle }}</h2>
        <h3>{{ this.orgTitle }}</h3>
        <img :src="campCoverPhoto" alt="" />
        <div class="post-content ql-editor" v-html="campHTML"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PostPreview",
    computed: {
      campTitle() {
        return this.$store.state.campTitle;
      },
      orgTitle() {
        return this.$store.state.orgTitle;
      },
      campHTML() {
        return this.$store.state.campHTML;
      },
      campCoverPhoto() {
        return this.$store.state.campPhotoFileURL;
      },
    },
  };
  </script>
  
  <style lang="scss">
  .post-view {
    min-height: 100%;
  
    .container {
      max-width: 1000px;
      padding: 60px 25px;
    }
  
    .ql-editor {
      padding: 0;
    }
  
    h2 {
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    h3{
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 24px;
    }
  
    img {
      width: 100%;
      margin-bottom: 32px;
    }
  }
  </style>  