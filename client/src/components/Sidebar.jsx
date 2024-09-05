import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <div className="shadow flex flex-col w-60 pb-8">
      <div className="h-12 text-lg flex font-bold items-center justify-start shadow px-6">
        Dashboard
      </div>
      <div className="pt-4">
        <SidebarLink to=".">Home</SidebarLink>
        <SidebarLink to="profile">Profile</SidebarLink>
        <SidebarLink to="holdings">Holdings</SidebarLink>
        <SidebarLink to="order">Order</SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;
