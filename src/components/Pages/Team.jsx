import team from "../../assets/config/team.json";

export default function Team() {
  return (
    <section className="h-full text-rose-700 flex justify-start flex-wrap items-start text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl pr-4">
      {...team.map((group, i) => (
        <div
          key={`group-team-` + i}
          className={"w-1/3 min-w-[20rem] " + (i < team.length - 1 && "mb-6")}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-rose-900 mb-2">
            {group.name}
          </h2>
          <ul>
            {...group.items.map((user) => <li key={`user-` + user}>{user}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
