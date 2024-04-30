fetch('https://demofedevtest.equisolve-dev.com/api/v1/eq-test')
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function(data) {
    for (let i = 0; i < data.length; i++) {
        const node = document.createElement("div");
        node.setAttribute("class", "member");

        const photo = document.createElement('img');
        photo.setAttribute("class", "profile_photo")
        photo.src = data[i].photo_url;

        const metanode = document.createElement("div");
        metanode.setAttribute("class", "member_info");

        const name = document.createElement("h3");
        name.setAttribute("class", "name");
        const namenode = document.createTextNode(data[i].name);
        name.appendChild(namenode)

        const title = document.createElement("p");
        title.setAttribute("class", "title");
        const titlenode = document.createTextNode(data[i].title);
        title.appendChild(titlenode)

        const bio = document.createElement("div");
        bio.setAttribute("class", "bio");
        const bionode = document.createTextNode(data[i].bio);
        bio.appendChild(bionode)

        const view = document.createElement("div")
        view.setAttribute("class", "view_bio")
        view.innerHTML = "<span>View Bio</span>" + "<img src='/assets/Vector.png' alt='view more'>"

        metanode.append(name, title, view, bio)

        photo.setAttribute("alt", data[i].name);

        node.append(photo, metanode);
        document.getElementById("members_container").appendChild(node);
      }

      const view_button_list = document.querySelectorAll(".view_bio");
      for (let i = 0; i < view_button_list.length; i++) {
        view_button_list[i].onclick = function() {
          var name = this.closest(".member_info").querySelector("h3").textContent;
          document.querySelector(".modal_body .member_name").textContent = name;

          var role = this.closest(".member_info").querySelector(".title").textContent;
          document.querySelector(".modal_body .member_role").textContent = role;
    
          var bio = this.closest(".member_info").querySelector(".bio").textContent;
          document.querySelector(".modal_body .member_bio").textContent = bio;
    
          var photo = this.closest(".member").querySelector(".profile_photo").getAttribute("src");
          document.querySelector(".modal_body .member_photo").setAttribute("src", photo);

          document.querySelector(".overlay").style.display = "block";
          document.querySelector(".modal").style.display = "block";
        };
      }

      var closeModal = document.querySelector(".close");
      closeModal.addEventListener("click", function() {
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".modal").style.display = "none";
      });

      var toggleMenu = document.querySelector(".toggle");
      var desktopMenu = document.getElementById("desktop_menu");
      
      toggleMenu.addEventListener("click", function() {
        desktopMenu.style.display = (desktopMenu.style.display === "block") ? "none" : "block";
      });
  })
  .catch(function(error) {
    console.error('There was a problem with the fetch operation:', error);
  });