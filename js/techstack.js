const techs = [
    { name: "C++", svg: "icons/icons8-c.svg" },
    { name: "Python", svg: "icons/python-brands-solid-full.svg" },
    { name: "Go", svg: "icons/icons8-go.svg" },
    { name: "Java", svg: "icons/java-brands-solid-full.svg" },

    { name: "React", svg: "icons/react-brands-solid-full.svg" },
    { name: "HTML", svg: "icons/html5-brands-solid-full.svg" },
    { name: "CSS", svg: "icons/css3-alt-brands-solid-full.svg" },
    { name: "JavaScript", svg: "icons/js-brands-solid-full.svg" },
    { name: "TypeScript", svg: "icons/typescript-brands-solid-full.svg" },
    { name: "NodeJS", svg: "icons/node-js-brands-solid-full.svg" },
    { name: "Tailwind", svg: "icons/tailwind-css-brands-solid-full.svg" },

    { name: "PostgreSQL", svg: "icons/postgresql-brands-solid-full.svg" },
    { name: "MongoDB", svg: "icons/svgviewer-mongodb.svg" },

    { name: "Figma", svg: "icons/figma-brands-solid-full.svg" },
    { name: "Git", svg: "icons/git-alt-brands-solid-full.svg" },
    { name: "Github", svg: "icons/github-brands-solid-full.svg" },
    { name: "Gitlab", svg: "icons/gitlab-brands-solid-full.svg" },
    { name: "Jira", svg: "icons/jira-brands-solid-full.svg" },

    { name: "Wordpress", svg: "icons/wordpress-brands-solid-full.svg" },
    { name: "Notion", svg: "icons/icons8-notion.svg" },

];

function buildTrack() {
    const track = document.getElementById('track');
    // duplicate for seamless loop
    const doubled = [...techs, ...techs];

    doubled.forEach((tech, i) => {
        if (i > 0) {
            const div = document.createElement('div');
            div.className = 'divider';
            track.appendChild(div);
        }

        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
  <div class="icon-wrap">
    <img src="${tech.svg}" alt="${tech.name}" />
  </div>
  <span class="name">${tech.name}</span>
`;
        track.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    buildTrack();
});