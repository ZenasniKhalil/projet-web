const commentList = document.getElementById("commentList");
const newCommentContent = document.getElementById("newCommentContent");
const submitCommentBtn = document.getElementById("submitCommentBtn");

function loadComments(recipeId) {
  fetch(`http://localhost:8080/recette/${recipeId}/comments`)
    .then((res) => res.json())
    .then((comments) => {
      commentList.innerHTML = "";
      if (comments.length === 0) {
        commentList.innerHTML =
          '<li class="list-group-item text-muted">Aucun commentaire</li>';
        return;
      }
      comments.forEach((comment) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
          <div class="fw-bold">${comment.name}</div>
          <div>${comment.content}</div>
          <small class="text-muted">${new Date(
            comment.date
          ).toLocaleString()}</small>
        `;
        commentList.appendChild(li);
      });
    });
}

submitCommentBtn.addEventListener("click", () => {
  const recipeId = new URLSearchParams(window.location.search).get("id");
  const content = newCommentContent.value.trim();

  if (content === "") return alert("Veuillez écrire un commentaire.");

  fetch(`http://localhost:8080/recette/${recipeId}/comment`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
    .then((res) => res.json())
    .then(() => {
      newCommentContent.value = "";
      loadComments(recipeId);
    });
});
