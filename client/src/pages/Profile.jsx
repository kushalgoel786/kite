import { useDashboardContext } from "./Dashboard";
import { ProfileInfo } from "../components";

const Profile = () => {
  const { user } = useDashboardContext();
  return (
    <div>
      <ProfileInfo field={"Name"} value={user.user_name}></ProfileInfo>
      <ProfileInfo field={"User ID"} value={user.user_id}></ProfileInfo>
      <ProfileInfo field={"User Type"} value={user.user_type.toString()}></ProfileInfo>
      <ProfileInfo field={"Email"} value={user.email}></ProfileInfo>
      <ProfileInfo field={"Broker"} value={user.broker}></ProfileInfo>
    </div>
  );
};

export default Profile;
