import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campPosts: [],
    postLoaded: null,
    campHTML: "Write your campaign details here...",
    campTitle: "",
    orgTitle: "",
    endDate: "",
    campPhotoName: "",
    campPhotoFileURL: null,
    campPhotoPreview: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    campPostsFeed(state) {
      return state.campPosts.slice(0, 2);
    },
    campPostsCards(state) {
      return state.campPosts.slice(2, 6);
    },
  },
  mutations: {
    newCampPost(state, payload) {
      state.campHTML = payload;
    },
    updateCampTitle(state, payload) {
      state.campTitle = payload;
    },
    updateEndDate(state, payload){
      state.endDate = payload;
    },
    updateOrgTitle(state, payload) {
      state.orgTitle = payload;
    },
    fileNameChange(state, payload) {
      state.campPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.campPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.campPhotoPreview = !state.campPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setCampState(state, payload) {
      state.campTitle = payload.campTitle;
      state.endDate = payload.endDate;
      state.orgTitle = payload.orgTitle;
      state.campHTML = payload.campHTML;
      state.campPhotoFileURL = payload.campCoverPhoto;
      state.campPhotoName = payload.campCoverPhotoName;
    },
    filterCampPost(state, payload) {
      state.campPosts = state.campPosts.filter((post) => post.campID !== payload);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      console.log(state.profileId);
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit("setProfileAdmin", admin);
    },
    async getPost({ state }) {
      const dataBase = await db.collection("campPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.campPosts.some((post) => post.campID === doc.id)) {
          const data = {
            campID: doc.data().campID,
            campHTML: doc.data().campHTML,
            campCoverPhoto: doc.data().campCoverPhoto,
            campTitle: doc.data().campTitle,
            orgTitle: doc.data().orgTitle,  
            campDate: doc.data().date,
            endDate: doc.data().endDate,
            campCoverPhotoName: doc.data().campCoverPhotoName,
          };
          state.campPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterCampPost", payload);
      await dispatch("getPost");
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("campPosts").doc(payload);
      await getPost.delete();
      commit("filterCampPost", payload);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
  },
  modules: {},
});