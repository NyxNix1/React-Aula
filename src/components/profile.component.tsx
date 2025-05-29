
interface ProfileProps {
    name: string;
    imageUrl: string;
  }
  
  const ProfileComponent = ({ name, imageUrl }: ProfileProps) => {
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <h2>{name}</h2>
      </div>
    )
  }
  
  export default ProfileComponent;