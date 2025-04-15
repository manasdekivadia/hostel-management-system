import { TeamCard } from "./TeamMember";

function About() {
  const tanika = {
    name: "Tanika Goyal",
    designation: "Database Engineer",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQH0wX1z0AoeIQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1713599231763?e=1749686400&v=beta&t=jPCUi4of8__0-9-IsecMjXMrP3W8mGdGNxK7DsrgwHw",
    linkedin: "https://www.linkedin.com/in/tanika-goyal-54a80228a/",
  };

  const manas = {
    name: "Manas Dekivadia",
    designation: "Backend-end Engineer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGGP1YIT5Jidw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1713682459984?e=1749686400&v=beta&t=UV5oNKGYVizZ9SWiid_A_5rfxGilHblZOHyLdfoAhPY",
    linkedin: "https://in.linkedin.com/in/manas-dekivadia-497437287",
  };

  const padmesh = {
    name: "Padmesh Shukla",
    designation: "Front End Engineer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    linkedin: "https://www.linkedin.com/in/padmeshshukla/",
  };

  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl">
        Meet Our Team!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        <TeamCard member={tanika} />
        <TeamCard member={manas} />
        <TeamCard member={padmesh} />
      </div>
    </>
  );
}

export { About };
