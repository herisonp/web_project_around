const formProfile = document.querySelector(".popup__form_edit-profile");
const formAddPlace = document.querySelector(".popup__form_add-place");
const popupClose = document.querySelectorAll(".popup__btn-close");
const btnEdit = document.querySelector(".profile__btn-edit");
const btnNewPlace = document.querySelector(".profile__btn-add");

const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector(".popup__input_type_about");

const nameText = document.querySelector(".profile__name");
const jobText = document.querySelector(".profile__about");

const postsList = document.querySelector(".posts__list");

const initialCards = [
  {
    name: "Rio de Janeiro",
    link: "./images/post-01.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-02.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-03.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-04.jpg",
  },
  {
    name: "São Paulo",
    link: "./images/post-05.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-06.jpg",
  },
];

function createPost(post) {
  const postItemTemplate = document.querySelector("#posts__item").content;
  const postItemElement = postItemTemplate.querySelector(".posts__item");

  const newPost = postItemElement.cloneNode(true);
  const newPostImage = newPost.querySelector(".posts__image");
  const newPostTitle = newPost.querySelector(".posts__title");
  const newPostLikeBtn = newPost.querySelector(".posts__btn-like");
  const newPostTrashBtn = newPost.querySelector(".posts__trash-btn");

  newPostImage.setAttribute("src", post.link);
  newPostImage.setAttribute("alt", post.name);
  newPostTitle.textContent = post.name;

  newPostLikeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("posts__btn-like_actived");
  });
  newPostTrashBtn.addEventListener("click", () => {
    newPost.remove();
  });
  newPostImage.addEventListener("click", () => {
    const popup = document.querySelector(".popup_image");
    const imageTitle = popup.querySelector(".popup__image-title");
    const image = popup.querySelector(".popup__image");
    imageTitle.textContent = post.name;
    image.setAttribute("src", post.link);
    image.setAttribute("alt", post.name);
    togglePopup(popup);
  });

  return newPost;
}

function setInitialPosts() {
  initialCards.map((post) => {
    postsList.append(createPost(post));
  });
}

function togglePopup(popup) {
  popup.classList.toggle("popup_closed");
  popup.classList.toggle("popup_opened");
}

function closePopup(evt) {
  const popup = evt.target.closest(".popup");
  togglePopup(popup);
}

function popupEditProfile() {
  const popup = document.querySelector(".popup_edit-profile");
  togglePopup(popup);
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

function popupAddNewPlace() {
  const popup = document.querySelector(".popup_add-place");
  togglePopup(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  const popup = evt.target.closest(".popup");
  togglePopup(popup);
}

function handleAddNewPost(evt) {
  evt.preventDefault();
  const titleInput = evt.target.querySelector(".popup__input_type_title");
  const linkInput = evt.target.querySelector(".popup__input_type_image");

  const post = {
    name: titleInput.value,
    link: linkInput.value,
  };

  postsList.prepend(createPost(post));

  evt.target.reset();
  const popup = evt.target.closest(".popup");
  togglePopup(popup);
}

popupClose.forEach((btn) => {
  btn.addEventListener("click", closePopup);
});
formProfile.addEventListener("submit", handleProfileFormSubmit);
formAddPlace.addEventListener("submit", handleAddNewPost);
btnEdit.addEventListener("click", popupEditProfile);
btnNewPlace.addEventListener("click", popupAddNewPlace);

setInitialPosts();
