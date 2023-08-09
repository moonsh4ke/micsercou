import Link from "next/link";

export default function({ currentUser }) {
  const navListData = [
    {
      href: "/auth/signin",
      text: "SignIn",
      display: !currentUser,
    },
    {
      href: "/auth/signup",
      text: "SignUp",
      display: !currentUser,
    },
    {
      href: "/auth/signout",
      text: "SignOut",
      display: currentUser,
    },
  ];

  const navList = (
    <ul className="navbar-nav">
      {navListData
        .filter((dat) => dat.display)
        .map((dat) => {
          return (
            <li className="nav-item" key={dat.href}>
              <Link className="nav-link" href={dat.href}>
                {dat.text}
              </Link>
            </li>
          );
        })}
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg justify-content-between p-1">
      <Link className="navbar-brand" href="/">
        GitTix
      </Link>
      {navList}
    </nav>
  );
}
