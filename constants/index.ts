interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

interface Tab {
  value: string;
  label: string;
  icon: string;
}

export const sidebarLinks: SidebarLink[] = [
    {
      imgURL: "/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/create.svg",
      route: "/create-thread",
      label: "New Post",
    },
    {
      imgURL: "/community.svg",
      route: "/communities",
      label: "Spaces",
    },
    {
      imgURL: "/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs: Tab[] = [
    { value: "threads", label: "Posts", icon: "/reply.svg" },
    { value: "replies", label: "Replies", icon: "/members.svg" },
    { value: "tagged", label: "Mentions", icon: "/tag.svg" },
  ];

  export const communityTabs: Tab[] = [
    { value: "threads", label: "Posts", icon: "/reply.svg" },
    { value: "members", label: "Members", icon: "/members.svg" },
    { value: "requests", label: "Requests", icon: "/request.svg" },
  ];
