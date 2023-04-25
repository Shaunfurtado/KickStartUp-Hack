<template>
    <div class="create-post">
      <CampCoverPreview v-show="this.$store.state.campPhotoPreview" />
      <Loading v-show="loading" />
      <div class="container">
        <div :class="{ invisible: !error }" class="err-message">
          <p><span>Error:</span>{{ this.errorMsg }}</p>
        </div>
        <div class="camp-info">
          <input type="text" placeholder="Enter Camp Title" v-model="campTitle" />
          <div class="upload-file">
            <label for="camp-photo">Upload Cover Photo</label>
            <input type="file" ref="campPhoto" id="camp-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
            <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.campPhotoFileURL }">
              Preview Photo
            </button>
            <span>File Chosen: {{ this.$store.state.campPhotoName }}</span>
          </div>
        </div>
        <div class="org-info">
          <input type="text" placeholder="Enter Organization Name" v-model="orgTitle" />
        </div>
        <div class="org-date">
          <input type="text" placeholder="Enter Campaign End Date" v-model="endDate" />
        </div>
        <div class="org-inf">
          <h5>( dd / mm / yyyy )</h5>
        </div>
        <div class="camp-goal">
          <input type="text" placeholder="Enter Campaign Goal: (Rs.) " v-model="campGoal" />
        </div>
        <div class="editor">
          <vue-editor :editorOptions="editorSettings" v-model="campHTML" useCustomImageHandler @image-added="imageHandler" />
        </div>
        <div class="camp-actions">
          <button @click="uploadCamp">Publish Camp</button>
          <router-link class="router-button" :to="{ name: 'CampPreview' }">Post Preview</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CampCoverPreview from "../components/CampCoverPreview";
  import Loading from "../components/Loading";
  import firebase from "firebase/app";
  import "firebase/storage";
  import db from "../firebase/firebaseInit";
  import Quill from "quill";
  window.Quill = Quill;
  const ImageResize = require("quill-image-resize-module").default;
  Quill.register("modules/imageResize", ImageResize);
  export default {
    name: "CreatePost",
    data() {
      return {
        file: null,
        error: null,
        errorMsg: null,
        loading: null,
        editorSettings: {
          modules: {
            imageResize: {},
          },
        },
      };
    },
    components: {
      CampCoverPreview,
      Loading,
    },
    methods: {
      fileChange() {
        this.file = this.$refs.campPhoto.files[0];
        const fileName = this.file.name;
        this.$store.commit("fileNameChange", fileName);
        this.$store.commit("createFileURL", URL.createObjectURL(this.file));
      },
  
      openPreview() {
        this.$store.commit("openPhotoPreview");
      },
  
      imageHandler(file, Editor, cursorLocation, resetUploader) {
        const storageRef = firebase.storage().ref();
        const docRef = storageRef.child(`documents/campPostPhotos/${file.name}`);
        docRef.put(file).on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          }
        );
      },
  
      uploadCamp() {
        if (this.campTitle.length !== 0 && this.campHTML.length !== 0) {
          if (this.file) {
            this.loading = true;
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/CampCoverPhotos/${this.$store.state.campPhotoName}`);
            docRef.put(this.file).on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
              },
              (err) => {
                console.log(err);
                this.loading = false;
              },
              async () => {
                const downloadURL = await docRef.getDownloadURL();
                const timestamp = await Date.now();
                const dataBase = await db.collection("campPosts").doc();
  
                await dataBase.set({
                  campID: dataBase.id,
                  campHTML: this.campHTML,
                  campCoverPhoto: downloadURL,
                  campCoverPhotoName: this.campCoverPhotoName,
                  campTitle: this.campTitle,
                  orgTitle: this.orgTitle,
                  campGoal: this.campGoal,
                  endDate: this.endDate,
                  profileId: this.profileId,
                  date: timestamp,
                });
                await this.$store.dispatch("getPost");
                this.loading = false;
                this.$router.push({ name: "ViewCamp", params: { campid: dataBase.id } });
              }
            );
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure you uploaded a cover photo!";
          setTimeout(() => {
            this.error = false;
          }, 5000);
          return;
        }
        this.error = true;
        this.errorMsg = "Please ensure Camp Title & Camp Post has been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      },
    },
    computed: {
      profileId() {
        return this.$store.state.profileId;
      },
      campCoverPhotoName() {
        return this.$store.state.campPhotoName;
      },
      campTitle: {
        get() {
          return this.$store.state.campTitle;
        },
        set(payload) {
          this.$store.commit("updateCampTitle", payload);
        },
      },
      endDate: {
        get() {
          return this.$store.state.endDate;
        },
        set(payload) {
          this.$store.commit("updateEndDate", payload);
        },
      },
      orgTitle: {
        get() {
          return this.$store.state.orgTitle;
        },
        set(payload) {
          this.$store.commit("updateOrgTitle", payload);
        },
      },
      campGoal: {
        get() {
          return this.$store.state.campGoal;
        },
        set(payload) {
          this.$store.commit("updateCampGoal", payload);
        },
      },
      campHTML: {
        get() {
          return this.$store.state.campHTML;
        },
        set(payload) {
          this.$store.commit("newCampPost", payload);
        },
      },
    },
  };
  </script>
  
  <style lang="scss">
  .create-post {
    position: relative;
    height: 100%;
  
    button {
      margin-top: 0;
    }
  
    .router-button {
      text-decoration: none;
      color: #fff;
    }
  
    label,
    button,
    .router-button {
      transition: 0.5s ease-in-out all;
      align-self: center;
      font-size: 14px;
      cursor: pointer;
      border-radius: 20px;
      padding: 12px 24px;
      color: #fff;
      background-color: #303030;
      text-decoration: none;
  
      &:hover {
        background-color: rgba(48, 48, 48, 0.7);
      }
    }
  
    .container {
      position: relative;
      height: 100%;
      padding: 10px 25px 60px;
    }
  
    // error styling
    .invisible {
      opacity: 0 !important;
    }
  
    .err-message {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      color: #fff;
      margin-bottom: 10px;
      background-color: #303030;
      opacity: 1;
      transition: 0.5s ease all;
  
      p {
        font-size: 14px;
      }
  
      span {
        font-weight: 600;
      }
    }
  
    .camp-info {
      display: flex;
      margin-bottom: 32px;
  
      input:nth-child(1) {
        min-width: 190px;
      }
  
      input {
        transition: 0.5s ease-in-out all;
        padding: 10px 4px;
        border: none;
        border-bottom: 1px solid #303030;
  
        &:focus {
          outline: none;
          box-shadow: 0 1px 0 0 #303030;
        }
      }
  
      .upload-file {
        flex: 1;
        margin-left: 16px;
        position: relative;
        display: flex;
  
        input {
          display: none;
        }
  
        .preview {
          margin-left: 16px;
          text-transform: initial;
        }
  
        span {
          font-size: 12px;
          margin-left: 16px;
          align-self: center;
        }
      }
    }
    .org-info{
      display: flex;
      margin-bottom: 32px;
      
      input:nth-child(1) {
        min-width: 190px;
      }
      input {
        transition: 0.5s ease-in-out all;
        padding: 10px 4px;
        border: none;
        border-bottom: 1px solid #303030;
  
        &:focus {
          outline: none;
          box-shadow: 0 1px 0 0 #303030;
        }
      }
    }
    .org-date{
      display: flex;
      margin-bottom: 12px;
      
      input:nth-child(1) {
        min-width: 190px;
      }
      input {
        transition: 0.5s ease-in-out all;
        padding: 10px 4px;
        border: none;
        border-bottom: 1px solid #303030;
  
        &:focus {
          outline: none;
          box-shadow: 0 1px 0 0 #303030;
        }
      }
    }
    .org-inf{
      display: flex;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-left: 20px;
      padding: 2px;
      h5{
        font-size: 12px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-weight:100;
      }
    }
    .camp-goal{
      display: flex;
      margin-bottom: 28px;
      
      input:nth-child(1) {
        min-width: 190px;
      }
      input {
        transition: 0.5s ease-in-out all;
        padding: 8px 4px;
        border: none;
        border-bottom: 1px solid #303030;
  
        &:focus {
          outline: none;
          box-shadow: 0 1px 0 0 #303030;
        }
      }
    }
  
    .editor {
      height: 60vh;
      display: flex;
      flex-direction: column;
  
      .quillWrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
  
      .ql-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: scroll;
      }
  
      .ql-editor {
        padding: 20px 16px 30px;
      }
    }
  
    .camp-actions {
      margin-top: 32px;
  
      button {
        margin-right: 16px;
      }
    }
  }
  </style>