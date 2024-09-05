const ProfileInfo = ({ field, value }) => {
  return (
    <div className="mb-6">
      <p className="text-sm mb-1">{field}</p>
      <p className="text-lg text-gray-800">{value}</p>
    </div>
  );
};

export default ProfileInfo;
